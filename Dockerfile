FROM node:17.3.1-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src ./src
