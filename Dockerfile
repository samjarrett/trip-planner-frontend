FROM node:17.1.0-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src ./src
