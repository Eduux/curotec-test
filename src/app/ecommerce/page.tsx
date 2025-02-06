import ProductList from "./components/product-list";
import ProductFilter from "./components/product-filter";

export default function Page() {
  return (
    <div>
      <ProductFilter />
      <ProductList />
    </div>
  );
}
