set adminpass=%1
del db.sqlite3
python manage.py migrate --run-syncdb
python manage.py makemigrations
python manage.py migrate
python manage.py fillcardsdata %adminpass%