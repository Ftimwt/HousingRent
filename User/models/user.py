from django.contrib.auth.models import AbstractUser
from django.db import models

from User.managers import UserManager


class User(AbstractUser):
    phone_number = models.CharField(max_length=11, unique=True)
    first_name = models.CharField(max_length=30, default="")
    last_name = models.CharField(max_length=30, default="")
    national_code = models.CharField(max_length=10)
    address = models.CharField(max_length=250)
    father = models.CharField(max_length=250, default="")
    birth_certificate_id = models.CharField(max_length=250, default="")
    birthday = models.DateField(default=None)
    issued_national = models.CharField(max_length=250, default="")

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return str(self.id) + ". " + str(self.username)

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

