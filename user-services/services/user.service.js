const broker = require("../broker");
const { MoleculerServerError } = require("moleculer").Errors;
const dbConnection = require("../mysql.config");

const logger = broker.logger;

const services = {
    name: "user",
    actions: {
        list: {
            async handler(ctx) {
                logger.info("[ACTION] user.list is called.");

                try {
                    const rows = await dbConnection.query("SELECT * FROM users");

                    console.log("rows", rows);

                    return { count: 0, list: [] };
                } catch (error) {
                    throw new MoleculerServerError(error.message, 500, "INTERNAL_SERVER_ERROR");
                }
            },
        },
    },
};

module.exports = services;
