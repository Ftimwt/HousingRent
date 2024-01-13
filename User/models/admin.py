from django.db import models

from Estate.models import Estate
from User.models.user import User


class AdminMessage(models.Model):
    title = models.CharField(max_length=50)
    message = models.TextField()
    estate = models.ForeignKey(Estate, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
