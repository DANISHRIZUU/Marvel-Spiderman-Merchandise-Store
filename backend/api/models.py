from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Costume(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='costumes/', null=True, blank=True)
    size = models.CharField(max_length=10)
    material = models.CharField(max_length=100)
    stock_quantity = models.IntegerField()
    is_from_movie = models.BooleanField(default=True)
    movie_name = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=100, null=True)

    def __str__(self):
        return str(self.id)

class Order_Time(models.Model):
    costume = models.ForeignKey(Costume, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=1)
    date_added = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        # get product name if exists
        product_name = self.costume.name if self.costume else "Deleted Product"
        # get order id if exists
        order_id = self.order.id if self.order else "No Or der"
        return f"{ self.quantity } x { product_name } (Order: {order_id})"
    
class Cart(models.Model):
    costume = models.ForeignKey(Costume, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.IntegerField(default=0)