require("dotenv").config();
const broker = require("./broker");

broker.loadServices();

broker.start().then(() => {
    
    broker.logger.info("User services are loaded.");
});
