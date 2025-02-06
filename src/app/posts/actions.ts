import { Post } from "../../domain/posts/types";

export async function getAllPosts(): Promise<Post[]> {
  const response = await fetch("http://localhost:3000/api/posts");
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
}

export async function getPostById(id: string): Promise<Post> {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`);
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
}
