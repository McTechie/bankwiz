from django.db import models
import uuid


# Create your models here.
class Company(models.Model):

    compid = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    compname = models.CharField(max_length=200, blank=False)
    hqlocation = models.CharField(max_length=500, blank=True, null=True)
    pan = models.CharField(max_length=10, unique=True, blank=False)
    gstin = models.CharField(max_length=15, unique=True, blank=False)
    hqpincode = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return str(self.compid)

