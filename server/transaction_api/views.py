from .models import Transaction as model
from .serializer import TransactionUserSerializer as serializer

from utils.view_utils import *

# Create your views here.
Transactions = collective_operations(model, serializer)
SingleTransactionCreator = creator(serializer)
SingleTransactionOperations = singular_operation(model, serializer)
