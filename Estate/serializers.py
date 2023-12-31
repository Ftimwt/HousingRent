# serializers.py
from rest_framework import serializers

from User.serializers import UserSerializer
from .models import Estate, EstateFile


class CreateEstateSerializer(serializers.ModelSerializer):
    files = serializers.SerializerMethodField()

    owner = serializers.SerializerMethodField()

    class Meta:
        model = Estate
        fields = (
            'id',
            'estate_type',
            'address',
            'rental_price',
            'mortgage_price',
            'size_of_house',
            'description',
            'longitude',
            'latitude',
            'files',
            'owner',
            'is_confirm'
        )

    def get_files(self, estate):
        photo_files = estate.files.filter(file_type='photo')
        return EstateFileSerializer(photo_files, many=True).data

    def get_owner(self, estate):
        owner = estate.owner
        return UserSerializer(owner).data


class EstateUserSerializer(serializers.ModelSerializer):
    files = serializers.SerializerMethodField()

    class Meta:
        model = Estate
        fields = (
            'id',
            'estate_type',
            'address',
            'rental_price',
            'mortgage_price',
            'size_of_house',
            'description',
            'longitude',
            'latitude',
            'files',
            'owner',
            'is_confirm'
        )

    def get_files(self, estate):
        photo_files = estate.files.filter(file_type='photo')
        return EstateFileSerializer(photo_files, many=True).data


class EstateFileSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = EstateFile
        fields = ('id', 'estate', 'file_type', 'file', 'photo_url')

    def get_photo_url(self, car):
        request = self.context.get('request')
        photo_url = car.file.url
        return photo_url
