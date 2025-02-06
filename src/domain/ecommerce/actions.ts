import { Product } from "./types";
import data from "./data.json";

const products: Product[] = data;

export function getAll() {
  return products;
}
