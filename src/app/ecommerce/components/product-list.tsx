"use client";

import { useFilteredProducts } from "../queries";
import ProductCard from "./product-card";

export default function ProductList() {
  const { products, isLoading, error } = useFilteredProducts();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
