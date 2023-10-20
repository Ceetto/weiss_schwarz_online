from django.db.models import Q
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from ws.models import Card, Deck, DeckCard, Result
from ws.permissions import IsAdmin
from ws.serializers import CardSerializer, DeckSerializer


class DeckViewSet(viewsets.ModelViewSet):
    serializer_class = DeckSerializer
    queryset = Deck.objects.all()
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

    # TODO once games get registered fix it so when a deck that has been used in a game gets updated it becomes
    #  inactive and a new deck is created instead
    def update(self, request, *args, **kwargs):
        if "name" in request.data:
            if Deck.objects.filter(user=request.user, name=request.data['name'], active=True).count() > 0:
                return Response(
                    {"Fail": "Deck with same name already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        return super().update(request, *args, **kwargs)

    @action(methods=["GET"], detail=False)
    def my_decks(self, request, *args, **kwargs):
        decks = Deck.objects.filter(user=request.user).filter(active=True)
        deck_serializer = DeckSerializer(decks, many=True)
        return Response(deck_serializer.data, status=status.HTTP_200_OK)

    # TODO check legality of deck
    def check_deck_legality(self, deck: list[str]):
        return len(deck) == 50
