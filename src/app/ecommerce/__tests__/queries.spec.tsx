import { renderHook, waitFor } from "@testing-library/react";
import { vi, describe, beforeEach, it, expect, Mock } from "vitest";
import { useFilteredProducts } from "../queries";
import { useProductStore } from "@/stores/products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/stores/products", () => ({
  useProductStore: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = "QueryClientProviderWrapper";

  return Wrapper;
};

describe("useFilteredProducts Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useProductStore as unknown as Mock).mockReturnValue({
      category: null,
      sortOrder: null,
    });

    global.fetch = vi.fn();
  });

  it("should fetch products successfully", async () => {
    const mockProducts = [
      { id: "1", name: "Laptop", price: 1200, category: "Electronics" },
      { id: "2", name: "Headphones", price: 200, category: "Accessories" },
    ];

    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    const { result } = renderHook(() => useFilteredProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.products).toHaveLength(2));
    expect(result.current.products?.[0].name).toBe("Laptop");
  });

  it("should filter products by category", async () => {
    (useProductStore as unknown as Mock).mockReturnValue({
      category: "Electronics",
      sortOrder: null,
    });

    const mockProducts = [
      { id: "1", name: "Laptop", price: 1200, category: "Electronics" },
      { id: "2", name: "Headphones", price: 200, category: "Accessories" },
    ];

    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    const { result } = renderHook(() => useFilteredProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.products).toHaveLength(1));
    expect(result.current.products?.[0].name).toBe("Laptop");
  });

  it("should sort products by price (ascending)", async () => {
    (useProductStore as unknown as Mock).mockReturnValue({
      category: null,
      sortOrder: "asc",
    });

    const mockProducts = [
      { id: "1", name: "Laptop", price: 1200, category: "Electronics" },
      { id: "2", name: "Headphones", price: 200, category: "Accessories" },
    ];

    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    const { result } = renderHook(() => useFilteredProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.products).toHaveLength(2));
    expect(result.current.products?.[0].name).toBe("Headphones");
  });

  it("should sort products by price (descending)", async () => {
    (useProductStore as unknown as Mock).mockReturnValue({
      category: null,
      sortOrder: "desc",
    });

    const mockProducts = [
      { id: "1", name: "Laptop", price: 1200, category: "Electronics" },
      { id: "2", name: "Headphones", price: 200, category: "Accessories" },
    ];

    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    const { result } = renderHook(() => useFilteredProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.products).toHaveLength(2));
    expect(result.current.products?.[0].name).toBe("Laptop");
  });

  it("should handle fetch errors", async () => {
    (global.fetch as Mock).mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useFilteredProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.error).toBeDefined());
  });
});
