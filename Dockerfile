FROM node:16.11.1-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src ./src
