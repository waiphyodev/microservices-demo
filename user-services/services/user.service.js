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
                    const [rows] = await dbConnection.query(
                        "SELECT id, email FROM users"
                    );

                    return { count: rows.length, list: rows };
                } catch (error) {
                    logger.error("[ERROR] user.list => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
    },
};

module.exports = services;
