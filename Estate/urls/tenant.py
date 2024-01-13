from django.urls import path

from Estate.views.tenant import RentHouseView, RentRequestList, RentRequestManager

urlpatterns = [
    path('/', RentHouseView.as_view()),
    path('/rent/<int:estate_id>/request', RentRequestManager.as_view()),
    path('/rent/requests', RentRequestList.as_view())
]
