import fastify from "fastify";

import configs from "./configs/index.js";

const server = fastify();

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

const { host, port } = configs;

server.listen({ host, port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`server listening at ${address}`);
});
