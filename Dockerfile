FROM node:10.16.3-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# COPY public ./public
# COPY src ./src
