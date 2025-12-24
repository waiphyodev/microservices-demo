const { randomBytes } = require("crypto");

module.exports = {
    namespace: process.env.NAMESPACE,
    nodeID: process.env.HA_ENABLED === "true" ? `${process.env.NODE_ID}-${randomBytes(6).toString("base64url")}` : process.env.NODE_ID,

    logger: [
        {
            type: "Console",
            options: {
                level: "info",
                formatter: "{timestamp} {level} {nodeID}: {msg}",
            },
        },
        {
            type: "File",
            options: {
                level: "info",
                folder: "../logs",
                filename: "{date}-info.log",
                formatter: "{timestamp} {level} {nodeID}: {msg}",
            },
        },
        {
            type: "File",
            options: {
                level: "warn",
                folder: "../logs",
                filename: "{date}-warn.log",
                formatter: "{timestamp} {level} {nodeID}: {msg}",
            },
        },
        {
            type: "File",
            options: {
                level: "error",
                folder: "../logs",
                filename: "{date}-error.log",
                formatter: "{timestamp} {level} {nodeID}: {msg}",
            },
        },
    ],

    transporter: process.env.TRANSPORTER,

    uidGenerator: () => randomBytes(6).toString("base64url"),

    tracing: {
        enabled: false,
        exporter: ["Console"],
    },
};
