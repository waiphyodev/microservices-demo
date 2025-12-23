const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const mongodbConnection = mongoose.connection;

mongodbConnection.on("error", () =>
    console.error.bind(console, "connection error")
);

mongodbConnection.once("open", () =>
    console.info("DB is connected.")
);

module.exports = mongodbConnection;