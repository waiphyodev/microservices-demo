const broker = require("../broker");
const models = require("../models");
const { MoleculerServerError } = require("moleculer").Errors;

const logger = broker.logger;

const services = {
    name: "assignment",
    actions: {
        create: {
            async handler(ctx) {
                //
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

                    throw new MoleculerServerError(error.message, 500, "INTERNAL_SERVER_ERROR");
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
