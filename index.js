// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import typeDefs from "./graphql-server/typeDefs/typeDefs.js";
import resolvers from "./graphql-server/resolvers/resolvers.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const { json } = bodyParser;
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(
  "/graphql",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  }),
  json(),
  cookieParser(),
  graphqlUploadExpress(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res }),
  })
);

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
