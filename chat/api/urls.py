from django.contrib import admin
from django.urls import path, include
from chat.api import views

urlpatterns = [
    path('', views.ChatlistApiView.as_view(), name="list"),
    path('create/', views.ChatCreate.as_view(), name="create"),
    path('<pk>/detail', views.ChatDetailApiView.as_view(), name="detail"),
    path('<pk>/delete', views.ChatDeleteApiView.as_view(), name="delete"),
    path('<pk>/update', views.ChatUpdateApiView.as_view(), name="update"),
]
