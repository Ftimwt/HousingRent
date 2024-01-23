from django.urls import path

from Estate.views.owner import EstateIndexViewSet, EstateDetailViewSet, EstateFilesUploadViewSet, EstateRequestsList, \
    EstateRequestsControl, OwnerInstallments, OwnerContracts

urlpatterns = [
    path('/', EstateIndexViewSet.as_view()),
    path('/<int:pk>', EstateDetailViewSet.as_view()),
    path('/<int:pk>/photos', EstateFilesUploadViewSet.as_view()),
    path('/requests', EstateRequestsList.as_view()),
    path('/<int:req_id>/request', EstateRequestsControl.as_view()),
    path('/contracts/installments', OwnerInstallments.as_view()),
    path('/contracts', OwnerContracts.as_view())
]
