FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i -g npm@latest && npm i

COPY . .

CMD ["npm", "run", "dev"]
