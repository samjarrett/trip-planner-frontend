FROM node:17.9.0-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src ./src
