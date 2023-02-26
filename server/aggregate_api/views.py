from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from transaction_api.models import Transaction
from user_api.models import User
from transaction_api.serializer import TransactionUserSerializer
from utils.general_utils import exception_catcher

# Create your views here.

class UserTransactions(APIView):
    @exception_catcher
    def get(self, request):
        user_id = request.data['user_id']
        user = User.objects.filter(user_id=user_id)[0]
        company_id = user.company_id
        transactions = Transaction.objects.filter(company_id=company_id)
        serialized = TransactionUserSerializer(transactions, many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)

    @exception_catcher
    def delete(self, request):
        user_id = request.data['user_id']
        user = User.objects.filter(user_id=user_id)[0]
        company_id = user.company_id
        transactions = Transaction.objects.filter(company_id=company_id)
        transactions.delete()
        return Response({"message": f"Transactions of user_id: {user_id} deleted"}, status=status.HTTP_200_OK)
