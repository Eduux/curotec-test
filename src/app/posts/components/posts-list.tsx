"use client";

import { Post } from "@/domain/posts/types";

import NotFound from "@/components/not-found";
import PostCard from "./post-card";
import { usePostInteractionStore } from "@/stores/posts";

type Props = {
  posts: Post[];
};

export default function PostsList({ posts }: Props) {
  const postsInteractionStore = usePostInteractionStore();

  return (
    <div>
      {posts.length ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isLiked={postsInteractionStore.isPostLiked(post.id)}
              onClickLikeUnlikeButton={() =>
                postsInteractionStore.likeOrUnlike(post.id)
              }
            />
          ))}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
