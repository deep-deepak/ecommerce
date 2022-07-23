from django.contrib.auth.hashers import make_password
from rest_framework import status
import datetime
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.db import IntegrityError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db.models import Q
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Product, User, OrderItem, Order, ShippingAddress, ContactUs
from .serializers import (
    Productserializers,
    UserSerializerWithToken,
    OrderSerializer,
    ContactSerializers,
    UserSerializer,
)

import math


# get producst by customer & seller


@api_view(["GET"])
def get_product(request):
    query = request.query_params.get("keyword")
    page = int(request.query_params.get("page", 1)) - 1
    category = request.query_params.get("category")
    brand = request.query_params.get("brand")
    min_price = request.query_params.get('min_price', 0)
    max_price = request.query_params.get('max_price', 0)
    # print(category)

    # print(category)

    # to get the price in btw min and max
    conditions = {}
    if min_price:
        conditions['price__gte'] = min_price
    if max_price:
        conditions['price__lte'] = max_price
    product = Product.objects.filter(**conditions)

    if "userId" in request.query_params:
        product = Product.objects.filter(user=request.query_params["userId"])

    else:

        if query:
            product = Product.objects.filter(name__icontains=query)

  # category filtering

        elif "category" in request.query_params:
            product = Product.objects.filter(
                category=request.query_params["category"])

# brand filtering

        elif "brand" in request.query_params:
            product = Product.objects.filter(
                brand=request.query_params["brand"])

         # # price filtering
    #

        # elif "price" in request.query_params:
        #     product = Product.objects.filter(
        #         brand=request.query_params["brand"])

        else:
            product = Product.objects.all()

    limit = 4
    product = product[page * limit: (page * limit) + limit]

    serializer = Productserializers(product, many=True)
    return Response(serializer.data)


# get producst by admin
@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_product(request):
    sortBy = request.query_params.get("sortBy", "_id")
    sortOrder = request.query_params.get("sortOrder", "asc")
    if sortOrder != "asc":
        sortBy = "-" + sortBy
    products = Product.objects.all().order_by(sortBy)

    # For Pagination

    page = request.query_params.get("page")

    print("Page:", page)
    paginator = Paginator(products, 5)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print(products)
    serializer = Productserializers(products, many=True)
    return Response(
        {"products": serializer.data, "page": page, "pages": paginator.num_pages}
    )


# add products
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_product(request):
    data = request.data
    data["user"] = request.user.id

    serializer = Productserializers(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)


# Product details
@api_view(["GET", "PUT", "DELETE"])
def productdetails(request, pk):
    try:
        task = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = Productserializers(task)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = Productserializers(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# for register
@api_view(["POST"])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name=data["name"],
            # last_name=data["last_name"],
            email=data["email"],
            username=data["email"],
            password=make_password(data["password"]),
        )
        serializer = UserSerializerWithToken(user, many=False)
        print("serializer.data")
        print(serializer.data)
        return Response(serializer.data)
    except IntegrityError as e:
        return Response(
            {"detail": "That email is already registered"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except KeyError as e:
        message = {"detail": str(*e.args) + " is required"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return Response(
            {"detail": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST
        )


# for login
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# for order
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data["orderItems"]

    if orderItems and len(orderItems) == 0:
        return Response(
            {"detail": "No Order Items"}, status=status.HTTP_400_BAD_REQUEST
        )
    else:

        # (1) Create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data["paymentMethod"],
            taxPrice=data["taxPrice"],
            shippingPrice=data["shippingPrice"],
            totalPrice=data["totalPrice"],
        )

        # (2) Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"],
            postalCode=data["shippingAddress"]["postalCode"],
            country=data["shippingAddress"]["country"],
        )

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i["product"])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i["qty"],
                price=i["price"],
                image=product.image.url,
            )

            # (4) Update stock
            product.stock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


# get orders by Customer
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# get orders by Seller
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrders(request):
    orders = Order.objects.all().order_by("-_id")
    # orders = Order.objects.filter(totalPrice =True).order_by('shippingPrice')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# get orders by admin
@api_view(["GET"])
@permission_classes([IsAdminUser])
def getAdminOrders(request):
    sortBy = request.query_params.get("sortBy", "_id")
    sortOrder = request.query_params.get("sortOrder", "asc")
    if sortOrder != "asc":
        sortBy = "-" + sortBy
    orders = Order.objects.all().order_by(sortBy)
    # For Pagination

    page = request.query_params.get("page")

    # print('Page:', orders)
    paginator = Paginator(orders, 5)

    try:
        orders = paginator.page(page)
    except PageNotAnInteger:
        orders = paginator.page(1)
    except EmptyPage:
        orders = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    serializer = OrderSerializer(orders, many=True)
    return Response(
        {"orders": serializer.data, "page": page, "pages": paginator.num_pages}
    )


# get order by id
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.role == "customer" or user.role == "seller" or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "Not authorized to view this order"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    except:
        return Response(
            {"detail": "Order does not exist"}, status=status.HTTP_400_BAD_REQUEST
        )


# update  products to be delivered
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.datetime.now()
    order.save()

    return Response("Order was paid")


# update order to be delivered
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.datetime.now()
    order.save()
    return Response("Order was delivered")


@api_view(["POST"])
def contactus(request):
    task = ContactUs.objects.all()
    serializer = ContactSerializers(task, many=True)
    return Response(serializer.data)


#  Show UserProfile
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]

    if data["password"] != "":
        user.password = make_password(data["password"])

    user.save()
    print(serializer.data)
    return Response(serializer.data)


# get user profile
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


# get users by admin
@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    # For Sorting

    sortBy = request.query_params.get("sortBy", "id")
    sortOrder = request.query_params.get("sortOrder", "asc")

    if sortOrder != "asc":
        sortBy = "-" + sortBy
    users = User.objects.all().order_by(sortBy)

    # For Pagination

    page = request.query_params.get("page")

    print("Page:", page)
    paginator = Paginator(users, 5)

    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print(users)
    serializer = UserSerializer(users, many=True)
    return Response(
        {"users": serializer.data, "page": page, "pages": paginator.num_pages}
    )


# get user by id
@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUserById(request, pk):

    user = User.objects.get(id=pk)

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


# update user
@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]
    user.is_staff = data["isAdmin"]
    user.role = data["role"]
    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


# delete user
@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response("User was deleted")


# for imageuppload at admin side
@api_view(["POST"])
def uploadImage(request):
    data = request.data

    product_id = data["product_id"]
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get("image")
    product.save()

    return Response("Image was uploaded")
