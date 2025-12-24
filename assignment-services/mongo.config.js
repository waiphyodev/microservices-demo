const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const dbConnection = mongoose.connection;

dbConnection.on("error", () => console.error.bind(console, "DB Connection Error!"));

dbConnection.once("open", () => console.info("DB is connected."));

module.exports = dbConnection;
