from .models import Bank as model
from .serializer import BankUserSerializer as serializer

from utils.view_utils import *

# Create your views here.
Banks = collective_operations(model, serializer)
SingleBankCreator = creator(serializer)
SingleBankOperations = singular_operation(model, serializer)
