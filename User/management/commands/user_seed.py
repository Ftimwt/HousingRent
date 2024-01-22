import datetime

from django.core.management.base import BaseCommand
from faker import Faker
from User.models.user import User
import math
from random import Random


def create_user(username, password, first_name, last_name, email, phone_number, national_code, birthday, father,
                birth_certificate_id, issued_national):
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
    user.birthday = birthday
    user.birth_certificate_id = birth_certificate_id
    user.father = father
    user.issued_national = issued_national
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
            datetime.date(2003, 1, 14),
            "علی",
            "0320431xxxx",
            "شاهرود"
        )

        create_user(
            "nahidg",
            "123456",
            "ناهید",
            "قاسمی",
            "n.ghasemi.m@gmail.com",
            "09155xxx331",
            "0320431xxxx",
            datetime.date(2003, 1, 14),
            "علی",
            "0320431xxxx",
            "گناباد"
        )

        create_user(
            "abolfazlalz",
            "123456",
            "ابوالفضل",
            "علیزاده",
            "mrabolfazlalz@gmail.com",
            "09123xxx014",
            "4580431xxxx",
            datetime.date(2002, 12, 3),
            "سعید",
            "4580431xxxx",
            "شاهرود"
        )

        fake = Faker(['fa_IR'])
        rnd = Random()

        today = datetime.date.today()

        year = rnd.randint(today.year - 50, today.year - 20)
        month = rnd.randint(1, 12)
        day = rnd.randint(1, 30)

        for i in range(15):
            national_code = str(rnd.randint(int(math.pow(10, 10)), int(math.pow(10, 11))))
            create_user(
                fake.user_name(),
                '123456',
                fake.first_name(),
                fake.last_name(),
                fake.email(),
                fake.phone_number(),
                national_code,
                datetime.date(year, month, day),
                fake.first_name(),
                national_code,
                "شاهرود"
            )
