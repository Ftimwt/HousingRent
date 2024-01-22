from rest_framework import generics, response, status, views
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ViewSet

from Estate.models import Estate, EstateRequest, EstateContractInstallment
from Estate.serializers import EstateUserSerializer, EstateTenantRequestSerializer, EstateContractInstallmentSerializer


class RentHouseView(generics.ListAPIView):
    serializer_class = EstateUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Estate.objects.filter(tenant=user).order_by('-id')


class RentRequestManager(views.APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        return self._handle_add_request(**kwargs)

    def delete(self, request, *args, **kwargs):
        return self._handle_remove_request(**kwargs)

    def _handle_add_request(self, **kwargs):
        user = self.request.user
        estate_id = kwargs.get('estate_id')

        estate = Estate.objects.filter(id=estate_id).first()

        if not estate:
            return response.Response({
                "detail": "مسکن یافت نشد."
            }, status=status.HTTP_404_NOT_FOUND)

        if estate.owner.id == user.id:
            return response.Response({
                "detail": "شما نمی توانید به مسکن خود درخواست اجاره دهید."
            }, status=status.HTTP_400_BAD_REQUEST)

        request_exists = EstateRequest.objects.filter(user=user, estate=estate).exists()
        if request_exists:
            return response.Response({
                "detail": "شما قبلا برای این مسکن درخواست داده اید."
            }, status=status.HTTP_400_BAD_REQUEST)

        req = EstateRequest()
        req.estate_id = estate_id
        req.user = user

        req.save()

        return response.Response({
            "detail": "درخواست با موفقیت صادر شد."
        })

    def _handle_remove_request(self, **kwargs):
        estate_id = kwargs['estate_id']

        estate = Estate.objects.filter(id=estate_id).first()

        if not estate:
            return response.Response({
                "detail": "مسکن یافت نشد."
            }, status=status.HTTP_404_NOT_FOUND)

        user = self.request.user
        request_exists = EstateRequest.objects.filter(user=user, estate=estate).exists()

        if not request_exists:
            return response.Response({
                "detail": "برای این مسکن درخواستی ثبت نکرده اید."
            })

        result = EstateRequest.objects.filter(user=user, estate=estate).delete()[1]
        if result == 0:
            return response.Response({
                "detail": "خطایی در حذف درخواست اجاره مسکن رخ داده است."
            }, status.HTTP_400_BAD_REQUEST)

        return response.Response({
            "detail": 'درخواست حذف مسکن با موفیت ایجاد شد.'
        })


class RentRequestList(generics.ListAPIView):
    serializer_class = EstateTenantRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return EstateRequest.objects.filter(user=user).order_by('-id')


class TenantInstallments(generics.ListAPIView):
    queryset = EstateContractInstallment
    serializer_class = EstateContractInstallmentSerializer

    def get_queryset(self):
        user = self.request.user
        return EstateContractInstallment.objects.filter(tenant=user).order_by('-id')
