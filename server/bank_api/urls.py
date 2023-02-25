from django.urls import path
from .views import (
    Banks,
    SingleBankCreator,
    SingleBankOperations,
)

urlpatterns = [
    path("banks/", Banks.as_view()),
    path("bank/", SingleBankCreator.as_view()),
    path("bank/<int:id>", SingleBankOperations.as_view()),
]