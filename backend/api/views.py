from urllib import request
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.views import APIView
from rest_framework import status
from .models import Costume, Cart, Order_Time, Order, User
from .serializers import CartSerializer, OrderTimeSerializer, UserSerializer
import json



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
    data = request.data.copy()
    data['user'] = request.user.id
    serializer = CartSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message" : "Product added to cart", "data": serializer.data})
    return Response(serializer.errors, status = 400)


@api_view(['GET'])
def get_cart(request):
    items = Cart.objects.filter(user=request.user)
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
        
@permission_classes([IsAuthenticated])
@authentication_classes({})      
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
        
@csrf_exempt
@permission_classes([AllowAny])
@api_view(['GET', 'POST'])
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            print({"success": True, "message": "Login successful", "user": request.user.username})
            return JsonResponse({"success": True, "message": "Login successful", "user": request.user.username})
        else:
            print({"success": False, "message": "Invalid username or password", "message": "Only Post method allowed"})
            return JsonResponse({"success": False, "message": "Invalid username or password", "message": "Only Post method allowed"}, status=401)
    else:
        return JsonResponse({"message": "Only Post method allowed"})

    