const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { count, list } = await req.app.locals.broker.call("assignee.list");

        return res.status(200).json({ code: 200, data: { count, list } });
    } catch (error) {
        return res.status(error.code).json({ code: error.code, message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await req.app.locals.broker.call("assignee.detailByUserId", { userId: req.params.id });

        return res.status(200).json({ code: 200, data });
    } catch (error) {
        return res.status(error.code).json({ code: error.code, message: error.message });
    }
});

module.exports = router;
