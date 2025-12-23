require("dotenv").config();
const broker = require("./broker");

broker.loadServices();

broker.start().then(() => {
    const express = require("express");

    const app = express();
    app.disable("x-powered-by");
    app.use(express.json());
    app.use(express.urlencoded({ limit: "10mb", extended: true }));

    app.locals.broker = broker;
    const port = process.env.PORT;

    app.use(require("./endpoints"));

    const http = require("http");
    const httpServer = http.createServer(app);
    httpServer.listen(port);

    broker.logger.info("Private API Gateway is running.");
});
