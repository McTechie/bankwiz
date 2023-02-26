from . import models
from utils.general_utils import serializer

TransactionUserSerializer = serializer(models.Transaction)
