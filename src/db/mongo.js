const { MongoClient } = require("mongodb");
const {
  MONGO_URI,
  MONGO_DB_NAME,
  MONGO_COLLECTION_NAME
} = require("../config/env");

let client;
let database;
let collection;

async function connectToMongo() {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    database = client.db(MONGO_DB_NAME);
    collection = database.collection(MONGO_COLLECTION_NAME);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

async function pingMongo() {
  if (!database) {
    return false;
  }

  try {
    await database.command({ ping: 1 });
    return true;
  } catch (error) {
    console.error("MongoDB health check failed", error);
    return false;
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
  getTodoCollection,
  pingMongo
};
