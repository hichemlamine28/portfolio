# 🌐 Portfolio Dynamique & Innovant

![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![Docker](https://img.shields.io/badge/docker-compose-blue?logo=docker)
![License](https://img.shields.io/github/license/hichemlamine28/portfolio)
![Last Commit](https://img.shields.io/github/last-commit/hichemlamine28/portfolio)
![Issues](https://img.shields.io/github/issues/hichemlamine28/portfolio)
![Stars](https://img.shields.io/github/stars/hichemlamine28/portfolio)
![Forks](https://img.shields.io/github/forks/hichemlamine28/portfolio)
![Platform](https://img.shields.io/badge/platform-linux%20%7C%20windows-lightgrey)

Ton portfolio est une **application web dynamique**, construite avec **TypeScript**, **npm**, **JavaScript**, **Docker/Docker Compose**, offrant :

- Statistiques en temps réel (utilisateurs en ligne, visites totales)
- Répartition des visites par jour / semaine / mois
- Téléchargement du CV
- UI réactive, design innovant
- Scripts de lancement et build
- Serveur local sur **port 5000** (npm) ou **port 8080** (Docker / Compose)

#### 📁 Structure du projet

portfolio/

├── Dockerfile

├── docker-compose.yml

├── package.json

├── tsconfig.json

├── src/

│ └── ...

├── public/

├── scripts/

│ └── start.sh

└── README.md


shell

#### ⚙️ Installation & Lancement

##### 📌 En local (npm)

```bash
./start-dev.sh
```
         écoute sur http://localhost:5000

🐋 Avec Docker
```bash
docker-run.sh
```
        accès via http://localhost:8080

🐋 Pour arreter/nettoyer Docker
```bash
docker-stop.sh
```


🐋 Avec Docker Compose
```bash
./docker-compose-up.sh
```
        accès via http://localhost:8080


🐋 Pour arreter/nettoyer Docker Compose
```bash
./docker-compose-down.sh
```

💡 Fonctionnalités Clés

📊 Dashboard en temps réel : utilisateurs en ligne, visites cumulées

📆 Statistiques par jour / semaine / mois

📥 Téléchargement du CV

💻 Interface web ultra-réactive et moderne

📦 Scripts inclus
start-dev.sh — initialisation locale simple

Dans package.json, commandes npm pour build, start, test (si présents)

🚀 Déploiement
Déploiable localement en quelques secondes

Possibilité d’extension vers cloud ou serveur Docker

🧼 Nettoyage
```bash
docker-compose down --volumes
rm -rf node_modules dist
```
il est possible de lancer les scripts qui contiennet toutes les commandes si vous voulea rendre l'action plus facile, tout est bien la!!!

📜 Licence
Ce projet est sous licence MIT — voir LICENSE pour plus de détails.

✅ TODO
 Ajouter authentification / comptes

 Intégrer CI/CD (GitHub Actions ou Jenkins)

 Ajouter tests unitaires & E2E
