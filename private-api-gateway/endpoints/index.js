const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    return res.send("Private API Gateway is running.")
})

router.use("/api/assignments", require("./assignment.endpoint"));

module.exports = router;