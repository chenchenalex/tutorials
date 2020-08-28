import { Post } from "./entity/Post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import Path from "path";

export default {
  migrations: {
    path: Path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post],
  dbName: "nanjieTest",
  user: "postgres",
  password: "120488",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
