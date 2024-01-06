from django.apps import apps
from django.contrib import admin

post_models = apps.get_app_config('User').get_models()

for model in post_models:
    admin.site.register(model)
