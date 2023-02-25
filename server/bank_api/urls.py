from .views import Banks as all_view
from .views import SingleBankCreator as single_creator_view
from .views import SingleBankOperations as single_operations_view

from utils.general_utils import get_url_patterns

urlpatterns = get_url_patterns('bank', all_view, single_creator_view, single_operations_view)
