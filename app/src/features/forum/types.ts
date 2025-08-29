export type Thread = {
  id: string;
  title: string;
  author: string;
  createdAt: string; // ISO
  postsCount: number;
  lastActivityAt: string; // ISO
};

export type Post = {
  id: string;
  threadId: string;
  author: string;
  content: string;
  createdAt: string; // ISO
};

export type CreateThreadInput = {
  title: string;
  author: string;
  content: string; // first post
};

export type CreatePostInput = {
  author: string;
  content: string;
};