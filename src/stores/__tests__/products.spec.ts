import { describe, it, expect, beforeEach } from "vitest";
import { useProductStore } from "../products";

describe("useProductStore", () => {
  beforeEach(() => {
    useProductStore.setState({ category: null, sortOrder: null });
  });

  it("should set the category", () => {
    const store = useProductStore.getState();

    store.setCategory("Electronics");
    expect(useProductStore.getState().category).toBe("Electronics");

    store.setCategory("Accessories");
    expect(useProductStore.getState().category).toBe("Accessories");

    store.setCategory(null);
    expect(useProductStore.getState().category).toBeNull();
  });

  it("should set the sort order", () => {
    const store = useProductStore.getState();

    store.setSortOrder("asc");
    expect(useProductStore.getState().sortOrder).toBe("asc");

    store.setSortOrder("desc");
    expect(useProductStore.getState().sortOrder).toBe("desc");

    store.setSortOrder(null);
    expect(useProductStore.getState().sortOrder).toBeNull();
  });

  it("should reset filters when category and sortOrder are set to null", () => {
    const store = useProductStore.getState();

    store.setCategory("Electronics");
    store.setSortOrder("asc");

    expect(useProductStore.getState().category).toBe("Electronics");
    expect(useProductStore.getState().sortOrder).toBe("asc");

    store.setCategory(null);
    store.setSortOrder(null);

    expect(useProductStore.getState().category).toBeNull();
    expect(useProductStore.getState().sortOrder).toBeNull();
  });
});
