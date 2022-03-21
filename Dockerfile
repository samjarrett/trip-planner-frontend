FROM node:17.7.2-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src ./src
