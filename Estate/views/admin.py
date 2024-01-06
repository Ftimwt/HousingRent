from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from Estate.models import Estate


class EstateAdminView(ViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def check_exists(self, estate_id):
        assert "fuck"

    @action(methods=['put'], detail=False)
    def accept(self, request, *args, **kwargs):
        estate_id = kwargs.get('estate_id')

        result = Estate.objects.filter(pk=estate_id).update(is_confirm=True)

        if result <= 0:
            return Response({
                "message": "خطایی در بروزرسانی ایجاد شده.",
                "status": False
            })

        return Response({
            "message": "ملک تایید شد",
            "status": True
        })

    @action(methods=['post'], detail=False)
    def deactivate(self, request, *args, **kwargs):
        estate_id = kwargs.get('estate_id')
        result = Estate.objects.filter(pk=estate_id).update(is_confirm=False)

        if result <= 0:
            return Response({
                "message": "خطایی در بروزرسانی ایجاد شده.",
                "status": False
            })

        return Response({
            "message": "ملک به حالت تایید نشده برگشت.",
            "status": True
        })
