const { MoleculerClientError, MoleculerServerError } = require("moleculer").Errors;
const broker = require("../broker");
const models = require("../models");

const logger = broker.logger;

const services = {
    name: "assignee",
    actions: {
        create: {
            params: {
                userId: {
                    type: "string",
                    empty: false,
                },
                name: {
                    type: "string",
                    empty: false,
                },
                email: {
                    type: "email",
                    empty: false,
                },
            },
            async handler(ctx) {
                logger.info("[ACTION] assignee.create is called.");

                const { userId, name, email } = ctx.params;

                try {
                    const data = await models.Assignee.findOne({ userId, name });
                    if (data) throw new MoleculerClientError("Duplicated!", 409, "CONFLICT");

                    await models.Assignee.create({
                        userId,
                        name,
                        email,
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
        detailByUserId: {
            params: {
                userId: {
                    type: "string",
                    empty: false,
                },
            },
            async handler(ctx) {
                logger.info("[ACTION] assignee.detailByUserId is called.");

                const { userId } = ctx.params;

                try {
                    const data = await models.Assignee.findOne({ userId });
                    if (!data) throw new MoleculerClientError("Not Found!", 404, "NOT_FOUND");

                    return data;
                } catch (error) {
                    logger.error("[ERROR] assignee.detailByUserId => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
        updateByUserId: {
            params: {
                userId: {
                    type: "string",
                    empty: false,
                },
                name: {
                    type: "string",
                },
                email: {
                    type: "email",
                },
            },
            async handler(ctx) {
                logger.info("[ACTION] assignee.updateByUserId is called.");

                const { userId, name, email } = ctx.params;

                try {
                    const data = await models.Assignee.findOneAndUpdate({ userId }, { name, email });
                    if (!data) throw new MoleculerClientError("Not Found!", 404, "NOT_FOUND");

                    return;
                } catch (error) {
                    logger.error("[ERROR] assignee.updateByUserId => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
        deleteByUserId: {
            params: {
                userId: {
                    type: "string",
                    empty: false,
                },
            },
            async handler(ctx) {
                logger.info("[ACTION] assignee.deleteByUserId is called.");

                const { userId } = ctx.params;

                try {
                    const data = await models.Assignee.findOneAndDelete({ userId });
                    if (!data) throw new MoleculerClientError("Not Found!", 404, "NOT_FOUND");

                    return;
                } catch (error) {
                    logger.error("[ERROR] assignee.deleteByUserId => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
    },
};

module.exports = services;
