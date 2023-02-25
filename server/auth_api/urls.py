from django.urls import path
from .views import (
    Login,
    Register,
    Logout
)
# from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path("login/", Login.as_view()),
    path("register/", Register.as_view()),
    path("logout/", Logout.as_view()),
]