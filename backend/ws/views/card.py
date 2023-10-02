from rest_framework import permissions, status, viewsets

from ws.models import Ability, Attribute, Card, Neo
from ws.serializers import AbilitySerializer, AttributeSerializer, CardSerializer, NeoSerializer


class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    queryset = Card.objects.all()
    permission_classes = [permissions.AllowAny]

    filterset_fields = {
        "set": ["exact", "in"],
        "neo": ["exact", "in"],
    }
    search_fields = ["name"]


class AttributeViewSet(viewsets.ModelViewSet):
    serializer_class = AttributeSerializer
    queryset = Attribute.objects.all()
    permission_classes = [permissions.AllowAny]


class NeoViewSet(viewsets.ModelViewSet):
    serializer_class = NeoSerializer
    queryset = Neo.objects.all()
    permission_classes = [permissions.AllowAny]


class AbilityViewSet(viewsets.ModelViewSet):
    serializer_class = AbilitySerializer
    queryset = Ability.objects.all()
    permission_classes = [permissions.AllowAny]
