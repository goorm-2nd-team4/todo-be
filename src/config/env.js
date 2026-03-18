require("dotenv").config();

const HOST = process.env.HOST;
const PORT = Number(process.env.PORT);
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_COLLECTION_NAME = process.env.MONGO_COLLECTION_NAME;

function validateEnv() {
  const missing = [
    ["HOST", HOST],
    ["PORT", process.env.PORT],
    ["MONGO_URI", MONGO_URI],
    ["MONGO_DB_NAME", MONGO_DB_NAME],
    ["MONGO_COLLECTION_NAME", MONGO_COLLECTION_NAME]
  ].filter(([, value]) => !value);

  if (missing.length > 0) {
    const names = missing.map(([name]) => name).join(", ");
    throw new Error(`Missing required environment variables: ${names}`);
  }

  if (Number.isNaN(PORT)) {
    throw new Error("PORT must be a valid number");
  }
}

validateEnv();

module.exports = {
  HOST,
  PORT,
  MONGO_URI,
  MONGO_DB_NAME,
  MONGO_COLLECTION_NAME
};
