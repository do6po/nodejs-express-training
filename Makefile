.SILENT:

include .env

dc = docker-compose -p ${APP_NAME}

db = db

build:
	$(dc) up --build --force-recreate -d

start:
	$(dc) start

stop:
	$(dc) stop

down:
	$(dc) down

logs:
	$(dc) logs

logs_f:
	$(dc) logs -f

ps:
	$(dc) ps

db_bash:
	$(dc) exec $(db) bash

restart:
	$(dc) restart