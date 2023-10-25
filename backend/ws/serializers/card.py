from rest_framework import serializers

from ws.models import Ability, Attribute, Card, Neo


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = "__all__"


class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = "__all__"


class NeoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Neo
        fields = "__all__"


class AbilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ability
        fields = "__all__"
