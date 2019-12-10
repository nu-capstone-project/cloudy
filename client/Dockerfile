# Cloudy React Frontend Server
FROM node:lts-alpine as cloudy-frontend
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install ; npm install -g http-server
COPY . .
RUN npm run build
ENTRYPOINT http-server build -P 'http://localhost:5000' -p 3000
# ENTRYPOINT npm run start