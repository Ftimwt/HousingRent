from django.core.management.base import BaseCommand
from faker import Faker
from User.models.user import User
import math
from random import Random


def create_user(username, password, first_name, last_name, email, phone_number, national_code):
    user = User.objects.filter(username=username).first()
    if user is None:
        user = User(username=username)
    user.username = username
    user.first_name = first_name
    user.last_name = last_name
    user.email = email
    user.phone_number = phone_number
    user.national_code = national_code
    user.set_password(password)
    user.save()


class Command(BaseCommand):
    help = "Seed database for app user"

    def handle(self, *args, **options):
        create_user(
            "ftimwt",
            "123456",
            "فاطیما",
            "ترکمانی",
            "mrabolfazlalz@gmail.com",
            "9100xxx138",
            "0320431xxxx",
        )

        create_user(
            "nahidg",
            "123456",
            "ناهید",
            "قاسمی",
            "n.ghasemi.m@gmail.com",
            "09155xxx331",
            "0320431xxxx"
        )

        create_user(
            "abolfazlalz",
            "123456",
            "ابوالفضل",
            "علیزاده",
            "mrabolfazlalz@gmail.com",
            "09123xxx014",
            "4580431xxxx"
        )

        fake = Faker(['fa_IR'])
        rnd = Random()

        for i in range(15):
            create_user(
                fake.user_name(),
                '123456',
                fake.first_name(),
                fake.last_name(),
                fake.email(),
                fake.phone_number(),
                str(rnd.randint(int(math.pow(10, 10)), int(math.pow(10, 11))))
            )
