# serializers.py
from rest_framework import serializers

from User.serializers import UserSerializer
from .models import Estate, EstateFile, EstateUser


class CreateEstateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estate
        fields = (
            'estate_type', 'address', 'rental_price', 'mortgage_price', 'size_of_house', 'description', 'longitude',
            'latitude')


class EstateSerializer(serializers.ModelSerializer):
    files = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()

    class Meta:
        model = Estate
        fields = (
            'id', 'estate_type', 'address', 'rental_price', 'mortgage_price', 'size_of_house', 'description',
            'longitude',
            'latitude', 'files', 'owner')

    def get_files(self, estate):
        photo_files = estate.files.filter(file_type='photo')
        return EstateFileSerializer(photo_files, many=True).data

    def get_owner(self, estate):
        user = estate.estateuser_set.filter(user_type='owner').first()
        return UserSerializer(user.user).data


class EstateFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstateFile
        fields = ('id', 'estate', 'file_type', 'file')


class EstateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstateUser
        fields = ('id', 'estate', 'user', 'user_type')
