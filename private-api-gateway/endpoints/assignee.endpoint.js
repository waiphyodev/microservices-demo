const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        await req.app.locals.broker.call("assignee.create", {
            ...req.body
        });

        return res.status(201).json({ code: 201, message: "Created." });
    } catch (error) {
        return res.status(error.code).json({ code: error.code, message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const { count, list } = await req.app.locals.broker.call("assignee.list");

        return res.status(200).json({ code: 200, data: { count, list } });
    } catch (error) {
        return res.status(error.code).json({ code: error.code, message: error.message });
    }
});

module.exports = router;
