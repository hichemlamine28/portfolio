#!/bin/bash

docker stop portfolio-container
docker rm portfolio-container

echo "Conteneur arrêté et supprimé."
