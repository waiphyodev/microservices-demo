const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", (req, res) => {
    return res.send("Private API Gateway is running.");
});

router.get("/api/nodes", async (req, res) => {
    const list = await req.app.locals.broker.call("$node.list");

    return res.status(200).json({ code: 200, data: { count: list?.length > 0 ? list.length : 0, list } });
});

router.get("/api/services", async (req, res) => {
    const { available } = req.query;

    const list = await req.app.locals.broker.call("$node.services", {
        skipInternal: true,
        onlyAvailable: available,
    });

    return res.status(200).json({ code: 200, data: { count: list?.length > 0 ? list.length : 0, list } });
});

router.get("/api/actions", async (req, res) => {
    const { available } = req.query;

    const list = await req.app.locals.broker.call("$node.actions", { skipInternal: true, onlyAvailable: available });

    return res.status(200).json({ code: 200, data: { count: list?.length > 0 ? list.length : 0, list } });
});

router.get("/api/events", async (req, res) => {
    const list = await req.app.locals.broker.call("$node.events");

    return res.status(200).json({ code: 200, data: list });
});

router.use("/api/auth", require("./auth.endpoint"));

router.use(authenticate);

router.use("/api/users", require("./user.endpoint"));
router.use("/api/assignments", require("./assignment.endpoint"));

module.exports = router;
