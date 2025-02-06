import { Calendar, ThumbsUp, MessageCircle } from "lucide-react";

import { Post } from "@/app/domain/posts/types";
import { formatDate } from "@/app/utils";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 transition-transform hover:scale-[1.01] hover:shadow-lg">
      <h2 className="text-lg font-bold text-gray-900">{post.title}</h2>
      <p className="text-gray-700 mt-1">{post.description}</p>

      <div className="mt-4 text-sm text-gray-500 flex flex-wrap gap-2">
        <span className="bg-gray-100 px-3 py-1 rounded-md flex items-center">
          <Calendar className="mr-2" /> {formatDate(post.created_at)}
        </span>
        <span className="bg-gray-100 px-3 py-1 rounded-md flex items-center">
          <ThumbsUp className="mr-2" /> {post.likes} Likes
        </span>
        <span className="bg-gray-100 px-3 py-1 rounded-md flex items-center">
          <MessageCircle className="mr-2" /> {post.comments.length} Comments
        </span>
      </div>

      <div className="mt-4">
        <span className="text-sm text-gray-600">By {post.author}</span>
      </div>

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
    </div>
  );
}
