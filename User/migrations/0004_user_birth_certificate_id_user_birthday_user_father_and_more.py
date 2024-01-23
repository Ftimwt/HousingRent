# Generated by Django 5.0 on 2024-01-23 05:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0003_alter_user_options_user_date_joined_user_email_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='birth_certificate_id',
            field=models.CharField(default='', max_length=250),
        ),
        migrations.AddField(
            model_name='user',
            name='birthday',
            field=models.DateField(default=None),
        ),
        migrations.AddField(
            model_name='user',
            name='father',
            field=models.CharField(default='', max_length=250),
        ),
        migrations.AddField(
            model_name='user',
            name='issued_national',
            field=models.CharField(default='', max_length=250),
        ),
    ]
