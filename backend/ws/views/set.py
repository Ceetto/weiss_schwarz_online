from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from ws.models import Card, Set
from ws.serializers import CardSerializer, SetSerializer


class SetViewSet(viewsets.ModelViewSet):
    serializer_class = SetSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Set.objects.all()

    @action(detail=True)
    def cards(self, request):
        set_id = self.get_object().id
        cards = Card.objects.filter(
            set=set_id
        )
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
