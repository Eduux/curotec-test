import { getAllPosts } from "./actions";

export default async function Page() {
  const posts = await getAllPosts();

  console.log(posts);

  return <div>hello</div>;
}
