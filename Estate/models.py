from django.contrib.auth.models import AbstractUser
from django.db import models

from User.models.user import User

ESTATE_TYPES_CHOICES = (("office", "اداری"), ("residential", "مسکونی"))
ESTATE_USER_TYPES_CHOICES = (
    ("tenant", "مستاجر"),
    ("owner", "صاحب ملک")
)


class Estate(models.Model):
    estate_type = models.CharField(choices=ESTATE_TYPES_CHOICES, max_length=25, default="residential")
    address = models.TextField()
    rental_price = models.IntegerField()
    mortgage_price = models.IntegerField()
    size_of_house = models.IntegerField()
    description = models.TextField()
    longitude = models.FloatField()
    latitude = models.FloatField()

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_properties')
    tenant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rented_properties', null=True, blank=True)

    is_confirm = models.BooleanField(default=False)


class EstateFile(models.Model):
    FILE_TYPES = (
        ('photo', 'Photo'),
        ('document', 'Document'),
        ('other', 'Other'),
    )

    estate = models.ForeignKey(Estate, on_delete=models.CASCADE, related_name='files')
    file_type = models.CharField(max_length=20, choices=FILE_TYPES)
    file = models.FileField(upload_to='estate_files/')

    def __str__(self):
        return f"{self.file_type} - {self.file.name}"


class EstateRequest(models.Model):
    estate = models.ForeignKey(Estate, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    accepted = models.BooleanField(null=True)

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
