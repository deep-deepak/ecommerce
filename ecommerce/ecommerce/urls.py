from django.contrib import admin
from django.urls import path
from ecommerce_app import views
from django.conf import settings
from django.conf.urls.static import static
from ecommerce_app.views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [

    path('login', MyTokenObtainPairView.as_view(), name='login'),
    path('register', views.registerUser, name='register'),
    path('contact', views.contactus, name='contact'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('admin/', admin.site.urls),
    path('get_product', views.get_product, name='get_product'),
    path('add_product', views.add_product, name='add_product'),
    path('productdetails/<int:pk>/', views.productdetails),
    path('getproduct_admin', views.admin_product, name='admin_product'),

    # new path for order,shipping,payment ,updtaeorder and delete order

    path('', views.getOrders, name='orders'),
    path('getsellerorders', views.getOrders, name='getsellerorders'),
    path('getadminorders', views.getAdminOrders, name='adminorders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),

    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),

    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),

    # UserProfile
    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),

    path('userlist', views.getUsers, name="users"),

    path('<str:pk>/getuser', views.getUserById, name='user'),

    path('update/<str:pk>/', views.updateUser, name='user-update'),

    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('upload/', views.uploadImage, name="image-upload"),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
