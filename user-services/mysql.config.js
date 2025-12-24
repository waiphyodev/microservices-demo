const mysql = require("mysql2/promise");

const dbConnection = mysql.createPool(process.env.MYSQLDB_URI);

(async () => {
    try {
        const connection = await dbConnection.getConnection();
        console.info("DB is connected.");

        connection.release();
    } catch (error) {
        console.error.bind(console, "DB Connection Error!");

        process.exit(1);
    }
})();

module.exports = dbConnection;
