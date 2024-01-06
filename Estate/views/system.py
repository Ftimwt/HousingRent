from django.db.models import F
from django.db.models.functions import ACos, Cos, Radians, Sin
from rest_framework import views, status
from rest_framework.response import Response

from Estate.models import Estate
from Estate.serializers import CreateEstateSerializer


class NearestEstatesAPIView(views.APIView):
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
