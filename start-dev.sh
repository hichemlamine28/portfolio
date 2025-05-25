#!/bin/bash

NODE_VERSION="20.19.2"

# Charge nvm s'il existe
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  source "$HOME/.nvm/nvm.sh"
else
  echo "nvm non trouvé. Installation de nvm..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
  source "$HOME/.nvm/nvm.sh"
fi

echo "Installation et utilisation de Node.js v$NODE_VERSION..."
nvm install $NODE_VERSION
nvm use $NODE_VERSION

echo "Nettoyage du projet..."
rm -rf node_modules package-lock.json

echo "Installation des dépendances..."
npm install

echo "Démarrage du serveur en mode développement..."
npm run dev