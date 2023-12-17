from django.contrib.auth import logout
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from User.serializers import UserSerializer


class UserViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def logout(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response({'detail': 'Successfully logged out.'})
        else:
            return Response({'detail': 'You\'re not logged in.'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def whoami(self, request):
        if request.user.is_authenticated:
            d = UserSerializer(request.user)
            return Response(d.data)
        else:
            return Response({'isAuthenticated': False})
