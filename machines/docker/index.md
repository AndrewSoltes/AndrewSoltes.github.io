---
title: Docker
layout: kb
---

Find image: [hub.docker](https://hub.docker.com/explore/)

Get Docker machine IP

	docker-machine ip

Build image from current dir

	docker build -t java-test .

Run with name and console (-it)

	docker run --name test -it debian

Run and remove container after shutdown

	docker build -t java-test .

Remove container after shutdown

	docker run --rm java-test

Re-run container created by run command

	docker start container_name

Open console to running container

	docker exec -i -t container_name /bin/bash

Get all containers

	docker ps -a

Inspect running container

	docker inspect 6481d894620f

Docker Compose
--------------

Compose run from folder with docker-compose.yml

	docker-compose up

Compose delete containers

	docker-compose down

Also delete volumes associated with containers

	docker-compose down -v

Compose rebuild

	docker-compose build

Compose - run command in existing running service

	docker-compose exec service command args
