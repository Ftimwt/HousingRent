from django.apps import apps
from django.contrib import admin

# Register your models here.

post_models = apps.get_app_config('Estate').get_models()

for model in post_models:
    admin.site.register(model)
