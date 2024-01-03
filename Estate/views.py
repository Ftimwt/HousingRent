# views.py
from django.db.models import F
from django.db.models.functions import ACos, Cos, Radians, Sin
from rest_framework import status, generics, viewsets
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Estate
from .serializers import CreateEstateSerializer, EstateFileSerializer, EstateUserSerializer


class EstateIndexViewSet(generics.ListCreateAPIView):
    queryset = Estate.objects.order_by('-id').all()
    serializer_class = CreateEstateSerializer  # Use the EstateSerializer for both Estate and EstateUser creation
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        user = self.request.user
        if not user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'},
                            status=status.HTTP_403_FORBIDDEN)

        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        estate_user = serializer.save(owner=user)

        files_data = request.FILES.getlist('files', [])
        for file_data in files_data:
            estate_file_data = {'estate': estate_user.id, 'file_type': data.get('file_type', 'photo'),
                                'file': file_data}

            estate_file_serializer = EstateFileSerializer(data=estate_file_data)
            estate_file_serializer.is_valid(raise_exception=True)
            estate_file_serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        user = self.request.user
        return Estate.objects.filter(owner=user).order_by('-id')


class EstateViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Estate.objects.all()
    serializer_class = EstateUserSerializer


class NearestEstatesAPIView(APIView):
    @staticmethod
    def get(request, *args, **kwargs):
        try:
            user_longitude = float(request.query_params.get('longitude'))
            user_latitude = float(request.query_params.get('latitude'))
            max_distance = float(request.query_params.get('max_distance', 10))  # Default to 10 if not provided
        except (TypeError, ValueError):
            return Response({'error': 'Invalid longitude, latitude, or max_distance values.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Using Haversine formula to calculate distance
        distance_expression = (6371 * ACos(
            Cos(Radians(user_latitude)) * Cos(Radians(F('latitude'))) * Cos(
                Radians(F('longitude')) - Radians(user_longitude)) +
            Sin(Radians(user_latitude)) * Sin(Radians(F('latitude')))
        )
                               )

        # Query for fetching the nearest estates
        nearest_estates = Estate.objects.annotate(distance=distance_expression).order_by('distance')

        # Filter by the dynamic max_distance
        nearest_estates = nearest_estates.filter(distance__lte=max_distance)

        # Serialize the queryset using a DRF serializer
        serializer = CreateEstateSerializer(nearest_estates, many=True)

        return Response({'estates': serializer.data, 'max_distance': max_distance})
