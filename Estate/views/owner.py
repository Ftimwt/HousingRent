from rest_framework import status, generics
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from Estate.decorator.estate import is_estate_owner
from Estate.models import Estate
from Estate.serializers import CreateEstateSerializer, EstateFileSerializer


class EstateIndexViewSet(generics.ListCreateAPIView):
    queryset = Estate.objects.order_by('-id').all()
    serializer_class = CreateEstateSerializer  # Use the EstateSerializer for both Estate and EstateUser creation
    parser_classes = [MultiPartParser, FormParser]

    permission_classes = [IsAuthenticated]

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


class EstateDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Estate.objects.all()
    serializer_class = CreateEstateSerializer  # Use the EstateSerializer for both Estate and EstateUser creation
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(is_confirm=False)

    @is_estate_owner
    def update(self, request, *args, **kwargs):
        return generics.RetrieveUpdateDestroyAPIView(self).update(request, *args, **kwargs)


class EstateFilesUploadViewSet(generics.CreateAPIView):
    queryset = Estate.objects.all()
    serializer_class = EstateFileSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    @is_estate_owner
    def create(self, request, *args, **kwargs):
        estate_id = kwargs['pk']
        user = self.request.user
        if not user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'},
                            status=status.HTTP_403_FORBIDDEN)

        data = request.data

        data['estate'] = estate_id
        data['file_type'] = data.get('file_type', 'photo')

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response({"details": "File has uploaded successfully."}, status=status.HTTP_200_OK, headers=headers)


class EstateFilesDeleteViewSet(generics.DestroyAPIView):
    queryset = Estate.objects.all()
    serializer_class = EstateFileSerializer

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
