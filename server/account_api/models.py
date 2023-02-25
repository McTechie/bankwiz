from django.db import models
import uuid
from bank_api.models import Bank
from company_api.models import Company


# Create your models here.
class Account(models.Model):

    accountid = models.UUIDField(default=uuid.uuid4, unique=True,
                              primary_key=True, editable=False)
    accountnum = models.CharField(max_length=20, unique=True)
    accountname = models.CharField(max_length=200)
    bankid = models.ForeignKey(Bank, on_delete=models.CASCADE, blank=False)
    compid = models.ForeignKey(Company, on_delete=models.CASCADE, blank=False)
    branch = models.CharField(max_length=200, blank=False)
    branchcode = models.CharField(max_length=30, blank=False)
    type = models.CharField(max_length=50, blank=True) # Corporate
    purpose = models.CharField(max_length=50, blank=True, null=True)
    accountbalance = models.DecimalField(max_digits=99, decimal_places=2)
    creditlimit = models.DecimalField(max_digits=99, decimal_places=2)

    def __str__(self):
        return str(self.accountid)

