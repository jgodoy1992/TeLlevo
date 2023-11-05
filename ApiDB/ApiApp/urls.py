from django.urls import path
from . import views

urlpatterns = [
    path('api/registro', views.Registro, name='registro'),
    path('api/ingreso', views.Ingreso, name='ingreso')
]
