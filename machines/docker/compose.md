---
title: Docker Compose
layout: kb
---

Sample *docker-compose.yml* file:

{% highlight yaml %}
version: "3"

services:
  node-test-1:
    build:
      context: ../node-test
    image: node-test
    volumes: 
      - data-vol-app:/opt/app
      # - type: bind
      #   source: ./app
      #   target: /opt/app/src
    command: top
    env_file:
      - ./common.env
    environment:
      PROC_NAME: node-test-1
    ports:
      - "8081:8080"
#    depends_on:
#      - db

  node-test-2:
    build:
      context: ../node-test
    image: node-test
    volumes: 
      - data-vol-app:/opt/app
    env_file:
      - ./common.env
    environment:
      PROC_NAME: node-test-2
    ports:
      - "8082:8080"

  samba:
    image: dperson/samba
    volumes: 
      - data-vol-app:/opt/app
    ports:
      - "139:139"
      - "445:445"
    command: -s "app;/opt/app;yes;no;yes;all"
    restart: unless-stopped

#    links:
volumes:
  data-vol-app:
{% endhighlight %}