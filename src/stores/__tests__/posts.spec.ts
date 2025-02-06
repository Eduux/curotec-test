import { beforeEach, describe, expect, it } from "vitest";
import { usePostInteractionStore } from "../posts";
import { Comment } from "@/domain/posts/types";

describe("usePostInteractionStore", () => {
  beforeEach(() => {
    usePostInteractionStore.setState({
      likedPosts: [],
      commentsPosts: {},
    });
  });

  it("should like and unlike a post", () => {
    const { likeOrUnlike, isPostLiked } = usePostInteractionStore.getState();

    likeOrUnlike("post-1");
    expect(isPostLiked("post-1")).toBe(true);

    likeOrUnlike("post-1");
    expect(isPostLiked("post-1")).toBe(false);
  });

  it("should add a comment to a post", () => {
    const { addComment, getCommentsByPostId } =
      usePostInteractionStore.getState();

    const comment: Comment = {
      author: "John Doe",
      content: "This is a test comment",
      created_at: new Date().toISOString(),
    };

    addComment("post-1", comment);
    const comments = getCommentsByPostId("post-1");

    expect(comments).toHaveLength(1);
    expect(comments[0]).toEqual(comment);
  });

  it("should delete a specific comment from a post", () => {
    const { addComment, deleteComment, getCommentsByPostId } =
      usePostInteractionStore.getState();

    const comment1: Comment = {
      author: "Alice",
      content: "First comment",
      created_at: "2025-02-06T10:00:00Z",
    };

    const comment2: Comment = {
      author: "Bob",
      content: "Second comment",
      created_at: "2025-02-06T11:00:00Z",
    };

    addComment("post-1", comment1);
    addComment("post-1", comment2);

    deleteComment("post-1", "2025-02-06T10:00:00Z");

    const comments = getCommentsByPostId("post-1");

    expect(comments).toHaveLength(1);
    expect(comments[0]).toEqual(comment2);
  });

  it("should return an empty array if no comments exist for a post", () => {
    const { getCommentsByPostId } = usePostInteractionStore.getState();

    const comments = getCommentsByPostId("post-2");

    expect(comments).toEqual([]);
  });

  it("should correctly track liked posts", () => {
    const { likeOrUnlike, isPostLiked } = usePostInteractionStore.getState();

    expect(isPostLiked("post-1")).toBe(false);

    likeOrUnlike("post-1");
    expect(isPostLiked("post-1")).toBe(true);

    likeOrUnlike("post-1");
    expect(isPostLiked("post-1")).toBe(false);
  });
});
