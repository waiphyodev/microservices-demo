const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const data = await req.app.locals.broker.call("user.create", req.body);

        return res.status(200).json({ code: 200, message: "Created." });
    } catch (error) {
        return res.status(error.code).json({ code: error.code, message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await req.app.locals.broker.call("user.list", req.query);

        return res.status(200).json({ code: 200, data });
    } catch (error) {
        return res.status(error.code).json({ code: error.code, message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await req.app.locals.broker.call("user.detail", { id: req.params.id });

        return res.status(200).json({ code: 200, data });
    } catch (error) {
        return res.status(error.code).json({ code: error.code, message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const data = await req.app.locals.broker.call("user.update", { id: req.params.id, ...req.body });

        return res.status(200).json({ code: 200, data });
    } catch (error) {
        return res.status(error.code).json({ code: error.code, message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const data = await req.app.locals.broker.call("user.delete", { id: req.params.id });

        return res.status(200).json({ code: 200, data });
    } catch (error) {
        return res.status(error.code).json({ code: error.code, message: error.message });
    }
});

module.exports = router;
