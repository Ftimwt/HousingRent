from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from django.db import models

from User.managers import UserManager


class User(AbstractUser):
    phone_number = models.CharField(max_length=11, unique=True)
    first_name = models.CharField(max_length=30, default="")
    last_name = models.CharField(max_length=30, default="")
    national_code = models.CharField(max_length=10)
    address = models.CharField(max_length=250)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return str(self.id) + ". " + str(self.username)
