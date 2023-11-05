from django.contrib import admin
from .models import Usuario


@admin.register(Usuario)
class ModelUsuarioAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email', 'password']
