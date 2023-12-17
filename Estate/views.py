# views.py
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Estate, EstateUser
from .serializers import EstateSerializer


class EstateUserViewSet(viewsets.ModelViewSet):
    queryset = EstateUser.objects.all()
    serializer_class = EstateSerializer  # Use the EstateSerializer for both Estate and EstateUser creation

    def list(self, request, *args, **kwargs):
        user = self.request.user
        if not user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'},
                            status=status.HTTP_403_FORBIDDEN)

        estates = Estate.objects.filter(estateuser__user=user)
        serializer = self.get_serializer(estates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        if not user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'},
                            status=status.HTTP_403_FORBIDDEN)

        # Add user information to the request data
        request.data['user'] = user.id
        request.data['user_type'] = request.data.get('user_type', 'owner')  # Assuming a default user_type

        # Use the EstateSerializer for both Estate and EstateUser creation
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        user = self.request.user
        if not user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'},
                            status=status.HTTP_403_FORBIDDEN)

        queryset = Estate.objects.filter(estateuser__user=user)
        estate = get_object_or_404(queryset, pk=kwargs.get('pk'))
        serializer = self.get_serializer(estate)
        return Response(serializer.data, status=status.HTTP_200_OK)
