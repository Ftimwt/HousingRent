from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenVerifyView,
)

from Estate.views import EstateIndexViewSet, NearestEstatesAPIView
from User.views.auth import AuthViewSet
from User.views.user import UserViewSet

router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'auth', UserViewSet, basename='auth')
router.register(r'users/estates', EstateIndexViewSet.as_view(), basename='estates')


def index_view(request):
    return render(request, 'dist/index.html')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index_view, name='index'),
    path('v1/rooms/', include('User.urls')),

    path('api/estates/nearest', NearestEstatesAPIView.as_view()),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
