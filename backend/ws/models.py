from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = models.CharField(max_length=30, unique=True)


class Set(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=10)


class Attribute(models.Model):
    name = models.CharField(max_length=50, primary_key=True)


class Card(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, primary_key=True)
    set = models.ForeignKey(Set, on_delete=models.CASCADE, related_name="cards")
    neo = models.CharField(max_length=3)
    rarity = models.CharField(max_length=10)
    TYPE_CHOICES = [("CH", "Character"), ("CX", "Climax"), ("EV", "Event")]
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="Character")
    COLOUR_CHOICES = [("Y", "YELLOW"), ("G", "GREEN"), ("R", "RED"), ("B", "BLUE")]
    colour = models.CharField(max_length=20, choices=COLOUR_CHOICES, default="YELLOW")
    level = models.SmallIntegerField()
    cost = models.SmallIntegerField()
    power = models.SmallIntegerField()
    soul = models.SmallIntegerField()
    TRIGGER_CHOICES = [
        ("None", "no trigger"),
        ("Soul1", "1 soul"),
        ("Soul2", "2 soul"),
        ("Pool", "bag"),
        ("Comeback", "door"),
        ("Return", "tornado"),
        ("Draw", "book"),
        ("Treasure", "bar"),
        ("Shot", "burn"),
        ("Gate", "pants"),
        ("Choice", "choice"),
        ("Standby", "standby"),
    ]
    trigger = models.CharField(max_length=20, choices=TRIGGER_CHOICES, default="None")
    attributes = models.ManyToManyField(Attribute, related_name="cards")
    image = models.CharField(max_length=255)


class Deck(models.Model):
    name = models.CharField(max_length=255)
    cards = models.ManyToManyField(Card)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="decks")
    public = models.BooleanField(default=True)


class Result(models.Model):
    winner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="games_won")
    loser = models.ForeignKey(User, on_delete=models.CASCADE, related_name="games_lost")
    winner_deck = models.ForeignKey(
        Deck, on_delete=models.CASCADE, related_name="games_won"
    )
    loser_deck = models.ForeignKey(
        Deck, on_delete=models.CASCADE, related_name="games_lost"
    )
