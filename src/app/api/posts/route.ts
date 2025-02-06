import * as postActions from "@/domain/posts/actions";

export async function GET() {
  try {
    const posts = postActions.getAll();
    return Response.json(posts);
  } catch (err) {
    return Response.json(
      { status: "error", error: (err as Error).message },
      { status: 500 }
    );
  }
}
