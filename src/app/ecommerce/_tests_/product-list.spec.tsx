import { render, screen } from "@testing-library/react";
import { vi, describe, beforeEach, it, expect, Mock } from "vitest";
import { useFilteredProducts } from "../queries";
import ProductList from "../components/product-list";

vi.mock("../queries", () => ({
  useFilteredProducts: vi.fn(),
}));

describe("ProductList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show loading state initially", () => {
    (useFilteredProducts as unknown as Mock).mockReturnValue({
      products: [],
      isLoading: true,
      error: null,
    });

    render(<ProductList />);

    expect(screen.getByText("Loading products...")).toBeTruthy();
  });

  it("should display an error message if fetching fails", () => {
    (useFilteredProducts as unknown as Mock).mockReturnValue({
      products: [],
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    render(<ProductList />);

    expect(screen.getByText("Error: Failed to fetch")).toBeTruthy();
  });

  it("should render the product list when products are available", () => {
    const mockProducts = [
      { id: "1", name: "Laptop", price: 1200 },
      { id: "2", name: "Headphones", price: 200 },
    ];

    (useFilteredProducts as unknown as Mock).mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
    });

    render(<ProductList />);

    expect(screen.getByText("Laptop")).toBeTruthy();
    expect(screen.getByText("Headphones")).toBeTruthy();
  });
});
