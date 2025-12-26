FROM node:20-alpine

ENV NAMESPACE=microservices-demo
ENV NODE_ID=assignment-services
ENV HA_ENABLED=false
ENV TRANSPORTER=nats://localhost:4222
ENV MONGODB_URI=mongodb://localhost:27017/microservices-demo

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]