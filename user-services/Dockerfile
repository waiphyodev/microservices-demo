FROM node:20-alpine

ENV NAMESPACE=microservices-demo
ENV NODE_ID=user-services
ENV HA_ENABLED=false
ENV TRANSPORTER=nats://localhost:4222
ENV MYSQLDB_URI=mysql://root:password@localhost:3306/microservices_demo

ENV AT_SECRET=L3oiwbiIk08
ENV AT_EXPIRED=1h
ENV RT_SECRET=gDEtklhEpiE
ENV RT_EXPIRED=24h

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]