#!/bin/bash
adminpass="1234"
while getopts ":p:" opt
do
        case $opt in
                p) adminpass=${OPTARG}
                        ;;
                \?) >&2 echo ""
                        exit
        esac
done
shift $((OPTIND - 1))

rm -f db.sqlite3
python3 manage.py migrate --run-syncdb
python3 manage.py makemigration
python3 manage.py migrate
python3 manage.py fillcardsdata "${adminpass}"
