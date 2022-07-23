from django.contrib import admin
from .models import *


class orderedAdmin(admin.ModelAdmin):
    list_display = (
        "_id",
        "user",
        "totalPrice",
        "isDelivered",
        "deliveredAt",
        "createdAt",
        "shippingPrice",
    )
    #

    def get_queryset(self, request):
        queryset = super(orderedAdmin, self).get_queryset(request)
        queryset = queryset.order_by("-_id")
        return queryset


# Register your models here.
admin.site.register(User)
admin.site.register(Product)
admin.site.register(ContactUs)
admin.site.register(Order, orderedAdmin)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
# admin.site.register(Category)
