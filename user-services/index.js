require("dotenv").config();
const broker = require("./broker");

broker.loadServices();

broker.start().then(() => {
    require("./mysql.config");

    broker.logger.info("User services are loaded.");
});
