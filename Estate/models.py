from django.db import models
from django.contrib.auth.models import AbstractUser
from User.models import User

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


class EstateUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    estate = models.ForeignKey(Estate, on_delete=models.CASCADE)
    user_type = models.CharField(choices=ESTATE_USER_TYPES_CHOICES, max_length=25)


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
