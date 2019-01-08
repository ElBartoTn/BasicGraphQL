import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { genSchema } from "./utils/genSchema";
import { createTypeormConn } from "./utils/createTypeormConn";

export const startServer = async () => {
  const server = new ApolloServer({ schema: genSchema() });
  const app = express();
  server.applyMiddleware({ app });
  await createTypeormConn();
  const myApp = await app.listen({
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return myApp;
};
