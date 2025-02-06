"use client";

import Button from "@/components/button";
import { useProductStore } from "@/stores/products";

export default function ProductFilter() {
  const { setCategory, setSortOrder, category, sortOrder } = useProductStore();

  return (
    <div className="grid grid-cols-2 md:flex gap-4 mb-4">
      <Button
        onClick={() =>
          category === "Electronics"
            ? setCategory(null)
            : setCategory("Electronics")
        }
        className={
          category !== "Electronics"
            ? "bg-gray-200 text-inherit hover:text-white"
            : ""
        }
      >
        Electronics
      </Button>
      <Button
        onClick={() =>
          category === "Accessories"
            ? setCategory(null)
            : setCategory("Accessories")
        }
        className={
          category !== "Accessories"
            ? "bg-gray-200 text-inherit hover:text-white"
            : ""
        }
      >
        Accessories
      </Button>
      <Button
        onClick={() =>
          sortOrder === "asc" ? setSortOrder("desc") : setSortOrder("asc")
        }
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sort Price {sortOrder === "asc" ? "↓" : "↑"}
      </Button>
    </div>
  );
}
