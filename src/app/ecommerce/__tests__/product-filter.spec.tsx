import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, beforeEach, it, expect, Mock } from "vitest";
import ProductFilter from "../components/product-filter";
import { useProductStore } from "@/stores/products";

vi.mock("@/stores/products", () => ({
  useProductStore: vi.fn(),
}));

describe("ProductFilter Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useProductStore as unknown as Mock).mockReturnValue({
      category: null,
      sortOrder: null,
      setCategory: vi.fn(),
      setSortOrder: vi.fn(),
    });
  });

  it("should render filter buttons", () => {
    render(<ProductFilter />);

    expect(screen.getByTestId("button-Electronics")).toBeTruthy();
    expect(screen.getByTestId("button-Accessories")).toBeTruthy();
    expect(screen.getByTestId("button-sort-price-asc")).toBeTruthy();
  });

  it("should update category when clicking Electronics button", () => {
    const mockSetCategory = vi.fn();
    (useProductStore as unknown as Mock).mockReturnValue({
      category: null,
      setCategory: mockSetCategory,
      sortOrder: null,
      setSortOrder: vi.fn(),
    });

    render(<ProductFilter />);
    const electronicsButton = screen.getByTestId("button-Electronics");

    fireEvent.click(electronicsButton);

    expect(mockSetCategory).toHaveBeenCalledWith("Electronics");
  });

  it("should update category when clicking Accessories button", () => {
    const mockSetCategory = vi.fn();
    (useProductStore as unknown as Mock).mockReturnValue({
      category: null,
      setCategory: mockSetCategory,
      sortOrder: null,
      setSortOrder: vi.fn(),
    });

    render(<ProductFilter />);
    const accessoriesButton = screen.getByTestId("button-Accessories");

    fireEvent.click(accessoriesButton);

    expect(mockSetCategory).toHaveBeenCalledWith("Accessories");
  });

  it("should toggle sort order when clicking Sort Price button", () => {
    const mockSetSortOrder = vi.fn();
    (useProductStore as unknown as Mock).mockReturnValue({
      category: null,
      setCategory: vi.fn(),
      sortOrder: "asc",
      setSortOrder: mockSetSortOrder,
    });

    render(<ProductFilter />);
    const sortButton = screen.getByTestId("button-sort-price-asc");

    fireEvent.click(sortButton);

    expect(mockSetSortOrder).toHaveBeenCalledWith("desc");
  });
});
