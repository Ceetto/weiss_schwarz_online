from django.core.management import BaseCommand

from ws.models import Deck


class Command(BaseCommand):
    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        Deck.objects.all().delete()
