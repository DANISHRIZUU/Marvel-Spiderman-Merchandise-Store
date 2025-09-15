from django.urls import path
from . import views
from .views import CartDetail

urlpatterns = [
    path('hello/', views.hello, name='hello'),
    path('costumes/', views.get_costumes, name='get_costumes'),
    path('view/<int:product_id>', views.view_product, name='view_product'),
    path('cart/add/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.get_cart, name='get_cart'),
    path('cart/<int:pk>/', CartDetail.as_view(), name="cart-detail"),
    path('order/', views.order_taking, name="order_taking")
    
]