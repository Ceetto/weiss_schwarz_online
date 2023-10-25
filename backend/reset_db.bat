set adminpass=%1
del db.sqlite3
python manage.py makemigrations ws
python manage.py migrate --run-syncdb
python manage.py migrate
python manage.py fillcardsdata
python manage.py reset_users %adminpass%