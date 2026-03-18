require("dotenv").config();

const HOST = process.env.HOST;
const PORT = Number(process.env.PORT);
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_COLLECTION_NAME = process.env.MONGO_COLLECTION_NAME;

module.exports = {
  HOST,
  PORT,
  MONGO_URI,
  MONGO_DB_NAME,
  MONGO_COLLECTION_NAME
};
