import requests
from django.core.management import BaseCommand

from ws.models import Ability, Attribute, Card, Deck, Neo, Set, User

SETS_URL = "https://api.github.com/repos/CCondeluci/WeissSchwarz-ENG-DB/contents/DB"

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
        pass

    def handle(self, *args, **options):
        sets_data = requests.get(SETS_URL, headers={"Accept": "application/json"})
        assert (
            sets_data.status_code == 200
        ), f"Weiss Schwarz DB error: {sets_data.status_code}"

        total = len(sets_data.json())
        file_num = 0

        f = open("error_cards.txt", "w", encoding="utf8")

        for set_data in sets_data.json():
            file_num += 1
            cards_data = requests.get(set_data["download_url"])
            assert (
                cards_data.status_code == 200
            ), f"Weiss Schwarz DB error on {set_data['name']} {cards_data.status_code}"

            print(f"File: {set_data['name']}: {file_num}/{total}")
            if len(Set.objects.filter(name=cards_data.json()[0]["expansion"])) == 0:
                for card in cards_data.json():
                    try:
                        neo = Neo(name=card["set"])
                        neo.save()

                        release_set = Set(
                            setId=f"{card['side']}{card['release']}",
                            name=card["expansion"],
                            code=f"{card['set']}/{card['side']}{card['release']}",
                            neo=neo,
                        )
                        release_set.save()

                        for ab in card["ability"]:
                            try:
                                ability = Ability(text=ab)
                                ability.save()
                            except:
                                pass
                        abils = Ability.objects.filter(text__in=card["ability"])

                        for at in card["attributes"]:
                            attribute = Attribute(name=at)
                            attribute.save()
                        ats = Attribute.objects.filter(name__in=card["attributes"])

                        card_obj = Card(
                            sid=f"{card['side']}{card['release']}-{card['sid']}",
                            code=card["code"],
                            name=card["name"],
                            set=release_set,
                            neo=neo,
                            rarity=card["rarity"],
                            type=card["type"],
                            color=card["color"],
                            trigger=triggers_mapping[str(card["trigger"])],
                            image=card["image"],
                        )
                        if card["type"] == "Character" or card["type"] == "Event":
                            card_obj.cost = int(card["cost"])
                            card_obj.level = int(card["level"])
                        if card["type"] == "Character":
                            card_obj.power = int(card["power"])
                            card_obj.soul = int(card["soul"])
                        card_obj.save()
                        if card["type"] == "Character":
                            card_obj.attributes.set(ats)
                        card_obj.abilities.set(abils)
                    except Exception:
                        print(f"Error with card: {card['code']} {card['name']}")
                        f.write(f"{card}\n")

        f.close()
