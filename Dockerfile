FROM node:12.8.1-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# COPY public ./public
# COPY src ./src
