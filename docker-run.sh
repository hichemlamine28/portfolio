#!/bin/bash

# Build l'image
docker build -t portfolio .

# Lance le conteneur (port 8080 local → 5000 conteneur)
docker run -d --name portfolio-container -p 8080:5000 portfolio

echo "Conteneur lancé. Accès sur http://localhost"
echo "Pour stopper et supprimer le conteneur, lance : ./docker-stop.sh"
