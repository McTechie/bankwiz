import models
from rest_framework.serializers import ModelSerializer
from utils.general_utils import serializer


ProfileSerializer = serializer(models.Profile)
UserSerializer = serializer(models.User)

