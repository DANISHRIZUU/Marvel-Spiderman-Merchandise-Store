from django.contrib import admin
from .models import Costume, Order, Order_Time, Cart
# Register your models here.
admin.site.register(Costume)
admin.site.register(Order)
admin.site.register(Order_Time)
admin.site.register(Cart)