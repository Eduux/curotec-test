export type Category = "Electronics" | "Accessories";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
};
