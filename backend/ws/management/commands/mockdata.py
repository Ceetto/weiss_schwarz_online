from django.core.management import BaseCommand

from ws.models import (
    Ability,
    Attribute,
    Card,
    Deck,
    Neo,
    Set,
    User
)

card_data = [
    {
        "name": "\"Informant\" Argo the Rat",
        "code": "SAO/S100-E001",
        "rarity": "RR",
        "expansion": "Animation Sword Art Online 10th Anniversary",
        "side": "S",
        "type": "Character",
        "color": "YELLOW",
        "level": "0",
        "cost": "0",
        "power": "500",
        "soul": 1,
        "trigger": [],
        "attributes": [
            "Anniversary",
            "Avatar",
            "Progressive"
        ],
        "ability": [
            "【CONT】 Your events can be played from your hand without fulfilling color requirements.",
            "【AUTO】 When your climax is placed on your climax area, choose 1 of your characters, and that character gets +1000 power until end of turn.",
            "【ACT】 Brainstorm [(1) 【REST】 this card] Flip over 4 cards from the top of your deck, and put them into your waiting room. For each climax revealed among those cards, choose up to 1 character in your waiting room, and return it to your hand."
        ],
        "flavor_text": "Lately, you've been taking big risks with your level-raising.",
        "set": "SAO",
        "release": "100",
        "sid": "E001",
        "image": "https://en.ws-tcg.com/wp/wp-content/images/cardimages/ASAO10/S100_E001.png"
    },
]


triggers_mapping = dict()
triggers_mapping["[]"] = "None"
triggers_mapping["['SOUL']"] = "Soul1"
triggers_mapping["['SOUL', 'SOUL']"] = "Soul2"
triggers_mapping["['POOL']"] = "Pool"
triggers_mapping["['COMEBACK']"] = "Comeback"
triggers_mapping["['SOUL', 'RETURN']"] = "Return"
triggers_mapping["['DRAW']"] = "Draw"
triggers_mapping["['TREASURE']"] = "Treasure"
triggers_mapping["['SOUL', 'SHOT']"] = "Shot"
triggers_mapping["['SOUL', 'GATE']"] = "Gate"
triggers_mapping["['CHOICE']"] = "Choice"
triggers_mapping["['SOUL', 'STANDBY']"] = "Standby"


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("admin_pass", type=str, action="store")

    def handle(self, *args, **options):

        u = User(username="Admin")
        u.set_password(options["admin_pass"])
        u.save()

        for card in card_data:
            ats = [Attribute(name=n) for n in card["attributes"]]
            for at in ats:
                at.save()
            release_set = Set(code=f"{card['set']}/{card['side']}{card['release']}", name=card["expansion"])
            release_set.save()

            neo = Neo(name=card['set'])
            neo.save()

            for ab in card["ability"]:
                try:
                    ability = Ability(text=ab)
                    ability.save()
                except:
                    print("ability already added")
            abils = Ability.objects.filter(text__in=card['ability'])

            for at in card["attributes"]:
                attribute = Attribute(name=at)
                attribute.save()
            ats = Attribute.objects.filter(name__in=card["attributes"])

            card_obj = Card(
                code=card['code'],
                name=card['name'],
                set=release_set,
                neo=neo,
                rarity=card['rarity'],
                type=card['type'],
                color=card['color'],
                level=int(card['level']),
                cost=int(card['cost']),
                power=int(card['power']),
                soul=int(card['soul']),
                trigger=triggers_mapping[str(card['trigger'])],
                # attributes=ats,
                # abilities=abs,
                image=card["image"]
            )
            card_obj.save()
            card_obj.attributes.set(ats)
            card_obj.abilities.set(abils)

