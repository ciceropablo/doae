import { buildApp } from "./app";
import { config } from "./config";

async function start() {
  const app = await buildApp();
  const host = config.server.host;
  const port = config.server.port;

  try {
    await app.listen({ port, host });
    console.log(`Server running on http://${host}:${port}/`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
