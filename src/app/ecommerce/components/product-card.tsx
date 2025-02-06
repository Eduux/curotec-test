"use client";

import { Product } from "@/domain/ecommerce/types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500">${product.price}</p>
      <p className="text-sm text-gray-400">{product.category}</p>
    </div>
  );
}
