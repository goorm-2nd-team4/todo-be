const { HOST, PORT } = require("./config/env");
const { createApp } = require("./app");
const { connectToMongo } = require("./db/mongo");

async function startServer() {
  await connectToMongo();

  const app = createApp();

  app.listen(PORT, HOST, () => {
    console.log(`Express server listening on http://${HOST}:${PORT}`);
  });
}

startServer();
