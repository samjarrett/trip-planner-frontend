FROM node:19.0.1-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src ./src
