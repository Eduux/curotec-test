"use client";

import { Post } from "@/domain/posts/types";
import PostCard from "./post-card";
import { usePostInteractionStore } from "@/app/stores/posts";
import GoBackButton from "@/components/go-back-button";
import Comments from "./comments";

type Props = {
  post: Post;
};

export default function PostWrapper({ post }: Props) {
  const postsInteractionStore = usePostInteractionStore();

  return (
    <div className="space-y-6">
      <GoBackButton />

      <PostCard
        key={post.id}
        post={post}
        isLiked={postsInteractionStore.isPostLiked(post.id)}
        onClickLikeUnlikeButton={() =>
          postsInteractionStore.likeOrUnlike(post.id)
        }
      />

      <Comments postId={post.id} comments={post.comments} />
    </div>
  );
}
