from django.urls import path, include
from rest_framework.routers import DefaultRouter

from Estate.views.admin import EstateAdminView

router = DefaultRouter()
router.register(r'/(?P<estate_id>\d+)', EstateAdminView, basename='estate_admin')

urlpatterns = [
    path('', include(router.urls)),
]
