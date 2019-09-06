FROM node:12.10.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# COPY public ./public
# COPY src ./src
