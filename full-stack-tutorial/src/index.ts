import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfigs from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const orm = await MikroORM.init(microConfigs);
  await orm.getMigrator().up();

  const app = express();

  app.listen(4000, () => {
    console.log("server started at localhost:4000");
  });

  app.get("/", (_, res) => {
    res.send("hi world");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });
};

main().catch((e) => {
  console.log(e);
});
