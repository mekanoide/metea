# Usa la imagen oficial de Node.js
FROM node:20

# Establecer el directorio de trabajo
WORKDIR /app

# Variables
ARG API_URL
ARG API_KEY

# Instalar ssh-client
RUN apt-get update && apt-get install -y git

# Clonar los repositorios
RUN git clone https://github.com/mekanoide/metea.git --branch=main

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar dependencias y construir la aplicación
RUN pnpm install && \
    pnpm build

# Ejecutar
CMD ["node", "/app/.output/server/index.mjs"]