from django.http import QueryDict
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from ws.models import Deck, DeckCard, DeckStats, Card, Neo
from ws.serializers import DeckSerializer, DeckStatsSerializer


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
            neo = Neo.objects.get(pk=request.data["neo"])

            if Deck.objects.filter(user=user, name=name, active=True).count() > 0:
                return Response(
                    {"Fail": "Deck with same name already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            deck = Deck(name=name, user=user, legal=legal, public=public, neo=neo)
            deck.save()
            stats = DeckStats(deck=deck)
            for c in request.data["cards"]:
                card = Card.objects.get(pk=c)
                if card.color == "YELLOW":
                    stats.yellow += 1
                elif card.color == "GREEN":
                    stats.green += 1
                elif card.color == "RED":
                    stats.red += 1
                elif card.color == "BLUE":
                    stats.blue += 1

                if card.level == 0:
                    stats.level_0 += 1
                elif card.level == 1:
                    stats.level_1 += 1
                elif card.level == 2:
                    stats.level_2 += 1
                elif card.level == 3:
                    stats.level_3 += 1

                if card.type == "Character":
                    stats.characters += 1
                elif card.type == "Event":
                    stats.events += 1
                elif card.type == "Climax":
                    stats.climax += 1

                if card.trigger in ["1 soul", "return", "shot", "gate", "standby"]:
                    stats.souls += 1
                elif card.trigger == "2 soul":
                    stats.souls += 1

                deck_card = DeckCard(card_id=c, deck=deck)
                deck_card.save()
                stats.save()
            return Response(
                DeckSerializer(deck, many=False).data, status=status.HTTP_201_CREATED
            )
        except KeyError:
            return Response(
                {"Fail": "Wrong data, give a name, public status, neo standard and list of cards"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    # TODO once games get registered fix it so when a deck that has been used in a game gets updated it becomes
    #  inactive and a new deck is created instead
    def update(self, request, *args, **kwargs):
        if isinstance(request.data, QueryDict):
            request.data._mutable = True
        if "name" in request.data:
            if (
                Deck.objects.filter(
                    user=request.user, name=request.data["name"], active=True
                ).count()
                > 0
            ):
                return Response(
                    {"Fail": "Deck with same name already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        request.data["user"] = request.user.id
        if "cards" in request.data:
            DeckCard.objects.filter(deck=self.get_object()).delete()
            DeckStats.objects.filter(deck=self.get_object()).delete()
            stats = DeckStats(deck=self.get_object())
            for c in request.data["cards"]:
                card = Card.objects.get(pk=c)
                if card.color == "YELLOW":
                    stats.yellow += 1
                elif card.color == "GREEN":
                    stats.green += 1
                elif card.color == "RED":
                    stats.red += 1
                elif card.color == "BLUE":
                    stats.blue += 1

                if card.level == 0:
                    stats.level_0 += 1
                elif card.level == 1:
                    stats.level_1 += 1
                elif card.level == 2:
                    stats.level_2 += 1
                elif card.level == 3:
                    stats.level_3 += 1

                if card.type == "Character":
                    stats.characters += 1
                elif card.type == "Event":
                    stats.events += 1
                elif card.type == "Climax":
                    stats.climax += 1

                if card.trigger in ["1 soul", "return", "shot", "gate", "standby"]:
                    stats.souls += 1
                elif card.trigger == "2 soul":
                    stats.souls += 1
                stats.save()

                deck_card = DeckCard(card_id=c, deck=self.get_object())
                deck_card.save()
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object().user or request.user.is_admin:
            return super().destroy(request, *args, **kwargs)
        else:
            return Response(
                {"Forbidden": "You do not own this deck"},
                status=status.HTTP_403_FORBIDDEN,
            )

    @action(methods=["GET"], detail=False)
    def my_decks(self, request, *args, **kwargs):
        decks = Deck.objects.filter(user=request.user).filter(active=True)
        deck_serializer = DeckSerializer(decks, many=True)
        return Response(deck_serializer.data, status=status.HTTP_200_OK)

    @action(methods=["GET"], detail=True)
    def stats(self, request, *args, **kwargs):
        stats = DeckStats.objects.get(deck_id=self.get_object().id)
        deck_stats_serializer = DeckStatsSerializer(stats, many=False)
        return Response(deck_stats_serializer.data, status=status.HTTP_200_OK)

    # TODO check legality of deck
    def check_deck_legality(self, deck: list[str]):
        return len(deck) == 50
