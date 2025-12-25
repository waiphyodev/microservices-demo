const express = require("express");
const broker = require("../broker");
const router = express.Router();

const logger = broker.logger;

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        await req.app.locals.broker.call("auth.register", { email, password });

        return res.status(201).json({ code: 201, message: "Registered." });
    } catch (error) {
        logger.error("[ERROR] api.auth.register => ", error.message);

        return res.status(error.code).json({ code: error.code, message: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const { accessToken, refreshToken } = await req.app.locals.broker.call("auth.login", { email, password });

        return res.status(200).json({ code: 200, data: { accessToken, refreshToken } });
    } catch (error) {
        logger.error("[ERROR] api.auth.login => ", error.message);

        return res.status(error.code).json({ code: error.code, message: error.message });
    }
});

module.exports = router;
