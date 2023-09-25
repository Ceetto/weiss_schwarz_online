from rest_framework import serializers

from ws.models import Card, Set


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = "__all__"


class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = "__all__"
