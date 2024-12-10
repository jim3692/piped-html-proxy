FROM node:22-alpine@sha256:6e80991f69cc7722c561e5d14d5e72ab47c0d6b6cfb3ae50fb9cf9a7b30fdf97

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENTRYPOINT [ "npm", "start" ]
