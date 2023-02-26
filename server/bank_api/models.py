from django.db import models
import uuid

# Create your models here.
class Bank(models.Model):
    bank_id = models.AutoField(primary_key=True)
    bank_name = models.CharField(max_length=500, blank=False)
    location = models.CharField(max_length=500, blank=True, null=True)
    pincode = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return str(self.bank_id)
