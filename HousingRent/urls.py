from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenVerifyView,
)

from HousingRent import settings


def index_view(request):
    return render(request, 'dist/index.html')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index_view, name='index'),

    # User module
    path('api/v1/auth/', include('User.urls')),

    # Estate module
    path('api/v1/estates', include('Estate.urls.system')),
    path('api/v1/owner/estates', include('Estate.urls.owner')),
    path('api/v1/admin/estates', include('Estate.urls.admin')),
    path('api/v1/tenant/estates', include('Estate.urls.tenant')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
