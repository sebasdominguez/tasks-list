#1
FROM node:lts-slim

#2
RUN mkdir -p /srv/app/admin-server
WORKDIR /srv/app/admin-server

#3
COPY package.json /srv/app/admin-server
COPY package-lock.json /srv-app/admin-server

#4
RUN npm install --silent

#5
COPY . /srv/app/admin-server

#6
CMD [ "npm", "start" ]