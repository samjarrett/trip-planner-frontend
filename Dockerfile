FROM node:18.9.1-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src ./src
