from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework_simplejwt.tokens import RefreshToken

from User.serializers import UserLoginSerializer, CreateUserSerializer


class AuthViewSet(ViewSet):
    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')

        user = authenticate(request=request, username=username, password=password)

        if user is not None:
            # for session
            # login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'detail': 'Successfully logged in.',
                'token': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            })
        else:
            return Response({'detail': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def signup(self, request):
        serializer = CreateUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'User created successfully',
                'token': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'user_id': user.id,
            },
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

