from rest_framework import serializers

from .models import Costume, Order, Order_Time, Cart

class CostumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Costume
        fields = '__all__'
class OrderTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order_Time
        fields = ['costume', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderTimeSerializer(many = True, write_only=True)
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Order
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    costume = CostumeSerializer(read_only=True)
    costume_id = serializers.PrimaryKeyRelatedField(
        queryset = Costume.objects.all(),
        source = 'costume',
        write_only = True
    )
    class Meta:
        model = Cart
        fields = ['id', 'costume','costume_id', 'quantity']