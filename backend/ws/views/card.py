from rest_framework import permissions, viewsets

from ws.models import Attribute, Card
from ws.serializers import AttributeSerializer, CardSerializer


class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    queryset = Card.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class AttributeViewSet(viewsets.ModelViewSet):
    serializer_class = AttributeSerializer
    queryset = Attribute.objects.all()
    permission_classes = [permissions.IsAuthenticated]
