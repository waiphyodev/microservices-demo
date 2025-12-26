const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { MoleculerClientError, MoleculerServerError } = require("moleculer").Errors;
const dbConnection = require("../mysql.config");
const broker = require("../broker");

const logger = broker.logger;

const services = {
    name: "auth",
    actions: {
        register: {
            async handler(ctx) {
                logger.info("[ACTION] auth.register is called.");

                const { email, password } = ctx.params;

                try {
                    const [rows] = await dbConnection.query("SELECT * FROM users where email = ?", [email]);
                    if (rows.length > 0) throw new MoleculerClientError("Duplicated!", 409, "CONFLICT");

                    const hash = await bcrypt.hash(password, 10);

                    await dbConnection.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash]);

                    return;
                } catch (error) {
                    logger.error("[ERROR] auth.register => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
        login: {
            async handler(ctx) {
                logger.info("[ACTION] auth.login is called.");

                const { email, password } = ctx.params;

                try {
                    const [rows] = await dbConnection.query("SELECT id, email, password FROM users where email = ?", [
                        email,
                    ]);
                    if (rows.length < 1) throw new MoleculerClientError("Not Found!", 404, "NOT_FOUND");

                    const user = rows[0];

                    const isPasswordMatch = await bcrypt.compare(password, user.password);
                    if (!isPasswordMatch) throw new MoleculerClientError("Invalid Credentials!", 400, "BAD_REQUEST");

                    const tokenPayload = {
                        id: user.id,
                        email: user.email,
                    };

                    const accessToken = jwt.sign(tokenPayload, process.env.AT_SECRET, {
                        expiresIn: process.env.AT_EXPIRED,
                    });

                    const refreshToken = jwt.sign({ id: user.id }, process.env.RT_SECRET, {
                        expiresIn: process.env.RT_EXPIRED,
                    });

                    return { accessToken, refreshToken };
                } catch (error) {
                    logger.error("[ERROR] auth.login => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
        verify: {
            async handler(ctx) {
                logger.info("[ACTION] auth.verify is called.");
                const { token } = ctx.params;

                try {
                    const decoded = jwt.verify(token, process.env.AT_SECRET);
                    const [rows] = await dbConnection.query("SELECT id, email from users where id = ?", [decoded.id]);
                    if (rows.length < 1) throw new MoleculerClientError("Not Found!", 404, "NOT_FOUND");
                    const { id, email } = rows[0];

                    return { id, email };
                } catch (error) {
                    logger.error("[ERROR] auth.verify => ", JSON.stringify(error, null, 2));

                    throw new MoleculerServerError(error.message, error.code, error.type);
                }
            },
        },
    },
};

module.exports = services;
