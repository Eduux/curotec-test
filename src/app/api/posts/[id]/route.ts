import * as postActions from "@/app/domain/posts/actions";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const post = postActions.getById(id);

    if (!post)
      return Response.json(
        { status: "error", error: "Post not found" },
        { status: 404 }
      );

    return Response.json(post);
  } catch (err) {
    return Response.json(
      { status: "error", error: (err as Error).message },
      { status: 500 }
    );
  }
}
