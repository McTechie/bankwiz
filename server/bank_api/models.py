from django.db import models
import uuid

# Create your models here.
class Bank(models.Model):
    bankid = models.AutoField(primary_key=True)
    bankname = models.CharField(max_length=500, blank=False)
    location = models.CharField(max_length=500, blank=True, null=True)
    pincode = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return str(self.bank_id)
