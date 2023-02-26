from .models import Account as model
from .serializer import AccountUserSerializer as serializer

from utils.view_utils import *

# Create your views here.
Accounts = collective_operations(model, serializer)
SingleAccountCreator = creator(serializer)
SingleAccountOperations = singular_operation(model, serializer)
