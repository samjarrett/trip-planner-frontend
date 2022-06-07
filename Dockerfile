FROM node:18.3.0-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src ./src
