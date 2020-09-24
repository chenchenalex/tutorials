import { MikroORM } from "@mikro-orm/core";
import Path from "path";

import { Post } from "./entity/Post";
import { __prod__ } from "./constants";
import { User } from "./entity/User";

export default {
  migrations: {
    path: Path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post, User],
  dbName: "nanjieTest",
  user: "postgres",
  password: "120488",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];