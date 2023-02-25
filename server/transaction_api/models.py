from django.db import models

# Create your models here.
class Transaction(models.Model):

    transaction_id = models.UUIDField(default=uuid.uuid4, unique=True,
                                primary_key=True, editable=False)
    transaction_status = models.CharField(max_length=20, unique=False)  # (Approved, Pending, Cancelled, Failed ...)
    transaction_type = models.CharField(max_length=20, unique=False)  # (NEFT, RTGS, ...)
    from_account = models.ForeignKey(Account, on_delete=models.CASCADE, blank=False, related_name='fromaccount')
    to_account = models.ForeignKey(Account, on_delete=models.CASCADE, blank=False, related_name='toaccount')
    amount = models.DecimalField(max_digits=99, decimal_places=2)
    purpose = models.CharField(max_length=50, blank=True, null=True)
    timestamp = models.DateTimeField()

    def __str__(self):
        return str(self.transaction_id)
