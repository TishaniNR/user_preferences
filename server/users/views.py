from rest_framework import viewsets
from .models import UserDetail
from .serializers import UserDetailSerializer

class UserDetailViewSet(viewsets.ModelViewSet):
    queryset = UserDetail.objects.all()
    serializer_class = UserDetailSerializer
