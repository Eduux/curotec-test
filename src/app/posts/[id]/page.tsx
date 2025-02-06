import NotFound from "@/components/not-found";
import { getPostById } from "../actions";
import PostWrapper from "../components/post-wrapper";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  const post = await getPostById(id);

  return <>{post ? <PostWrapper post={post} /> : <NotFound />}</>;
}
