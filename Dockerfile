FROM node:14.5.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY public ./public
COPY src ./src
