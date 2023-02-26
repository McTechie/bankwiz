from django.urls import path
from .views import UserTransactions, GetRelevantDetails

urlpatterns = [
    path("aggregate/transaction/", UserTransactions.as_view()),
    path("aggregate/relevant_fields/", GetRelevantDetails.as_view()),
]
