from rest_framework import permissions, viewsets

from ws.models import Card, Deck
from ws.serializers import CardSerializer, DeckSerializer


class DeckViewSet(viewsets.ModelViewSet):
    serializer_class = DeckSerializer
    queryset = Deck.objects.all()
    # TODO permissions
    permission_classes = [permissions.AllowAny]
