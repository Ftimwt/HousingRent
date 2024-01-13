from rest_framework import serializers

from User.models.user import User


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    phone_number = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    national_code = serializers.CharField()
    address = serializers.CharField()


class CreateUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    phone_number = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    national_code = serializers.CharField()
    address = serializers.CharField()

    class Meta:
        model = User
        fields = ['username', 'phone_number', 'first_name', 'last_name', 'national_code', 'address', 'password']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_phone_number(self, value):
        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("This phone number is already taken.")
        return value

    def validate_nationa_code(self, value):
        if User.objects.filter(national_code=value).exists():
            raise serializers.ValidationError("This national code is already taken.")
        return value

    def create(self, validated_data):
        # Create a new user with the provided data
        user = User.objects.create(
            username=validated_data['username'],
            phone_number=validated_data['phone_number'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            national_code=validated_data['national_code'],
            address=validated_data['address']
        )

        self.is_valid()

        # Set the password using set_password() method to handle hashing
        user.set_password(validated_data['password'])

        # Save the user object
        user.save()

        return user
