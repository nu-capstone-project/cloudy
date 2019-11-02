# Cloudy React Frontend Server
FROM node:lts-alpine as cloudy-frontend
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install ; npm install -g serve
COPY . .
# RUN npm run build
# ENTRYPOINT serve -s build -l 5000
ENTRYPOINT npm run start