import { Category } from "@/domain/ecommerce/types";
import { create } from "zustand";

type SortOrder = "asc" | "desc";

interface ProductFilterStore {
  category: Category | null;
  sortOrder: SortOrder | null;
  setCategory: (category: Category | null) => void;
  setSortOrder: (order: SortOrder | null) => void;
}

export const useProductStore = create<ProductFilterStore>((set) => ({
  category: null,
  sortOrder: null,

  setCategory: (category) => set({ category }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
}));
