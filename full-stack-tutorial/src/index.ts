import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entity/Post";
import microConfigs from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microConfigs);
  await orm.getMigrator().up();
  // const post = orm.em.create(Post, { title: "my first post" });
  // await orm.em.persistAndFlush(post);

  const posts = await orm.em.find(Post, {});
  console.log(posts);
};

main().catch((e) => {
  console.log(e);
});
