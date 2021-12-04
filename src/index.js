const app = require("./app");
const connectToDB = require("./utils/db");
const logger = require("./utils/logger");
const PORT = process.env.PORT || 3000;

connectToDB();

app.listen(PORT, () => {
  logger.info(`Server listen on port ${PORT}`);
});
