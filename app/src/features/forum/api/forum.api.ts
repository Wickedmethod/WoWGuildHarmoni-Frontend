import type { Thread, Post, CreatePostInput, CreateThreadInput } from '../types';

const TKEY = 'demo-forum-threads';
const PKEY = 'demo-forum-posts';

// Storage helpers with in-memory fallback (in case localStorage is unavailable)
const memoryStore: Record<string, string> = {};
function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] ?? null : null;
  }
}
function safeSetItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    memoryStore[key] = value;
  }
}
function safeRemoveItem(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    delete memoryStore[key];
  }
}

function nowISO() {
  return new Date().toISOString();
}

function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function seed() {
  const threads: Thread[] = [
    {
      id: 't1',
      title: 'Welcome to the forum',
      author: 'Admin',
      createdAt: nowISO(),
      postsCount: 2,
      lastActivityAt: nowISO(),
    },
    {
      id: 't2',
      title: 'Show us your setup',
      author: 'Jane',
      createdAt: nowISO(),
      postsCount: 1,
      lastActivityAt: nowISO(),
    },
  ];

  const posts: Post[] = [
    { id: 'p1', threadId: 't1', author: 'Admin', content: 'Say hello 👋', createdAt: nowISO() },
    { id: 'p2', threadId: 't1', author: 'John', content: 'Hello everyone!', createdAt: nowISO() },
    { id: 'p3', threadId: 't2', author: 'Jane', content: 'Here is my desk setup.', createdAt: nowISO() },
  ];

  safeSetItem(TKEY, JSON.stringify(threads));
  safeSetItem(PKEY, JSON.stringify(posts));
}

function loadThreads(): Thread[] {
  const raw = safeGetItem(TKEY);
  if (!raw) {
    seed();
  }
  try {
    const parsed = JSON.parse(safeGetItem(TKEY) || '[]') as unknown;
    if (Array.isArray(parsed) && parsed.length > 0) return parsed as Thread[];
    // seed when empty array present
    seed();
    return JSON.parse(safeGetItem(TKEY) || '[]') as Thread[];
  } catch {
    seed();
    return JSON.parse(safeGetItem(TKEY) || '[]') as Thread[];
  }
}

function loadPosts(): Post[] {
  const raw = safeGetItem(PKEY);
  if (!raw) {
    seed();
  }
  try {
    const parsed = JSON.parse(safeGetItem(PKEY) || '[]') as unknown;
    if (Array.isArray(parsed) && parsed.length > 0) return parsed as Post[];
    seed();
    return JSON.parse(safeGetItem(PKEY) || '[]') as Post[];
  } catch {
    seed();
    return JSON.parse(safeGetItem(PKEY) || '[]') as Post[];
  }
}

function saveThreads(threads: Thread[]) {
  safeSetItem(TKEY, JSON.stringify(threads));
}

function savePosts(posts: Post[]) {
  safeSetItem(PKEY, JSON.stringify(posts));
}

export async function fetchThreads(): Promise<Thread[]> {
  try {
    return await delay(loadThreads());
  } catch {
    // Attempt to reseed and recover
    try {
      seed();
      return await delay(loadThreads());
    } catch {
      return await delay([] as Thread[]);
    }
  }
}

export async function fetchThread(id: string): Promise<Thread> {
  const t = loadThreads().find((x) => x.id === id);
  if (!t) throw new Error('Thread not found');
  return delay(t);
}

export async function fetchThreadPosts(threadId: string): Promise<Post[]> {
  return delay(loadPosts().filter((p) => p.threadId === threadId));
}

export async function createThread(input: CreateThreadInput): Promise<Thread> {
  const threads = loadThreads();
  const posts = loadPosts();
  const id = `t${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = nowISO();
  const thread: Thread = {
    id,
    title: input.title,
    author: input.author,
    createdAt,
    postsCount: 1,
    lastActivityAt: createdAt,
  };
  threads.unshift(thread);
  posts.push({
    id: `p${Math.random().toString(36).slice(2, 8)}`,
    threadId: id,
    author: input.author,
    content: input.content,
    createdAt,
  });
  saveThreads(threads);
  savePosts(posts);
  return delay(thread);
}

export async function addPost(threadId: string, input: CreatePostInput): Promise<Post> {
  const threads = loadThreads();
  const posts = loadPosts();
  const thread = threads.find((t) => t.id === threadId);
  if (!thread) throw new Error('Thread not found');
  const post: Post = {
    id: `p${Math.random().toString(36).slice(2, 8)}`,
    threadId,
    author: input.author,
    content: input.content,
    createdAt: nowISO(),
  };
  posts.push(post);
  thread.postsCount += 1;
  thread.lastActivityAt = post.createdAt;
  savePosts(posts);
  saveThreads(threads);
  return delay(post);
}

export async function resetForum(): Promise<void> {
  // Clear and reseed
  safeRemoveItem(TKEY);
  safeRemoveItem(PKEY);
  seed();
  return delay(undefined, 50);
}

export async function deleteThread(threadId: string): Promise<void> {
  const threads = loadThreads().filter((t) => t.id !== threadId);
  const posts = loadPosts().filter((p) => p.threadId !== threadId);
  saveThreads(threads);
  savePosts(posts);
  return delay(undefined);
}

export async function deletePost(postId: string): Promise<void> {
  const posts = loadPosts();
  const post = posts.find((p) => p.id === postId);
  if (!post) return delay(undefined);
  const remaining = posts.filter((p) => p.id !== postId);
  const threads = loadThreads();
  const thread = threads.find((t) => t.id === post.threadId);
  if (thread) {
    thread.postsCount = Math.max(0, thread.postsCount - 1);
    // recompute lastActivityAt from remaining posts in the thread
    const threadPosts = remaining.filter((p) => p.threadId === thread.id);
    const latest = threadPosts.reduce<string | undefined>((acc, p) =>
      !acc || p.createdAt > acc ? p.createdAt : acc,
    undefined);
    thread.lastActivityAt = latest ?? thread.createdAt;
  }
  savePosts(remaining);
  saveThreads(threads);
  return delay(undefined);
}

export async function updateThreadTitle(threadId: string, title: string): Promise<Thread> {
  const threads = loadThreads();
  const thread = threads.find((t) => t.id === threadId);
  if (!thread) throw new Error('Thread not found');
  thread.title = title.trim();
  saveThreads(threads);
  return delay(thread);
}

export async function updatePost(postId: string, content: string): Promise<Post> {
  const posts = loadPosts();
  const p = posts.find((x) => x.id === postId);
  if (!p) throw new Error('Post not found');
  p.content = content;
  savePosts(posts);
  return delay(p);
}
