FROM node:18

WORKDIR /app

COPY server/package*.json ./

RUN npm install

COPY server/server.js ./

EXPOSE 5000

CMD ["node", "server.js"]