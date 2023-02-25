import models

class BankUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Bank
        fields = "__all__"
