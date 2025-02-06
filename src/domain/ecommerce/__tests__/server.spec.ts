import { describe, it, expect, vi } from "vitest";
import { getAll } from "../actions";

vi.mock("../data.json", () => ({
  default: [
    { id: "1", name: "Laptop", price: 1200, category: "Electronics" },
    { id: "2", name: "Smartphone", price: 800, category: "Electronics" },
  ],
}));

describe("Products Domain", () => {
  it("getAll should return all products", () => {
    const posts = getAll();
    expect(posts).toHaveLength(2);
    expect(posts[0].name).toBe("Laptop");
    expect(posts[1].name).toBe("Smartphone");
  });
});
