from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenVerifyView,
)


def index_view(request):
    return render(request, 'dist/index.html')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index_view, name='index'),

    # User module
    path('api/v1/auth/', include('User.urls')),

    # Estate module
    path('api/v1/estates/', include('Estate.urls.system')),
    path('api/v1/users/estates', include('Estate.urls.user')),
    path('api/v1/admin/estates', include('Estate.urls.admin')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
