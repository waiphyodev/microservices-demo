const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const data = await req.app.locals.broker.call("assignment.list");

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(error.code).json({ success: false, message: error.message });
    }
});

module.exports = router;
