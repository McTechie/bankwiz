from django.db import models

# Create your models here.
class User(models.Model):

    id = models.UUIDField(default=uuid.uuid4, unique=True,
                              primary_key=True, editable=False)
    compid = models.ForeignKey(Company, on_delete=models.CASCADE, blank=False)
    password = models.CharField(max_length=20, blank=False, null=False)
    firstname = models.CharField(max_length=50,blank=False)
    lastname = models.CharField(max_length=50, blank=False)
    designation = models.CharField(max_length=100, blank=False)
    organisation = models.CharField(max_length=100, blank=False)
    email = models.EmailField(max_length=100, blank=True, null=True, unique=True)
    phone_number = PhoneNumberField(unique= True, blank=True)
    aadhar = models.CharField(max_length=12, unique=True, blank=True, null=True)
    pan = models.CharField(max_length=10, unique=True, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)
