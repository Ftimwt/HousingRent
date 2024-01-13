from rest_framework import generics, response, status, views
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ViewSet

from Estate.models import Estate, EstateRequest
from Estate.serializers import EstateUserSerializer, EstateTenantRequestSerializer


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
                "details": "مسکن یافت نشد."
            }, status=status.HTTP_404_NOT_FOUND)

        if estate.owner.id == user.id:
            return response.Response({
                "details": "شما نمی توانید به مسکن خود درخواست اجاره دهید."
            }, status=status.HTTP_400_BAD_REQUEST)

        request_exists = EstateRequest.objects.filter(user=user, estate=estate).exists()
        if request_exists:
            return response.Response({
                "details": "شما قبلا برای این مسکن درخواست داده اید."
            }, status=status.HTTP_400_BAD_REQUEST)

        req = EstateRequest()
        req.estate_id = estate_id
        req.user = user

        req.save()

        return response.Response({
            "details": "درخواست با موفقیت صادر شد."
        })

    def _handle_remove_request(self, **kwargs):
        estate_id = kwargs['estate_id']

        estate = Estate.objects.filter(id=estate_id).first()

        if not estate:
            return response.Response({
                "details": "مسکن یافت نشد."
            }, status=status.HTTP_404_NOT_FOUND)

        user = self.request.user
        request_exists = EstateRequest.objects.filter(user=user, estate=estate).exists()

        if not request_exists:
            return response.Response({
                "details": "برای این مسکن درخواستی ثبت نکرده اید."
            })

        result = EstateRequest.objects.filter(user=user, estate=estate).delete()[1]
        if result == 0:
            return response.Response({
                "details": "خطایی در حذف درخواست اجاره مسکن رخ داده است."
            }, status.HTTP_400_BAD_REQUEST)

        return response.Response({
            "details": 'درخواست حذف مسکن با موفیت ایجاد شد.'
        })


class RentRequestList(generics.ListAPIView):
    serializer_class = EstateTenantRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return EstateRequest.objects.filter(user=user).order_by('-id')
