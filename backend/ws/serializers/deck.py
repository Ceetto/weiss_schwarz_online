from rest_framework import serializers

from ws.models import Deck


class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        unique_together = ("name", "user")
        fields = "__all__"

    def create(self, validated_data):
        print(validated_data)
        return super().create(validated_data)
