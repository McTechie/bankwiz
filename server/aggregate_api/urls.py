from django.urls import path
from .views import UserTransactions

urlpatterns = [
    path("aggregate/transaction/", UserTransactions.as_view()),
]
