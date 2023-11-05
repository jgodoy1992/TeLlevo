from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):

    password = serializers.CharField(max_length=128, write_only=True)

    def validate_password(self, password):
        return make_password(password)

    class Meta:
        model = Usuario
        fields = '__all__'
