const { ServiceBroker } = require("moleculer");
const moleculerConfig = require("./moleculer.config");

const broker = new ServiceBroker(moleculerConfig);

module.exports = broker;
