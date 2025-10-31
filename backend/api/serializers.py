from rest_framework import serializers

from .models import Costume, Order, Order_Time, Cart, Funko
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CostumeSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Costume
        fields = '__all__'
class FunkoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funko
        fields = '__all__'
class OrderTimeSerializer(serializers.ModelSerializer):
    costume = CostumeSerializer(read_only = True)
    costume_id = serializers.PrimaryKeyRelatedField(
        queryset = Costume.objects.all(),
        source = 'costume',
        write_only = True
    )
    class Meta:
        model = Order_Time
        fields = ['costume','costume_id', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderTimeSerializer(many = True, write_only=True)
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Order
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    costume = CostumeSerializer(read_only=True)
    funko = FunkoSerializer(read_only=True)
    user = serializers.StringRelatedField(read_only=True)
    costume_id = serializers.PrimaryKeyRelatedField(
        queryset = Costume.objects.all(),
        source= 'costume',
        write_only = True,
        required= False
    )
    funko_id = serializers.PrimaryKeyRelatedField(
        queryset = Funko.objects.all(),
        source = 'funko',
        write_only = True,
        required= False
    )
    class Meta:
        model = Cart
        fields = ['id','costume','costume_id','funko', 'funko_id', 'quantity', 'user']