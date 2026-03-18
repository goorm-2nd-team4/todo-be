const express = require("express");
const { todoRouter } = require("./routes/todos");

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

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
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
