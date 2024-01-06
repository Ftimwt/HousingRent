from django.urls import path

from Estate.views.user import EstateIndexViewSet

urlpatterns = [
    path('/', EstateIndexViewSet.as_view()),
]
