from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from company_api.models import Company
import uuid

# Create your models here.
class User(models.Model):
    transactionid = models.AutoField(primary_key=True)
    companyid = models.ForeignKey(Company, on_delete=models.CASCADE)
    password = models.CharField(max_length=20, blank=False, null=False)
    firstname = models.CharField(max_length=50,blank=False)
    lastname = models.CharField(max_length=50, blank=False)
    designation = models.CharField(max_length=100, blank=False)
    email = models.EmailField(max_length=100, blank=True, null=True, unique=True)
    aadhar = models.CharField(max_length=12, unique=True, blank=True, null=True)
    pan = models.CharField(max_length=10, unique=True, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.transaction_id)
