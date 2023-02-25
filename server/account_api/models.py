from django.db import models
import uuid
from bank_api.models import Bank
from company_api.models import Company


# Create your models here.
class Account(models.Model):
    account_id = models.AutoField(primary_key=True)
    account_number = models.CharField(max_length=99, unique=True)
    account_name = models.CharField(max_length=200)
    bank_id = models.ForeignKey(Bank, on_delete=models.CASCADE)
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    branch = models.CharField(max_length=200, blank=False)
    branch_code = models.CharField(max_length=99, blank=False)
    purpose = models.CharField(max_length=50, blank=True, null=True)
    account_balance = models.DecimalField(max_digits=99, decimal_places=2)
    credit_limit = models.DecimalField(max_digits=99, decimal_places=2)

    def __str__(self):
        return str(self.account_id)
