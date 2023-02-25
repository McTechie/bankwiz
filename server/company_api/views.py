from .models import Company as model
from .serializer import CompanyUserSerializer as serializer

from utils.view_utils import *

# Create your views here.
Companys = collective_operations(model, serializer)
SingleCompanyCreator = creator(serializer)
SingleCompanyOperations = singular_operation(model, serializer)
