import * as productsActions from "@/domain/ecommerce/actions";

export async function GET() {
  try {
    const products = productsActions.getAll();
    return Response.json(products);
  } catch (err) {
    return Response.json(
      { status: "error", error: (err as Error).message },
      { status: 500 }
    );
  }
}
