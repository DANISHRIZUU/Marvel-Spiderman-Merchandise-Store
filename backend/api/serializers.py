from rest_framework import serializers
from .models import Costume

class CostumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Costume
        fields = '__all__'