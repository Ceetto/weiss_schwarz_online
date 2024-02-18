from rest_framework import serializers

from ws.models import Deck, DeckStats


class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        unique_together = ("name", "user")
        fields = "__all__"

    def create(self, validated_data):
        print(validated_data)
        return super().create(validated_data)


class DeckStatsSerializer(serializers.ModelSerializer):
    deck_name = serializers.CharField(source="deck.name")
    legal = serializers.BooleanField(source="deck.legal")

    class Meta:
        model = DeckStats
        fields = (
            "deck", "level_0", "level_1", "level_2", "level_3", "characters", "events", "climax", "souls", "yellow",
            "green", "red", "blue", "deck_name", "legal")
