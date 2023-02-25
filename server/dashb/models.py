from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
import uuid


# Create your models here.
class EndUser(models.Model):

    id = models.UUIDField(default=uuid.uuid4, unique=True,
                              primary_key=True, editable=False)
    firstname = models.CharField(max_length=50,blank=False)
    lastname = models.CharField(max_length=50, blank=False)
    organisation = models.CharField(max_length=100, blank=False)
    email = models.EmailField(max_length=100, blank=True, null=True, unique=True)
    phone_number = PhoneNumberField(unique= True, blank=True)
    aadhar = models.CharField(max_length=12, unique=True, blank=True, null=True)
    pan = models.CharField(max_length=10, unique=True, blank=True, null=True)
    gstin = models.CharField(max_length=15, unique=True, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)


class Bank(models.Model):

    bankid = models.UUIDField(default=uuid.uuid4, unique=True,
                              primary_key=True, editable=False)
    bankname = models.CharField(max_length=500, blank=False)
    hqlocation = models.CharField(max_length=500, blank=True, null=True)
    added = models.DateTimeField(auto_now_add=True)  # when was the bank associated with the EndUser.

    def __str__(self):
        return str(self.bankid)


class Account(models.Model):

    accountid = models.UUIDField(default=uuid.uuid4, unique=True,
                              primary_key=True, editable=False)
    accountnum = models.CharField(max_length=20, unique=True)
    accountname = models.CharField(max_length=200)
    bankid = models.ForeignKey(Bank, blank=False)
    id = models.ForeignKey(EndUser, blank=False)
    branch = models.CharField(max_length=200, blank=False)
    branchcode = models.CharField(max_length=30, blank=False)
    purpose = models.CharField(max_length=50, blank=True, null=True)
    accountbalance = models.DecimalField()
    creditlimit = models.DecimalField()

    def __str__(self):
        return str(self.accountid)


class Transaction(models.Model):

    transaction_id = models.UUIDField(default=uuid.uuid4, unique=True,
                                primary_key=True, editable=False)
    transaction_status = models.CharField(max_length=20, unique=False)  # (Approved, Pending, Cancelled, Failed ...)
    transaction_type = models.CharField(max_length=20, unique=False)  # (NEFT, RTGS, ...)
    from_account = models.ForeignKey(Account, blank=False)
    to_account = models.ForeignKey(Account, blank=False)
    amount = models.DecimalField()
    timestamp = models.DateTimeField()

    def __str__(self):
        return str(self.transaction_id)
