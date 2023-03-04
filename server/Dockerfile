FROM node:16.14.0

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/server

WORKDIR /usr/src/app/server

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD npm run start
