.PHONY: up up-test build build-test build-up build-up-test down down-test logs ps migrate migrate-test test seed seed-test clean-volumes reset init

up:
	podman-compose -f ${PWD}/infra/docker-compose.yaml up -d

up-test:
	podman-compose -f ${PWD}/infra/docker-compose.yaml -f ${PWD}/infra/docker-compose.override.yaml up -d

build:
	podman-compose -f ${PWD}/infra/docker-compose.yaml build

build-test:
	podman-compose -f ${PWD}/infra/docker-compose.yaml -f ${PWD}/infra/docker-compose.override.yaml build

build-up:
	podman-compose -f ${PWD}/infra/docker-compose.yaml up -d --build

build-up-test:
	podman-compose -f ${PWD}/infra/docker-compose.yaml -f ${PWD}/infra/docker-compose.override.yaml up -d --build

down:
	podman-compose -f ${PWD}/infra/docker-compose.yaml down

down-test:
	podman-compose -f ${PWD}/infra/docker-compose.yaml -f ${PWD}/infra/docker-compose.override.yaml down

logs:
	podman-compose -f ${PWD}/infra/docker-compose.yaml logs -f

ps:
	podman-compose -f ${PWD}/infra/docker-compose.yaml ps

migrate:
	podman exec -it doae_backend npm run prisma:migrate

migrate-test:
	podman exec -it doae_backend_test npm run prisma:migrate:deploy

test:
	podman exec -it doae_backend_test npm run test

seed:
	podman exec -it doae_backend npm run prisma:db:seed

seed-test:
	podman exec -it doae_backend_test npx ts-node prisma/seed-test.ts

clean-volumes:
	rm -rf infra/volumes/postgres/*

reset: down clean-volumes up

init: migrate seed
