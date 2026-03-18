const express = require("express");
const { todoRouter } = require("./routes/todos");
const { pingMongo } = require("./db/mongo");
const { CORS_ORIGIN } = require("./config/env");

const CORS_METHODS = "GET,POST,PUT,DELETE,OPTIONS";
const CORS_HEADERS = "Content-Type,Authorization";

function applyCors(req, res) {
  const origin = req.get("Origin");

  if (!CORS_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  } else if (origin === CORS_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", CORS_ORIGIN);
  }

  res.setHeader("Access-Control-Allow-Methods", CORS_METHODS);
  res.setHeader("Access-Control-Allow-Headers", CORS_HEADERS);
}

function createApp() {
  const app = express();

  app.use((req, res, next) => {
    applyCors(req, res);

    if (req.method === "OPTIONS") {
      return res.status(204).send();
    }

    return next();
  });

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      message: "Todo API server",
      endpoints: [
        "GET /health",
        "GET /api/todos",
        "POST /api/todos",
        "PUT /api/todos/:id",
        "DELETE /api/todos/:id"
      ]
    });
  });

  app.get("/health", async (req, res) => {
    const isMongoConnected = await pingMongo();

    if (!isMongoConnected) {
      return res.status(503).json({
        status: "error",
        database: "disconnected"
      });
    }

    return res.json({
      status: "ok",
      database: "connected"
    });
  });

  app.use("/api/todos", todoRouter);

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({
      message: "Internal server error"
    });
  });

  return app;
}

module.exports = {
  createApp
};
