from django.db import models
import uuid
from company_api.models import Company
from user_api.models import User
from bank_api.models import Bank
from account_api.models import Account


# Create your models here.
class Transaction(models.Model):

    transaction_id = models.UUIDField(default=uuid.uuid4, unique=True,
                                primary_key=True, editable=False)
    compid = models.ForeignKey(Company, on_delete=models.CASCADE, blank=False)
    id = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
    bankid = models.ForeignKey(Bank, on_delete=models.CASCADE, blank=False)
    accountid = models.ForeignKey(Account, on_delete=models.CASCADE, blank=False)
    amount = models.DecimalField(max_digits=99, decimal_places=2)
    transaction_status = models.CharField(max_length=20, unique=False)  # (Approved, Pending, Cancelled, Failed ...)
    transaction_type = models.CharField(max_length=20, unique=False)  # (NEFT, RTGS, ...)
    transaction_with = models.CharField(max_length=50, blank=False)
    purpose = models.CharField(max_length=50, blank=True, null=True)
    timestamp = models.DateTimeField()

    def __str__(self):
        return str(self.transaction_id)
