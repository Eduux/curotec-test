import { Post } from "./types";
import data from "./data.json";

const posts: Post[] = data;

export function getAll() {
  return posts;
}

export function getById(id: string) {
  return posts.find((post) => post.id === id);
}
