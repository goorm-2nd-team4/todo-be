const { MongoClient } = require("mongodb");
const {
  MONGO_URI,
  MONGO_DB_NAME,
  MONGO_COLLECTION_NAME
} = require("../config/env");

let client;
let collection;

async function connectToMongo() {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    collection = client.db(MONGO_DB_NAME).collection(MONGO_COLLECTION_NAME);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

function getTodoCollection() {
  if (!collection) {
    throw new Error("MongoDB collection is not initialized");
  }

  return collection;
}

module.exports = {
  connectToMongo,
  getTodoCollection
};
