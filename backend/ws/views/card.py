from rest_framework import permissions, viewsets

from ws.models import Card
from ws.serializers import CardSerializer


class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    queryset = Card.objects.all()
    permission_classes = [permissions.IsAuthenticated]
