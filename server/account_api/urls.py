from .views import Accounts as all_view
from .views import SingleAccountCreator as single_creator_view
from .views import SingleAccountOperations as single_operations_view

from utils.general_utils import get_url_patterns

urlpatterns = get_url_patterns('account', all_view, single_creator_view, single_operations_view)
