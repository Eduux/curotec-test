import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "@/stores/products";
import { Product } from "@/domain/ecommerce/types";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:3000/api/ecommerce");
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export function useFilteredProducts() {
  const { category, sortOrder } = useProductStore();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60 * 1000,
  });

  const filteredProducts = products
    ?.filter((p) => (category ? p.category === category : true))
    ?.sort((a, b) =>
      sortOrder === "asc"
        ? a.price - b.price
        : sortOrder === "desc"
        ? b.price - a.price
        : 0
    );

  return { products: filteredProducts, isLoading, error };
}
