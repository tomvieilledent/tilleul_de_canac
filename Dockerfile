# syntax=docker/dockerfile:1

# ---- Étape 1 : build du site statique ----
FROM node:20-alpine AS build
WORKDIR /app

# Dépendances (couche mise en cache tant que les lockfiles ne changent pas)
COPY package.json package-lock.json ./
RUN npm ci

# Sources + build. --base=/ : l'image sert le site à la racine
# (le base "/tilleul_de_canac/" ne concerne que GitHub Pages).
COPY . .
RUN npm run build -- --base=/

# ---- Étape 2 : image d'exécution minimale ----
FROM nginx:1.27-alpine AS runtime

# Config nginx : port 8080, fallback SPA, cache des assets hashés
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
