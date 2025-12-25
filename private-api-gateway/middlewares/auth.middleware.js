const { MoleculerClientError, MoleculerServerError } = require("moleculer").Errors;
const broker = require("../broker");

const logger = broker.logger;

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ code: 401, message: "Unauthenticated!" });

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) return res.status(401).json({ code: 401, message: "Unauthenticated!" });
    console.log("authHeader", authHeader)
    console.log("scheme", scheme)
    console.log("token", token)

    try {
        const user = await req.app.locals.broker.call("auth.verify", { token });

        req.user = user;

        next();
    } catch (error) {
        logger.error("[ERROR] middleware.authenticate => ", JSON.stringify(error, null, 2));

        return res.status(error.code).json({ code: error.code, message: error.message });
    }
};

module.exports = { authenticate };
