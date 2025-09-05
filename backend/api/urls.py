from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello, name='hello'),
    path('costumes/', views.get_costumes, name='get_costumes'),
    path('view/<int:product_id>', views.view_product, name='view_product'),
    path('cart/add/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.get_cart, name='get_cart')
    
]