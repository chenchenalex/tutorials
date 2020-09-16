import { withUrqlClient } from "next-urql";
import NavBar from "../components/NavBar";
import { Post, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      {!data ? null : data.posts.map((p: Post) => <div key={p.id}>{p.title}</div>)}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
