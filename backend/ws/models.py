from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    username = models.CharField(max_length=30, unique=True)
    is_admin = models.BooleanField(default=False)


class Attribute(models.Model):
    name = models.CharField(max_length=50, primary_key=True)


class Neo(models.Model):
    name = models.CharField(max_length=50, primary_key=True)


class Set(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=10, unique=True)
    setId = models.CharField(max_length=10, primary_key=True)
    neo = models.ForeignKey(Neo, on_delete=models.CASCADE, related_name="sets")


class Ability(models.Model):
    text = models.CharField(max_length=500, unique=True)


class Card(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20)
    sid = models.CharField(max_length=20, primary_key=True)
    set = models.ForeignKey(Set, on_delete=models.CASCADE, related_name="cards")
    neo = models.ForeignKey(Neo, on_delete=models.CASCADE, related_name="cards")
    rarity = models.CharField(max_length=10)
    TYPE_CHOICES = [
        ("Character", "Character"),
        ("Climax", "Climax"),
        ("Event", "Event"),
    ]
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="Character")
    COLOUR_CHOICES = [("Y", "YELLOW"), ("G", "GREEN"), ("R", "RED"), ("B", "BLUE")]
    color = models.CharField(max_length=20, choices=COLOUR_CHOICES, default="YELLOW")
    level = models.SmallIntegerField(null=True)
    cost = models.SmallIntegerField(null=True)
    power = models.SmallIntegerField(null=True)
    soul = models.SmallIntegerField(null=True)
    TRIGGER_CHOICES = [
        ("None", "no trigger"),
        ("Soul1", "1 soul"),
        ("Soul2", "2 soul"),
        ("Pool", "pool"),
        ("Comeback", "comeback"),
        ("Return", "return"),
        ("Draw", "draw"),
        ("Treasure", "treasure"),
        ("Shot", "shot"),
        ("Gate", "gate"),
        ("Choice", "choice"),
        ("Standby", "standby"),
    ]
    trigger = models.CharField(max_length=20, choices=TRIGGER_CHOICES, default="None")
    attributes = models.ManyToManyField(Attribute, related_name="cards")
    abilities = models.ManyToManyField(Ability, related_name="cards")
    image = models.CharField(max_length=255)


class Deck(models.Model):
    name = models.CharField(max_length=255)
    cards = models.ManyToManyField(Card, through="DeckCard")
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="decks")
    public = models.BooleanField(default=True)
    legal = models.BooleanField(default=False)
    active = models.BooleanField(default=True)


class DeckCard(models.Model):
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)


class Result(models.Model):
    winner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="games_won")
    loser = models.ForeignKey(User, on_delete=models.CASCADE, related_name="games_lost")
    winner_deck = models.ForeignKey(
        Deck, on_delete=models.CASCADE, related_name="games_won"
    )
    loser_deck = models.ForeignKey(
        Deck, on_delete=models.CASCADE, related_name="games_lost"
    )
