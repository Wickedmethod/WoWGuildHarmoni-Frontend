import { describe, it, expect, beforeEach } from 'vitest';

import { fetchThreads, resetForum, createThread, fetchThreadPosts } from './forum.api';

describe('forum.api seeding and CRUD', () => {
  beforeEach(async () => {
    // clear any persisted data
    try {
      localStorage.clear();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Ignore if localStorage is not available in this environment
    }
    await resetForum();
  });

  it('seeds demo threads', async () => {
    const threads = await fetchThreads();
    expect(Array.isArray(threads)).toBe(true);
    expect(threads.length).toBeGreaterThan(0);
  });

  it('creates a new thread and first post', async () => {
    const t = await createThread({ title: 'Hello', author: 'Tester', content: 'First message' });
    expect(t.title).toBe('Hello');
    const posts = await fetchThreadPosts(t.id);
    expect(posts.length).toBeGreaterThan(0);
    const first = posts[0];
    if (!first) throw new Error('Expected at least one post');
    expect(first.threadId).toBe(t.id);
  });
});
