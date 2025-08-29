import { computed } from 'vue';

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import {
  addPost,
  createThread,
  fetchThread,
  fetchThreadPosts,
  fetchThreads,
  resetForum,
  deleteThread,
  deletePost,
  updateThreadTitle,
  updatePost,
} from '../api/forum.api';
import type { Thread, Post } from '../types';

export function useThreadsList() {
  return useQuery({
    queryKey: ['threads'],
    staleTime: 30_000,
    retry: 0,
    queryFn: async () => {
      try {
        return await fetchThreads();
      } catch {
        await resetForum();
        return await fetchThreads();
      }
    },
  });
}

export function useThread(idRef: { value: string }) {
  return useQuery({
    queryKey: ['thread', idRef],
    queryFn: () => fetchThread(idRef.value),
    enabled: computed(() => !!idRef.value),
  });
}

export function useThreadPosts(idRef: { value: string }) {
  return useQuery({
    queryKey: ['posts', idRef],
    queryFn: () => fetchThreadPosts(idRef.value),
    enabled: computed(() => !!idRef.value),
  });
}

export function useForumMutations() {
  const qc = useQueryClient();
  const create = useMutation({
    mutationFn: createThread,
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ['threads'] }),
        qc.invalidateQueries({ queryKey: ['thread'] }),
        qc.invalidateQueries({ queryKey: ['posts'] }),
      ]);
    },
  });
  const reply = useMutation({
    mutationFn: ({ threadId, input }: { threadId: string; input: { author: string; content: string } }) =>
      addPost(threadId, input),
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ['threads'] }),
        qc.invalidateQueries({ queryKey: ['thread'] }),
        qc.invalidateQueries({ queryKey: ['posts'] }),
      ]);
    },
  });
  const reset = useMutation({
    mutationFn: resetForum,
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ['threads'] }),
        qc.invalidateQueries({ queryKey: ['thread'] }),
        qc.invalidateQueries({ queryKey: ['posts'] }),
      ]);
    },
  });
  const removeThread = useMutation({
    mutationFn: deleteThread,
    onMutate: async (threadId: string) => {
      await qc.cancelQueries({ queryKey: ['threads'] });
      const prev = qc.getQueryData<Thread[]>(['threads']);
      // optimistic list update
      if (Array.isArray(prev)) {
        qc.setQueryData<Thread[]>(
          ['threads'],
          prev.filter((t) => t.id !== threadId)
        );
      }
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['threads'], ctx.prev);
    },
    onSettled: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ['threads'] }),
        qc.invalidateQueries({ queryKey: ['posts'] }),
        qc.invalidateQueries({ queryKey: ['thread'] }),
      ]);
    },
  });
  const removePost = useMutation({
    mutationFn: deletePost,
    onMutate: async (postId: string) => {
      await qc.cancelQueries({ queryKey: ['posts'] });
      const prev = qc.getQueryData<Post[]>(['posts']);
      if (Array.isArray(prev)) {
        qc.setQueryData<Post[]>(
          ['posts'],
          prev.filter((p) => p.id !== postId)
        );
      }
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['posts'], ctx.prev);
    },
    onSettled: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ['threads'] }),
        qc.invalidateQueries({ queryKey: ['posts'] }),
      ]);
    },
  });
  const editThreadTitle = useMutation({
    mutationFn: ({ threadId, title }: { threadId: string; title: string }) => updateThreadTitle(threadId, title),
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ['threads'] }),
        qc.invalidateQueries({ queryKey: ['thread'] }),
      ]);
    },
  });
  const editPost = useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) => updatePost(postId, content),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['posts'] });
    },
  });
  return { create, reply, reset, removeThread, removePost, editThreadTitle, editPost };
}
