const { Types } = require("mongoose");
const broker = require("../broker");
const models = require("../models");
const { MoleculerClientError, MoleculerServerError } = require("moleculer").Errors;

const logger = broker.logger;

const services = {
    name: "assignment",
    actions: {
        create: {
            params: {
                assigneeId: {
                    type: "string",
                    empty: false,
                },
                description: {
                    type: "string",
                    empty: false,
                },
            },
            async handler(ctx) {
                logger.info("[ACTION] assignment.create is called.");

                const { assigneeId, description } = ctx.params;

                try {
                    await models.Assignment.create({
                        assigneeId,
                        description,
                    });

                    return;
                } catch (error) {
                    logger.error("[ERROR] assignment.create => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
        list: {
            async handler(ctx) {
                logger.info("[ACTION] assignment.list is called.");

                try {
                    const data = await models.Assignment.aggregate([
                        {
                            $facet: {
                                count: [{ $count: "total" }],
                                list: [
                                    {
                                        $lookup: {
                                            from: "assignees",
                                            localField: "assigneeId",
                                            foreignField: "_id",
                                            as: "assignee",
                                        },
                                    },
                                    {
                                        $addFields: {
                                            assignee: {
                                                $arrayElemAt: ["$assignee", 0],
                                            },
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
                    logger.error("[ERROR] assignment.list => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
        detail: {
            params: {
                id: {
                    type: "string",
                    empty: false,
                },
            },
            async handler(ctx) {
                logger.info("[ACTION] assignment.detail is called.");

                const { id } = ctx.params;

                try {
                    const data = await models.Assignment.aggregate([
                        {
                            $match: {
                                _id: new Types.ObjectId(id),
                            },
                        },
                        {
                            $lookup: {
                                from: "assignees",
                                localField: "assigneeId",
                                foreignField: "_id",
                                as: "assignee",
                            },
                        },
                        {
                            $addFields: {
                                assignee: {
                                    $arrayElemAt: ["$assignee", 0],
                                },
                            },
                        },
                    ]);
                    if (!data) throw new MoleculerClientError("Not Found!", 404, "NOT_FOUND");

                    return data;
                } catch (error) {
                    logger.error("[ERROR] assignment.detail => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
        update: {
            params: {
                id: {
                    type: "string",
                    empty: false,
                },
                assigneeId: {
                    type: "string",
                    empty: false,
                },
                description: {
                    type: "string",
                    empty: false,
                },
            },
            async handler(ctx) {
                logger.info("[ACTION] assignment.update is called.");

                const { id, assigneeId, description } = ctx.params;

                try {
                    const data = await models.Assignment.findByIdAndUpdate(id, { assigneeId, description });
                    if (!data) throw new MoleculerClientError("Not Found!", 404, "NOT_FOUND");

                    return;
                } catch (error) {
                    logger.error("[ERROR] assignment.update => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
        delete: {
            params: {
                id: {
                    type: "string",
                    empty: false,
                },
            },
            async handler(ctx) {
                logger.info("[ACTION] assignment.delete is called.");

                const { id } = ctx.params;

                try {
                    const data = await models.Assignment.findByIdAndDelete(id);
                    if (!data) throw new MoleculerClientError("Not Found!", 404, "NOT_FOUND");

                    return;
                } catch (error) {
                    logger.error("[ERROR] assignment.delete => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
    },
};

module.exports = services;
