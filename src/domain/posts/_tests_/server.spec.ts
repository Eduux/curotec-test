import { describe, it, expect, vi } from "vitest";
import { getAll, getById } from "../actions";

vi.mock("../data.json", () => ({
  default: [
    {
      id: "1",
      title: "Test Post 1",
      description: "Description for test post 1",
      created_at: "2025-02-06T10:15:30Z",
      comments: [],
    },
    {
      id: "2",
      title: "Test Post 2",
      description: "Description for test post 2",
      created_at: "2025-02-06T12:30:00Z",
      comments: [],
    },
  ],
}));

describe("Posts Domain", () => {
  it("getAll should return all posts", () => {
    const posts = getAll();
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe("Test Post 1");
    expect(posts[1].title).toBe("Test Post 2");
  });

  it("getById should return the correct post by ID", () => {
    const post = getById("1");
    expect(post).toBeDefined();
    expect(post?.id).toBe("1");
    expect(post?.title).toBe("Test Post 1");
  });

  it("getById should return undefined if post does not exist", () => {
    const post = getById("99");
    expect(post).toBeUndefined();
  });
});
