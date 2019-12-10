# Cloudy Backend Express Node.js Server 
FROM node:lts-alpine as cloudy-backend
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENTRYPOINT node server.js