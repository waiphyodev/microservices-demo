const { MoleculerClientError, MoleculerServerError } = require("moleculer").Errors;
const broker = require("../broker");
const models = require("../models");

const logger = broker.logger;

const services = {
    name: "assignee",
    actions: {
        create: {
            params: {
                name: {
                    type: "string",
                    min: 4,
                },
            },
            async handler(ctx) {
                logger.info("[ACTION] assignee.create is called.");

                const { name } = ctx.params;

                try {
                    const data = await models.Assignee.findOne({ name });
                    if (data) throw new MoleculerClientError("Duplicated!", 409, "CONFLICT");

                    await models.Assignee.create({
                        name,
                    });

                    return;
                } catch (error) {
                    logger.error("[ERROR] assignee.create => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
        list: {
            async handler(ctx) {
                logger.info("[ACTION] assignee.list is called.");

                try {
                    const list = await models.Assignee.find();

                    return { cound: list.length, list };
                } catch (error) {
                    logger.error("[ERROR] assignee.list => ", JSON.stringify(error, null, 2));
                }
            },
        },
        detail: {
            async handler(ctx) {
                //
            },
        },
        update: {
            async handler(ctx) {
                //
            },
        },
        delete: {
            async handler(ctx) {
                //
            },
        },
    },
};

module.exports = services;
