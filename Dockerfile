FROM node:13

WORKDIR /app/

COPY package*.json ./

RUN npm install

RUN npm install -g pm2

COPY ./src/ ./

CMD ["pm2-runtime", "ecosystem.config.js"]