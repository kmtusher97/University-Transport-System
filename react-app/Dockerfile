FROM node:14-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install react-scripts@latest
RUN npm install

COPY . /app

CMD ["npm", "start"]
