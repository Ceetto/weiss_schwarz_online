from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from ws.models import Card, Set
from ws.serializers import CardSerializer, SetSerializer


class SetViewSet(viewsets.ModelViewSet):
    serializer_class = SetSerializer
    queryset = Set.objects.all()
    # TODO permissions
    permission_classes = [permissions.AllowAny]

    @action(detail=True)
    def cards(self, request, pk=None):
        set_self: Set = self.get_object()
        cards = set_self.cards.all()
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
