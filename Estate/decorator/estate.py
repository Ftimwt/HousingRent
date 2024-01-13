from rest_framework import status
from rest_framework.response import Response

from Estate.models import Estate


def is_estate_owner(f):
    def wrapper(self, request, *args, **kwargs):
        estate_id = kwargs['pk']
        user = self.request.user

        estate = Estate.objects.get(pk=estate_id)

        if user.id != estate.owner_id:
            return Response({
                'details': 'شما به این مسکن دسترسی ندارید',
            }, status=status.HTTP_403_FORBIDDEN)

        return f(self, request, *args, **kwargs)

    return wrapper


def is_estate_exists(callback):
    def wrapper(self, request, *args, **kwargs):
        estate_id = kwargs['estate_id']

        estate = Estate.objects.get(pk=estate_id)

        if estate is None:
            return Response({
                'detials': 'مسکن مورد نظر وجود ندارد.'
            }, status=status)

        return callback(request, *args, **kwargs)

    return wrapper
