from django.urls import path

from Estate.views.owner import EstateIndexViewSet, EstateDetailViewSet, EstateFilesUploadViewSet

urlpatterns = [
    path('/', EstateIndexViewSet.as_view()),
    path('/<int:pk>', EstateDetailViewSet.as_view()),
    path('/<int:pk>/photos', EstateFilesUploadViewSet.as_view()),
]
