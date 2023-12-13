FROM node:18

WORKDIR /server

COPY server/package*.json ./

RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]