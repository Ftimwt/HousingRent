import math
from random import Random

from django.core.management.base import BaseCommand
from faker import Faker

import requests

from Estate.models import Estate, ESTATE_USER_TYPES_CHOICES, EstateFile
from User.models.user import User


class Command(BaseCommand):
    help = "Seed database for app user"

    def handle(self, *args, **options):
        fake = Faker(['fa_IR'])
        rnd = Random()
        for i in range(35):
            estate = Estate()
            estate.owner = User.objects.order_by('?').first()
            estate.estate_type = rnd.choice(ESTATE_USER_TYPES_CHOICES)[0]
            estate.address = fake.address()

            estate.longitude = round(rnd.uniform(54.9312, 54.9947), 5)
            estate.latitude = round(rnd.uniform(36.3963, 36.4373), 5)

            estate.rental_price = rnd.randint(int(math.pow(10, 6)) + 40, int(math.pow(10, 7)))
            estate.mortgage_price = estate.rental_price * rnd.randint(3, 10)
            estate.size_of_house = estate.rental_price / math.pow(10, 5)

            if rnd.randint(0, 2) == 2:
                estate.tenant = User.objects.exclude(id=estate.owner.id).order_by('?').first()
                estate.is_confirm = True
            else:
                estate.is_confirm = rnd.getrandbits(1)

            estate.save()

            for _ in range(rnd.randint(1, 3)):
                img_data = requests.get('https://loremflickr.com/320/240/building').content
                file_path = f'media/image-{estate.id}.jpg'
                with open(file_path, 'wb') as handler:
                    handler.write(img_data)

                file = EstateFile(
                    estate=estate,
                    file_type='photo',
                    file=f'image-{estate.id}.jpg'
                )

                file.save()
