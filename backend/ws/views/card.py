from django.db.models import Q
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from ws.models import Ability, Attribute, Card, Neo
from ws.serializers import (
    AbilitySerializer,
    AttributeSerializer,
    CardSerializer,
    NeoSerializer,
    SetSerializer,
)


class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    queryset = Card.objects.all()
    # TODO permissions
    permission_classes = [permissions.AllowAny]

    filterset_fields = {
        "set": ["exact", "in"],
        "neo": ["exact", "in"],
        "level": ["exact", "in"],
        "cost": ["exact", "in"],
        "power": ["exact", "in"],
        "soul": ["exact", "in"],
        "color": ["exact", "in"],
        "type": ["exact", "in"],
        "rarity": ["exact", "in"],
        "sid": ["in"],
        "trigger": ["exact", "in"],
    }

    def get_queryset(self):
        queryset = Card.objects.all()

        search = self.request.query_params.get("search")
        attributes = self.request.query_params.get("traits")

        if search is not None:
            abils = Ability.objects.filter(text__contains=search)
            queryset = queryset.filter(
                Q(name__contains=search) | Q(abilities__in=abils)
            )

        if attributes is not None:
            queryset = queryset.filter(attributes__in=attributes)
        return queryset


class AttributeViewSet(viewsets.ModelViewSet):
    serializer_class = AttributeSerializer
    queryset = Attribute.objects.all()
    permission_classes = [permissions.AllowAny]


class NeoViewSet(viewsets.ModelViewSet):
    serializer_class = NeoSerializer
    queryset = Neo.objects.all()
    permission_classes = [permissions.AllowAny]

    @action(detail=True)
    def sets(self, request, pk=None):
        neo: Neo = self.get_object()
        sets = neo.sets.all()
        serializer = SetSerializer(sets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AbilityViewSet(viewsets.ModelViewSet):
    serializer_class = AbilitySerializer
    queryset = Ability.objects.all()
    permission_classes = [permissions.AllowAny]
