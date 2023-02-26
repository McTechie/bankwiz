from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Log
from server.transaction_api.models import Transaction
from server.transaction_api.serializer import TransactionUserSerializer
from utils.general_utils import exception_catcher

# Create your views here.

class UserTransactions(APIView):
    @exception_catcher
    def get(self, request):
        user_id = request.data['user_id']
        all_transactions = Transaction.objects.all()
        transactions = []
        for transaction in all_transactions:
            pass


    @exception_catcher
    def delete(self, request):
        pass
