from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Bank
from .serializer import BankUserSerializer

# Create your views here.
class BankLising(APIView):
    def get(self, request):
        pass

    def delete(self, request):
        pass


class CreateBank(APIView):
    def post(self, request):
        pass


class BankDetail(APIView):
    def get(self, request, id):
        pass

    def put(self, request, id):
        pass

    def delete(self, request, id):
        pass


class SearchBanks(APIView):
    def post(self, request):
        pass
