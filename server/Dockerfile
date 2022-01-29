FROM node:17-buster

WORKDIR /server

#install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY ./ ./

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "devStart"]