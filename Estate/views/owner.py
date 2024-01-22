from datetime import date

from rest_framework import status, generics, views
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from persiantools.jdatetime import JalaliDate

from Estate.decorator.estate import is_estate_owner
from Estate.models import Estate, EstateRequest, EstateContract, EstateContractInstallment
from Estate.serializers import CreateEstateSerializer, EstateFileSerializer, EstateOwnerRequestSerializer, \
    EstateContractInstallmentSerializer
from Estate.template.contract_text import CONTRACT_TEMPLATE


class EstateIndexViewSet(generics.ListCreateAPIView):
    queryset = Estate.objects.order_by('-id').all()
    serializer_class = CreateEstateSerializer  # Use the EstateSerializer for both Estate and EstateUser creation
    # for uploading files
    parser_classes = [MultiPartParser, FormParser]

    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = self.request.user
        if not user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'},
                            status=status.HTTP_403_FORBIDDEN)

        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        estate_user = serializer.save(owner=user)

        files_data = request.FILES.getlist('files', [])
        for file_data in files_data:
            estate_file_data = {'estate': estate_user.id, 'file_type': data.get('file_type', 'photo'),
                                'file': file_data}

            estate_file_serializer = EstateFileSerializer(data=estate_file_data)
            estate_file_serializer.is_valid(raise_exception=True)
            estate_file_serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        user = self.request.user
        return Estate.objects.filter(owner=user).order_by('-id')


class EstateDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Estate.objects.all()
    serializer_class = CreateEstateSerializer  # Use the EstateSerializer for both Estate and EstateUser creation
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(is_confirm=False)

    @is_estate_owner
    def update(self, request, *args, **kwargs):
        return generics.RetrieveUpdateDestroyAPIView(self).update(request, *args, **kwargs)


class EstateFilesUploadViewSet(generics.CreateAPIView):
    queryset = Estate.objects.all()
    serializer_class = EstateFileSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    @is_estate_owner
    def create(self, request, *args, **kwargs):
        estate_id = kwargs['pk']
        user = self.request.user
        if not user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'},
                            status=status.HTTP_403_FORBIDDEN)

        data = request.data

        data['estate'] = estate_id
        data['file_type'] = data.get('file_type', 'photo')

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response({"detail": "File has uploaded successfully."}, status=status.HTTP_200_OK, headers=headers)


class EstateFilesDeleteViewSet(generics.DestroyAPIView):
    queryset = Estate.objects.all()
    serializer_class = EstateFileSerializer

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class EstateRequestsList(generics.ListAPIView):
    queryset = EstateRequest
    serializer_class = EstateOwnerRequestSerializer

    def get_queryset(self):
        user = self.request.user
        return EstateRequest.objects.filter(estate__owner=user, accepted__isnull=True).order_by('-id')


class EstateRequestsControl(views.APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        return self._handle_accept(**kwargs)

    def delete(self, request, *args, **kwargs):
        return self._handle_cancel(**kwargs)

    def _handle_change_accept(self, accept, **kwargs):
        req_id = kwargs.get('req_id')
        user = self.request.user
        req = EstateRequest.objects.filter(id=req_id).first()

        if req.accepted is not None:
            return Response({'details': "این درخواست قبلا پاسخ داده شده است."}, status=status.HTTP_400_BAD_REQUEST)

        if req is None:
            return Response({
                "detail": "درخواست یافت نشد برای تایید."
            }, status=status.HTTP_400_BAD_REQUEST)

        if req.estate.owner_id != user.id:
            return Response({
                "detail": "شما به این درخواست دسترسی ندارید."
            }, status=status.HTTP_403_FORBIDDEN)

        # make the request accepted
        req.accepted = accept
        req.save()

        return req

    def _handle_cancel(self, **kwargs):
        req = self._handle_change_accept(False, **kwargs)

        if type(req) is Response:
            return req

        return Response({
            "detail": "درخواست اجاره ملک شما برای این کاربر رد شد."
        }, status=status.HTTP_200_OK)

    def _replace_text(self, text, user, model_name):
        return (text.replace(f"@{model_name}_name", user.full_name())
                .replace(f"@{model_name}_father", user.father)
                .replace(f"@{model_name}_birth_certificate_id", user.birth_certificate_id)
                .replace(f"@{model_name}_address", user.address)
                .replace(f"@{model_name}_birthday", JalaliDate(user.birthday).strftime("%Y/%m/%d"))
                .replace(f"@{model_name}_national_id", user.national_code)
                .replace(f"@{model_name}_issued_national", user.issued_national)
                .replace(f"@{model_name}_phone", user.phone_number))

    def _handle_accept(self, **kwargs):
        req = self._handle_change_accept(True, **kwargs)

        if type(req) is Response:
            return req

        # change tenant of estate
        req.estate.tenant = req.user
        req.estate.save()

        contract = EstateContract()

        # Set start time and end time
        today = date.today()

        contract.start_time = today
        contract.end_time = today.replace(year=today.year + 1)

        contract.text = self._replace_text(CONTRACT_TEMPLATE, req.estate.owner, "owner")
        contract.text = self._replace_text(contract.text, req.estate.tenant, "tenant")
        contract.price = req.estate.mortgage_price
        contract.owner = req.estate.owner
        contract.tenant = req.estate.tenant
        contract.estate = req.estate

        contract.save()

        # ایجاد ۱۲ صورت حساب برای ۱۲ ماه
        for i in range(12):
            installment = EstateContractInstallment()
            installment.price = req.estate.rental_price
            installment.created_at = today
            installment.is_paid = False
            installment.contract = contract
            installment.date = today.replace(month=today.month + i)
            # تعیین صورت حساب ماه اول به عنوان در انتظار پرداخت
            installment.status = "awaiting" if i == 0 else "soon"
            installment.save()

        return Response({
            "detail": "درخواست اجاره ملک شما برای این کاربر تایید شد."
        }, status=status.HTTP_200_OK)


# دریافت لیست صورت حساب هایی که متعلق به مالک هست و پول به حساب مالک میرود
class OwnerInstallments(generics.ListAPIView):
    queryset = EstateContractInstallment
    serializer_class = EstateContractInstallmentSerializer

    def get_queryset(self):
        user = self.request.user
        return EstateContractInstallment.objects.filter(owner=user).order_by('-id')
