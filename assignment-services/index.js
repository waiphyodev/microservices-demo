require("dotenv").config();
const broker = require("./broker");

broker.loadServices();

broker.start().then(() => {
    require("./mongo.config");
    
    broker.logger.info("Assignment services are loaded.");
});
