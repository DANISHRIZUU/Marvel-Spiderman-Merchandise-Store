from urllib import request
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Costume, Cart
from .serializers import CartSerializer


# Create your views here.

def hello(request):
    return JsonResponse({"message": "Welcome to SpiderMan Merchandise"})

@api_view(['GET'])
def get_costumes(request):
    costumes = Costume.objects.all()
    # data ko json ready format mai convert karo \
    data = []
    for costume in costumes:
        data.append({
            "id": costume.id,
            "name": costume.name,
            "price": str(costume.price), # string mai convert kia
            "description": costume.description,
            "image": request.build_absolute_uri(costume.image.url) if costume.image else None,
            "size": costume.size,
            "material": costume.material,
            "stock_quantity": costume.stock_quantity,
            "is_from_movie": costume.is_from_movie,
            "movie_name": costume.movie_name

        }) 
    return Response(data)
@api_view(['GET'])
def view_product(request, product_id):
    costume = get_object_or_404(Costume, id=product_id)

    data= {
        "id": costume.id,
        "name": costume.name,
        "price": str(costume.price), # string mai convert kia
        "description": costume.description,
        "image": request.build_absolute_uri(costume.image.url) if costume.image else None,
        "size": costume.size,
        "material": costume.material,
        "stock": costume.stock_quantity,
        "is_from_movie": costume.is_from_movie,
        "movie_name": costume.movie_name if costume.movie_name else None
    }
    return Response(data)

@api_view(['POST'])
def add_to_cart(request):
    serializer = CartSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message" : "Product added to cart", "data": serializer.data})
    return Response(serializer.errors, status = 400)

@api_view(['GET'])
def get_cart(request):
    items = Cart.objects.all()
    serializer = CartSerializer(items, many=True)
    return Response(serializer.data)