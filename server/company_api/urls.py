from .views import Companys as all_view
from .views import SingleCompanyCreator as single_creator_view
from .views import SingleCompanyOperations as single_operations_view

from utils.general_utils import get_url_patterns

urlpatterns = get_url_patterns('company', all_view, single_creator_view, single_operations_view)
