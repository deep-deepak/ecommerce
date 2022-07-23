from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, User, OrderItem, Order, ShippingAddress, ContactUs
from rest_framework import serializers
# import django_filters


# Product serializer
class Productserializers(serializers.ModelSerializer):
    # price = django_filters.NumberFilter()
    # price__gt = django_filters.NumberFilter(name='price', lookup_expr='gt')
    # price__lt = django_filters.NumberFilter(name='price', lookup_expr='lt')

    class Meta:
        model = Product
        fields = [
            "_id",
            "name",
            "image",
            "brand",
            "category",
            "description",
            "price",
            "stock",
            "user",
        ]


# user serialzer


class UserSerializer(serializers.ModelSerializer):
    # name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "_id", "first_name", "email", "role", "isAdmin"]

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "_id", "first_name",
                  "email", "role", "isAdmin", "token"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


# order serializer
class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data


# order item serializer


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


# shipping Address serializer


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


# Contact us


class ContactSerializers(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = "__all__"
