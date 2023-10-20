from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from ws.models import Card, Deck, DeckCard
from ws.permissions import IsAdmin
from ws.serializers import CardSerializer, DeckSerializer


class DeckViewSet(viewsets.ModelViewSet):
    serializer_class = DeckSerializer
    queryset = Deck.objects.all()
    # TODO permissions
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Deck.objects.all()
        if not self.request.user.is_admin:
            queryset = queryset.filter(public=True)
        return queryset

    def create(self, request, *args, **kwargs):
        try:
            name = request.data["name"]
            user = request.user
            legal = self.check_deck_legality(request.data["cards"])
            public = request.data["public"]

            if Deck.objects.filter(user=user, name=name, active=True).count() > 0:
                return Response(
                    {"Fail": "Deck with same name already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            deck = Deck(name=name, user=user, legal=legal, public=public)
            deck.save()
            for c in request.data["cards"]:
                deck_card = DeckCard(card_id=c, deck=deck)
                deck_card.save()
            return Response(
                DeckSerializer(deck, many=False).data, status=status.HTTP_201_CREATED
            )
        except KeyError:
            return Response(
                {"Fail": "Wrong data, give a name, public status and list of cards"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    # TODO check legality of deck
    def check_deck_legality(self, deck: list[str]):
        return True
