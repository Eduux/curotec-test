export type Comment = {
  author: string;
  content: string;
  created_at: string;
};

export type Post = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  comments: Comment[];
  author: string;
  likes: number;
  tags: string[];
};
