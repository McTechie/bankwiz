from rest_framework import serializers
import models


class EndUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EndUser
        fields = "__all__"


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Account
        fields = "__all__"


class BankUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Bank
        fields = "__all__"


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transaction
        fields = "__all__"
