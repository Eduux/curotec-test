import { create } from "zustand";
import { Comment, Post } from "../domain/posts/types";

interface IPostInteractionStore {
  likedPosts: Post["id"][];
  commentsPosts: Record<Post["id"], Comment[]>;

  likeOrUnlike: (id: Post["id"]) => void;
  addComment: (id: Post["id"], comment: Comment) => void;
  deleteComment: (id: Post["id"], created_at: Comment["created_at"]) => void;
  isPostLiked: (id: Post["id"]) => boolean;
  getCommentsByPostId: (id: Post["id"]) => Comment[];
}

export const usePostInteractionStore = create<IPostInteractionStore>(
  (set, get) => ({
    likedPosts: [],
    commentsPosts: {},

    likeOrUnlike: (id) =>
      set((state) => {
        const isLiked = state.likedPosts.includes(id);
        return {
          likedPosts: isLiked
            ? state.likedPosts.filter((postId) => postId !== id)
            : [...state.likedPosts, id],
        };
      }),

    addComment: (id, comment) =>
      set((state) => ({
        commentsPosts: {
          ...state.commentsPosts,
          [id]: [...(state.commentsPosts[id] || []), comment],
        },
      })),

    deleteComment: (id, created_at) =>
      set((state) => ({
        commentsPosts: {
          ...state.commentsPosts,
          [id]:
            state.commentsPosts[id]?.filter(
              (comment) => comment.created_at !== created_at
            ) || [],
        },
      })),

    isPostLiked: (id) => get().likedPosts.includes(id),
    getCommentsByPostId: (id) => get().commentsPosts[id] || [],
  })
);
