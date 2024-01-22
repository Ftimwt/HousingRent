from django.urls import path

from Estate.views.tenant import RentHouseView, RentRequestList, RentRequestManager, TenantInstallments

urlpatterns = [
    path('/', RentHouseView.as_view()),
    path('/rent/<int:estate_id>/request', RentRequestManager.as_view()),
    path('/rent/requests', RentRequestList.as_view()),
    path('/installment', TenantInstallments.as_view())
]
