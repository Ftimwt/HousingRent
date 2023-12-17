# serializers.py
from rest_framework import serializers
from .models import Estate


class CreateEstateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estate
        fields = (
            'estate_type', 'address', 'rental_price', 'mortgage_price', 'size_of_house', 'description', 'longitude',
            'latitude')


class EstateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estate
        fields = (
            'id', 'estate_type', 'address', 'rental_price', 'mortgage_price', 'size_of_house', 'description',
            'longitude',
            'latitude')
