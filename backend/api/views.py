from urllib import request
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from .models import Costume, Cart, Order_Time, Order, User
from .serializers import CartSerializer, OrderTimeSerializer, UserSerializer
import json



# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

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

class CartDetail(APIView):
    def delete(self, request, pk):
        try:
            cart_item = Cart.objects.get(pk=pk)
            cart_item.delete()
            return Response({"message": "item removed"}, status=status.HTTP_204_NO_CONTENT)
        except Cart.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NO_CONTENT)
        
@api_view(['GET','POST'])        
def order_taking(request):
    if request.method == 'POST':
        serializer = OrderTimeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Transaction Successful", "data": serializer.data})
        return Response(serializer.errors, status=400)
    if request.method == 'GET':
        orders = Order_Time.objects.all()
        serializer = OrderTimeSerializer(orders, many=True)
        return Response(serializer.data)
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        print(username)
        print(password)

        return JsonResponse({"message": "Login request recieved", "username": username, "password": password})
    else:
        return JsonResponse({"error": "only post method allowed"}, 405)
@csrf_exempt
@api_view(['GET', 'POST'])
def register(request):
    if request.method == 'POST':
        print("RAW BODY: ", request.body)
        data = json.loads(request.body)
        print("DATA: ", data)
        print("Username:  ", data.get("username"))
        print("Password: ", data.get("password"))
        username = data.get('username')
        password = data.get('password')
        try:
            user = User.objects.create_user(username=username, password=password)
            user.save()
            print(username)
            print(password)
            return JsonResponse({"message": "User Account Created.", "username": username, "password": password}, status=201)
        except IntegrityError:  
            return JsonResponse({"message": "username already taken"}) 
    else:
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
        
    

    