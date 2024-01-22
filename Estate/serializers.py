# serializers.py
from rest_framework import serializers

from User.serializers import UserSerializer
from .models import Estate, EstateFile, EstateRequest, EstateContract, EstateContractInstallment


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
        return UserSerializer(estate.owner).data


class EstateFileSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = EstateFile
        fields = ('id', 'estate', 'file_type', 'file', 'photo_url')

    def get_photo_url(self, car):
        request = self.context.get('request')
        photo_url = car.file.url
        return photo_url


class EstateOwnerRequestSerializer(serializers.ModelSerializer):
    estate = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = EstateRequest
        fields = ['id', 'estate', 'user']

    def get_estate(self, req):
        return EstateUserSerializer(req.estate).data

    def get_user(self, req):
        return UserSerializer(req.user).data


class EstateTenantRequestSerializer(serializers.ModelSerializer):
    estate = serializers.SerializerMethodField()

    class Meta:
        model = EstateRequest
        fields = ['id', 'estate', 'created_time', 'updated_time']

    def get_estate(self, req):
        return EstateUserSerializer(req.estate).data


class EstateContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstateContract
        fields = ['id',
                  'owner',
                  'tenant',
                  'estate',
                  'text',
                  'price',
                  'start_time',
                  'end_time',
                  'created_at'
                  ]


class EstateContractInstallmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstateContractInstallment
        fields = [
            'id',
            'owner',
            'tenant',
            'is_paid',
            'price',
            'date',
            'status',
            'created_at',
        ]
