import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";

const main = async () => {
  const orm = await MikroORM.init({
    dbName: "lireddit",
    user: "postgres",
    password: "120488",
    type: "postgresql",
    debug: !__prod__,
  });
};

main();
