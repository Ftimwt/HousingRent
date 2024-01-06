from django.urls import path

from Estate.views.system import NearestEstatesAPIView

urlpatterns = [
    path('/nearest', NearestEstatesAPIView.as_view()),
]
