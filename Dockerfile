FROM node:18-alpine@sha256:a25c1e4ecc284985f4cbc449021e9259560c644dd9611e5a72d9c4750f24f6c7

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENTRYPOINT [ "npm", "start" ]
