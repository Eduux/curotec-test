import NotFound from "../components/not-found";
import { getAllPosts } from "./actions";
import PostCard from "./components/post-card";

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <div>
      <div>
        {posts.length ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
}
