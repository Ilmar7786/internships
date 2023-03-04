FROM node:16.14.0

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/server

WORKDIR /usr/src/app/server

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD npm run start
