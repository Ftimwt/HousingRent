# Generated by Django 5.0 on 2023-12-31 17:54

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Estate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estate_type', models.CharField(choices=[('office', 'اداری'), ('residential', 'مسکونی')], default='residential', max_length=25)),
                ('address', models.TextField()),
                ('rental_price', models.IntegerField()),
                ('mortgage_price', models.IntegerField()),
                ('size_of_house', models.IntegerField()),
                ('description', models.TextField()),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('is_confirm', models.BooleanField(default=False)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owned_properties', to=settings.AUTH_USER_MODEL)),
                ('tenant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rented_properties', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EstateFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_type', models.CharField(choices=[('photo', 'Photo'), ('document', 'Document'), ('other', 'Other')], max_length=20)),
                ('file', models.FileField(upload_to='estate_files/')),
                ('estate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='files', to='Estate.estate')),
            ],
        ),
    ]