import { Calendar, ThumbsUp, MessageCircle } from "lucide-react";

import { Post } from "@/domain/posts/types";
import { formatDate } from "@/utils";
import Link from "next/link";
import Button from "@/components/button";

type Props = {
  post: Post;
  isLiked: boolean;
  onClickLikeUnlikeButton(): void;
};

export default function PostCard({
  post,
  isLiked,
  onClickLikeUnlikeButton,
}: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 transition-transform hover:scale-[1.01] hover:shadow-lg">
      <Link href={`/posts/${post.id}`}>
        <h2
          data-testid={post.title}
          className="text-lg font-bold text-gray-900"
        >
          {post.title}
        </h2>

        <p className="text-gray-700 mt-1">{post.description}</p>

        <div className="mt-4 text-sm text-gray-500 flex flex-wrap gap-2">
          <span className="bg-gray-100 px-3 py-1 rounded-md flex items-center">
            <Calendar className="mr-2" /> {formatDate(post.created_at)}
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-md flex items-center">
            <MessageCircle className="mr-2" /> {post.comments.length} Comments
          </span>
        </div>

        <div className="mt-4">
          <span className="text-sm text-gray-600">By {post.author}</span>
        </div>
      </Link>

      <div className="space-y-5 md:space-y-0 md:flex items-center justify-between">
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Button
          className={`flex items-center text-gray-500  ${
            isLiked ? "border border-black font-bold" : "bg-gray-400 border"
          }`}
          data-testid={`like-button-${post.id}`}
          onClick={() => onClickLikeUnlikeButton()}
        >
          <ThumbsUp className="mr-2" />
          {isLiked ? post.likes : post.likes + 1} Likes
        </Button>
      </div>
    </div>
  );
}
