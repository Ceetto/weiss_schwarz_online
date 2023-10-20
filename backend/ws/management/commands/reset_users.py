from django.core.management import BaseCommand

from ws.models import User


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("admin_pass", type=str, action="store")

    def handle(self, *args, **options):
        User.objects.all().delete()
        u = User(username="Admin", email="admin@mail.com", is_admin=True)
        u.set_password(options["admin_pass"])
        u.save()
