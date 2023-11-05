from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField()
    password = models.CharField(max_length=128)
