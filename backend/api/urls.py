from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello, name='hello'),
    path('costumes/', views.get_costumes, name='get_costumes'),
    path('view/<int:product_id>', views.view_product, name='view_product')
]