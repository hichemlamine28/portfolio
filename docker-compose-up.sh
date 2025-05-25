#!/bin/bash

docker-compose up --build -d

echo "Conteneur lancé via docker-compose. Accès sur http://localhost"
echo "Pour arrêter le conteneur, lance : ./docker-compose-down.sh"
