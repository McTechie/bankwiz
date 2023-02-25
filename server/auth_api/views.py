from django.shortcuts import render

from .models import *
#from .serializer import BankUserSerializer as serializer

from utils.view_utils import *

from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages


from django.contrib import messages

#SingleBankOperations = singular_operation(model, serializer)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class Login(APIView):
   
    
    def post(self, request):
        try:
            username = request.data['username']
            password = request.data['password']
            username = 'aditya'
            password = 'password'
           # return Response({ 'success': True, 'username': username, 'password': password })

            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({ 'success': True, 'username': username, 'password': password })
            else:
                messages.info(request, 'Credentials Invalid')
                return Response({ 'success': True, 'username': username, 'password': password })
               # return Response({ 'success': False }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        except Exception as e:
            return Response({ 'error': e }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
class Register(APIView):
      def post(self, request):
        try :
         username = request.data['username']
         email = request.data['email']
         password1 = request.data['password1']
         password2 = request.data['password2']
        #  username = 'Aditya'
        #  email = 'aditya@gmail.com'        
        #  password1 = 'pass'
        #  password2 = 'pass'
         if username == '' :
            messages.success(request, "We've sent you an Email Please Check your Email Address")
            messages.warning(request,"No Username provided")
            return Response({ 'success': True, 'username': username,'email': email})
         if email == "" :
            messages.warning(request,"No Email Address provided")
            return Response({ 'success': True, 'username': username, 'email': email })

         if password1 == password2:
            if User.objects.filter(email=email).exists():
                messages.info(request, 'Email Taken')
                return Response({ 'success': True, 'username': username, 'email': email})
            elif User.objects.filter(username=username).exists():
                messages.info(request, 'Username Taken')
                return Response({ 'success': True, 'username': username, 'email': email })
            else:
                user = User.objects.create_user(username=username, email=email, password=password1)
                user.save()

            

                messages.success(request, "We've sent you an Email to verify your Email Address")
                return Response({"username": username,'email': email})
        
     
        except Exception as e:
            return Response({ 'error': str(e) }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
         
      def get(self, request) :
           return Response({ 'success': True })
        

class Logout(APIView):
   def post(self, request):
    auth.logout(request)
    return Response({ 'success': True})
     
