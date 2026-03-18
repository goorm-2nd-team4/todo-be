const express = require("express");
const { todoRouter } = require("./routes/todos");
const { pingMongo } = require("./db/mongo");

function createApp() {
  const app = express();

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
