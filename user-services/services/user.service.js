const bcrypt = require("bcryptjs");
const { MoleculerClientError, MoleculerServerError } = require("moleculer").Errors;
const broker = require("../broker");
const dbConnection = require("../mysql.config");

const logger = broker.logger;

const services = {
    name: "user",
    actions: {
        create: {
            params: {
                email: {
                    type: "email",
                    empty: false,
                },
                password: {
                    type: "string",
                    min: 8,
                    max: 64,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                },
            },
            async handler(ctx) {
                logger.info("[ACTION] user.create is called.");

                const { email, password } = ctx.params;

                try {
                    const [rows] = await dbConnection.query("SELECT * FROM users where email = ?", [email]);
                    if (rows.length > 0) throw new MoleculerClientError("Duplicated!", 409, "CONFLICT");

                    const hash = await bcrypt.hash(password, 10);

                    await dbConnection.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash]);

                    return;
                } catch (error) {
                    logger.error("[ERROR] user.create => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
        list: {
            async handler(ctx) {
                logger.info("[ACTION] user.list is called.");

                try {
                    const [rows] = await dbConnection.query("SELECT id, email FROM users");

                    return { count: rows.length, list: rows };
                } catch (error) {
                    logger.error("[ERROR] user.list => ", JSON.stringify(error, null, 2));

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
                logger.info("[ACTION] user.detail is called.");

                try {
                    const [rows] = await dbConnection.query("SELECT id, email FROM users WHERE id = ?", [id]);
                    if (rows.length < 1) throw new MoleculerClientError("Not Found!", 404, "NOT_FOUND");

                    const data = rows[0];

                    return { data };
                } catch (error) {
                    logger.error("[ERROR] user.detail => ", JSON.stringify(error, null, 2));

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
                email: {
                    type: "email",
                    empty: false,
                },
            },
            async handler(ctx) {
                logger.info("[ACTION] user.update is called.");

                const { id, email } = ctx.params;

                try {
                    const [rows] = await dbConnection.query("SELECT id, email FROM users WHERE id = ?", [id]);
                    if (rows.length < 1) throw new MoleculerClientError("Not Found!", 404, "NOT_FOUND");

                    await dbConnection.query("UPDATE users SET email = ? WHERE id = ?", [email, id]);

                    return;
                } catch (error) {
                    logger.error("[ERROR] user.update => ", JSON.stringify(error, null, 2));

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
                logger.info("[ACTION] user.delete is called.");

                const { id } = ctx.params;

                try {
                    const [rows] = await dbConnection.query("SELECT id, email FROM users WHERE id = ?", [id]);
                    if (rows.length < 1) throw new MoleculerClientError("Not Found!", 404, "NOT_FOUND");

                    await dbConnection.query("DELETE FROM users WHERE id = ?", [id]);

                    return;
                } catch (error) {
                    logger.error("[ERROR] user.delete => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
    },
};

module.exports = services;
