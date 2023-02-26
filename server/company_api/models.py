from django.db import models
import uuid


# Create your models here.
class Company(models.Model):
    company_id = models.AutoField(primary_key=True)
    company_name = models.CharField(max_length=200, blank=False)
    location = models.CharField(max_length=500, blank=True, null=True)
    pan = models.CharField(max_length=99, unique=True, blank=False)
    gstin = models.CharField(max_length=99, unique=True, blank=False)
    pincode = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return str(self.company_id)
