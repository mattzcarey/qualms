#pull base image
FROM node:17-buster

#create and set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

#add app
COPY ./ ./

#env
ARG REACT_APP_API_PORT=3001
ARG REACT_APP_API_HOST='localhost'
ENV REACT_APP_API_PORT=$REACT_APP_API_PORT
ENV REACT_APP_API_HOST=${REACT_APP_API_HOST}


EXPOSE 3000

ARG REACT_APP_API_HOST: 'localhost'
ARG REACT_APP_API_PORT: '3001'
ENV REACT_APP_API_HOST: $REACT_APP_API_HOST
ENV REACT_APP_API_PORT: $REACT_APP_API_PORT

CMD ["npm", "start"]