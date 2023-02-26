from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from django.urls import path

def exception_catcher(func):
    def runner(*args):
        try:
            return func(*args)
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    return runner


def serializer(_model):
    class Serializer(serializers.ModelSerializer):
        class Meta:
            model = _model
            fields = "__all__"

    return Serializer


def get_url_patterns(endpoint, all_view, single_creator_view, single_operations_view):
    urlpatterns = [
        path(f"{endpoint}s/", all_view.as_view()),
        path(f"{endpoint}/", single_creator_view.as_view()),
        path(f"{endpoint}/<int:{endpoint}_id>", single_operations_view.as_view()),
    ]

    return urlpatterns
