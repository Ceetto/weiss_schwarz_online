from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = models.CharField(max_length=30, unique=True, primary_key=True)
    REQUIRED_FIELDS = ["username"]


class Set(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=10)


class Attribute(models.Model):
    name = models.CharField(max_length=50, primary_key=True)


class Card(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, primary_key=True)
    set = models.ForeignKey(Set, on_delete=models.CASCADE)
    neo = models.CharField(max_length=3)
    rarity = models.CharField(max_length=10)
    TYPE_CHOICES = ["Character", "Climax", "Event"]
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="Character")
    COLOUR_CHOICES = ["YELLOW", "GREEN", "RED", "BLUE"]
    colour = models.CharField(max_length=20, choices=COLOUR_CHOICES, default="YELLOW")
    level = models.SmallIntegerField()
    cost = models.SmallIntegerField()
    power = models.SmallIntegerField()
    soul = models.SmallIntegerField()
    TRIGGER_CHOICES = [
        "None",
        "Soul1",
        "Soul2",
        "Pool",
        "Comeback",
        "Return",
        "Draw",
        "Treasure",
        "Shot",
        "Gate",
        "Choice",
        "Standby",
    ]
    trigger = models.CharField(max_length=20, choices=TRIGGER_CHOICES, default="None")
    attributes = models.ManyToManyField(Attribute)
    image = models.CharField(max_length=255)


class Deck(models.Model):
    name = models.CharField(max_length=255)
    cards = models.ManyToManyField(Card)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
