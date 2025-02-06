import NotFound from "@/components/not-found";
import { getPostById } from "../actions";
import PostWrapper from "../components/post-wrapper";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const post = await getPostById(id);

  return <>{post ? <PostWrapper post={post} /> : <NotFound />}</>;
}
