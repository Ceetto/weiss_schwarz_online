from rest_framework import permissions, viewsets

from ws.models import Card, Set
from ws.serializers import CardSerializer, SetSerializer


class SetViewSet(viewsets.ModelViewSet):
    serializer_class = SetSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Set.objects.all()
