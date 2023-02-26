from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from transaction_api.models import Transaction
from bank_api.models import Bank
from account_api.models import Account
from user_api.models import User
from company_api.models import Company
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


class GetRelevantDetails(APIView):
    @exception_catcher
    def post(self, request):
        return_list = []
        banks = []
        user_id = request.data['user_id']
        user = User.objects.filter(user_id=user_id)[0]
        company_id = user.company_id
        accounts = Account.objects.filter(company_id=company_id)
        for account in accounts:
            banks.append(account.bank_id)
        
        for bank in banks:
            bank_dict = {}
            bank_dict['bank_id'] = bank.bank_id
            bank_dict['bank_name'] = bank.bank_name
            bank_dict['accounts'] = []
            accounts = Account.objects.filter(bank_id=bank.bank_id, company_id=company_id)
            for account in accounts:
                account_dict = {}
                account_dict['account_id'] = account.account_id
                account_dict['transactions'] = []
                transactions = Transaction.objects.filter(account_number=account.account_number)
                for transaction in transactions:
                    account_dict['transactions'].append(TransactionUserSerializer(transaction).data)
                bank_dict['accounts'].append(account_dict)
            return_list.append(bank_dict)

        return Response(return_list, status=status.HTTP_200_OK)


    @exception_catcher
    def delete(self, request):
        pass
