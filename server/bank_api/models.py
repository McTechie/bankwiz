from django.db import models
import uuid

# Create your models here.
class Bank(models.Model):

    bankid = models.UUIDField(default=uuid.uuid4, unique=True,
                              primary_key=True, editable=False)
    bankname = models.CharField(max_length=500, blank=False)
    hqlocation = models.CharField(max_length=500, blank=True, null=True)
    hqpincode = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return str(self.bankid)

