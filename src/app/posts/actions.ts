export async function getAllPosts() {
  const response = await fetch("http://localhost:3000/api/posts");
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
}
