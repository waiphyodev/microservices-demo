const { MoleculerClientError, MoleculerServerError } = require("moleculer").Errors;
const broker = require("../broker");
const models = require("../models");

const logger = broker.logger;

const services = {
    name: "assignee",
    events: {
        "user.created": {
            params: {
                userId: {
                    type: "number",
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
                logger.info("[EVENT] user.created is triggered.");

                const { userId, name, email } = ctx.params;

                await ctx.call("assignee.create", { userId, name, email });
            },
        },
    },
    actions: {
        create: {
            params: {
                userId: {
                    type: "number",
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
                    const data = await models.Assignee.findOne({ userId, email });
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
                    const data = await models.Assignee.aggregate([
                        {
                            $facet: {
                                count: [{ $count: "total" }],
                                list: [
                                    {
                                        $lookup: {
                                            from: "assignments",
                                            localField: "_id",
                                            foreignField: "assigneeId",
                                            as: "assignmentList",
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            $project: {
                                count: { $arrayElemAt: ["$count.total", 0] },
                                list: 1,
                            },
                        },
                    ]);

                    return { count: data[0]?.count || 0, list: data[0]?.list || [] };
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
                    const data = await models.Assignee.aggregate([
                        {
                            $match: {
                                userId: Number(userId)
                            }
                        },
                        {
                            $lookup: {
                                from: "assignments",
                                localField: "_id",
                                foreignField: "assigneeId",
                                as: "assignmentList",
                            },
                        },
                    ]);
                    if (!data) throw new MoleculerClientError("Not Found!", 404, "NOT_FOUND");

                    return data;
                } catch (error) {
                    logger.error("[ERROR] assignee.detailByUserId => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
    },
};

module.exports = services;
