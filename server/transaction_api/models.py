from django.db import models
import uuid
from company_api.models import Company
from user_api.models import User
from bank_api.models import Bank
from account_api.models import Account


# Create your models here.
class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    bank_id = models.ForeignKey(Bank, on_delete=models.CASCADE)
    account_number = models.CharField(max_length=99, unique=False)
    amount = models.DecimalField(max_digits=99, decimal_places=2)
    transaction_status = models.CharField(max_length=99, unique=False)  # (Approved, Pending, Cancelled, Failed ...)
    transaction_type = models.CharField(max_length=99, unique=False)  # (NEFT, RTGS, ...)
    transaction_with = models.CharField(max_length=99, blank=False)
    purpose = models.CharField(max_length=50, blank=True, null=True)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return str(self.transaction_id)
