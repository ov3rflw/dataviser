#!/bin/sh

DB_HOST="localhost"
DB_USER="dev"
DB_NAME="dataviser"
DUMP_FOLDER="./saved_dumps"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
DUMP_FILE="$DUMP_FOLDER/${DB_NAME}_backup_$DATE.sql"

mysqldump -h "$DB_HOST" -u "$DB_USER" "$DB_NAME" > "$DUMP_FILE"

if [ $? -eq 0 ]; then
  echo "Backup réussie : $DUMP_FILE"
else
  echo "Échec de la backup"
  exit 1
fi
