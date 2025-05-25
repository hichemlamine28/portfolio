FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Installer tout (dev + prod) car tu as besoin de vite, esbuild, etc.
RUN npm install

COPY . .

# Build front + back
RUN npm run build

# Étape runtime : on garde toute la dist avec assets frontend et code backend
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 5000

CMD ["npm", "start"]
