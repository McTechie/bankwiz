from .views import Users as all_view
from .views import SingleUserCreator as single_creator_view
from .views import SingleUserOperations as single_operations_view

from utils.general_utils import get_url_patterns

urlpatterns = get_url_patterns('user', all_view, single_creator_view, single_operations_view)
