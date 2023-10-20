from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from ws.models import Card, Set
from ws.permissions import IsAdmin
from ws.serializers import CardSerializer, SetSerializer
from ws.views.mixins import PermissionsByActionMixin


class SetViewSet(PermissionsByActionMixin, viewsets.ModelViewSet):
    serializer_class = SetSerializer
    queryset = Set.objects.all()
    # TODO permissions
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    permission_classes_by_action = {
        "retrieve": [permissions.AllowAny],
        "list": [permissions.AllowAny],
        "cards": [permissions.AllowAny]
    }

    filterset_fields = {
        "neo": ["exact", "in"],
    }
    search_fields = ["name"]

    @action(detail=True)
    def cards(self, request, pk=None):
        set_self: Set = self.get_object()
        cards = set_self.cards.all()
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
