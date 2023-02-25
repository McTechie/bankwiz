from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Company
from .serializer import CompanySerializer


# Create your views here.
class CreateCompany(APIView):

    def post(self, request):

        try:
            serializer = CompanySerializer(data=request.data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)



