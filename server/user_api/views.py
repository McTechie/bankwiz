from .models import User as model
from .serializer import UserUserSerializer as serializer

from utils.view_utils import *

# Create your views here.
Users = collective_operations(model, serializer)
SingleUserCreator = creator(serializer)
SingleUserOperations = singular_operation(model, serializer)
