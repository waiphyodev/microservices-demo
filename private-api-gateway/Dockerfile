FROM node:20-alpine

ENV NAMESPACE=microservices-demo
ENV NODE_ID=private-api-gateway
ENV TRANSPORTER=nats://localhost:4222

ENV PORT=8781

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8781

CMD [ "node","index.js" ]