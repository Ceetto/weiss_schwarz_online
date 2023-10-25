from rest_framework import serializers

from ws.models import Set


class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = "__all__"
