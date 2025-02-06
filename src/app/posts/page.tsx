import { getAllPosts } from "./actions";
import PostsList from "./components/posts-list";

export const dynamic = "force-dynamic";

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <div>
      <PostsList posts={posts} />
    </div>
  );
}
