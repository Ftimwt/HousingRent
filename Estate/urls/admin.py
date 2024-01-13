from django.urls import path, include
from rest_framework.routers import DefaultRouter

from Estate.views.admin import EstateAdminView, QueuedNotConfirmEstateList

router = DefaultRouter()
router.register(r'/(?P<estate_id>\d+)', EstateAdminView, basename='estate_admin')

urlpatterns = [
    path('', include(router.urls)),
    path('/not_confirmed', QueuedNotConfirmEstateList.as_view())
]
