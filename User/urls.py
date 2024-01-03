from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views.auth import AuthViewSet
from .views.user import UserViewSet

router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'auth', UserViewSet, basename='auth')

urlpatterns = [
    path('api/', include(router.urls)),
]
