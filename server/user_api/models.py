from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from company_api.models import Company
import uuid

# Create your models here.
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    password = models.CharField(max_length=99, blank=False, null=False)
    first_name = models.CharField(max_length=50,blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    designation = models.CharField(max_length=100, blank=False)
    email = models.EmailField(max_length=100, blank=True, null=True, unique=True)
    aadhar = models.CharField(max_length=99, unique=True, blank=True, null=True)
    pan = models.CharField(max_length=99, unique=True, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user_id)
