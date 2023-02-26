from .views import Transactions as all_view
from .views import SingleTransactionCreator as single_creator_view
from .views import SingleTransactionOperations as single_operations_view

from utils.general_utils import get_url_patterns

urlpatterns = get_url_patterns('transaction', all_view, single_creator_view, single_operations_view)
