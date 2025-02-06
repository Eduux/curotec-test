import * as postActions from "@/domain/posts/actions";
import { Post } from "@/domain/posts/types";

export async function getAllPosts(): Promise<Post[]> {
  const posts = postActions.getAll();
  return posts || [];
}

export async function getPostById(id: string): Promise<Post | null> {
  const post = postActions.getById(id);

  if (!post) return null;

  return post;
}
