.PHONY: build up down mkmigrate migrate

build: 
	docker-compose up --build --remove-orphans
up: 
	docker-compose up -d

down:
	docker-compose down