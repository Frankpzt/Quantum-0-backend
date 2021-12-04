const mongoose = require("mongoose");
const logger = require("./logger");

const connectToDB = () => {
    if (!process.env.CONNECTION_STRING) {
        process.exit(1);
    }
    const connectionString = process.env.CONNECTION_STRING;
    const db = mongoose.connection;
    db.on("connected", () => {
        logger.info(`DB connected, ${connectionString}`);
    });
    db.on("error", (error) => {
        logger.error(error.message);
        process.exit(1);
    });

    return mongoose.connect(connectionString);
};

module.exports = connectToDB;
