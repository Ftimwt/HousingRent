from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views.auth import AuthViewSet
from .views.user import UserViewSet

router = DefaultRouter()
router.register(r'', AuthViewSet, basename='auth')
router.register(r'', UserViewSet, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
]
