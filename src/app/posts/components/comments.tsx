"use client";

import { useState } from "react";
import { usePostInteractionStore } from "@/app/stores/posts";
import { Comment } from "@/domain/posts/types";
import { formatDate } from "@/utils";

type Props = {
  postId: string;
  comments: Comment[];
};

export default function Comments({ postId, comments }: Props) {
  const [newComment, setNewComment] = useState("");
  const { addComment, deleteComment, getCommentsByPostId } =
    usePostInteractionStore();

  const myComments = getCommentsByPostId(postId);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    addComment(postId, {
      author: "User",
      content: newComment,
      created_at: new Date().toISOString(),
    });

    setNewComment("");
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-100 shadow-md">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      <ul className="space-y-2">
        {comments.length > 0 || myComments.length > 0 ? (
          [...comments, ...myComments].map((comment, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm flex flex-col"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-800">
                  {comment.author}
                </p>
                <span className="text-xs text-gray-500">
                  {formatDate(comment.created_at)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">{comment.content}</p>

                {comment.author === "User" ? (
                  <button
                    onClick={() => deleteComment(postId, comment.created_at)}
                    className="text-red-500 text-xs hover:underline self-end mt-1"
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            No comments yet. Be the first!
          </p>
        )}
      </ul>

      <div className="mt-4 flex items-center">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg text-sm"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
        />
        <button
          onClick={handleAddComment}
          className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  );
}
