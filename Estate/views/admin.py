from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from Estate.models import Estate
from Estate.serializers import EstateUserSerializer


class EstateAdminView(ViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]

    @action(methods=['put'], detail=False)
    def accept(self, request, *args, **kwargs):
        estate_id = kwargs.get('estate_id')

        estate = Estate.objects.filter(id=estate_id).first()
        if estate is None:
            return Response({
                "details": "ملک وجود ندارد"
            }, status=status.HTTP_404_NOT_FOUND)

        if estate.is_confirm:
            return Response({
                "details": "این ملک تایید شده است."
            }, status=status.HTTP_400_BAD_REQUEST)

        result = Estate.objects.filter(pk=estate_id).update(is_confirm=True)

        if result <= 0:
            return Response({
                "details": "خطایی در بروزرسانی ایجاد شده.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            "details": "ملک تایید شد",
        })

    @action(methods=['post'], detail=False)
    def deactivate(self, request, *args, **kwargs):
        estate_id = kwargs.get('estate_id')
        result = Estate.objects.filter(pk=estate_id).update(is_confirm=False)

        if result <= 0:
            return Response({
                "details": "خطایی در بروزرسانی ایجاد شده.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            "details": "ملک به حالت تایید نشده برگشت.",
        })


class QueuedNotConfirmEstateList(ListAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = EstateUserSerializer

    def get_queryset(self):
        return Estate.objects.filter(is_confirm=False).order_by('-id')
