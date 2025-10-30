# Etapa 1: Recursos
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Variables de entorno
ARG API_HOST
ARG API_PORT
ARG API_BASE

ENV VITE_APP_API_HOST=$API_HOST
ENV VITE_APP_API_PORT=$API_PORT
ENV VITE_APP_API_BASE=$API_BASE

RUN npm run build

# Etapa 2: Imagen
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]