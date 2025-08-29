<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import type { Post, Thread } from '../types';
import { useForumStore } from '../stores/forum.store';
import { useForumMutations, useThread, useThreadPosts } from '../composables/use-forum';

const route = useRoute();
const idRef = computed(() => String(route.params.id ?? ''));

const threadQuery = useThread(idRef);
const postsQuery = useThreadPosts(idRef);

const thread = computed<Thread | undefined>(() => threadQuery.data.value as Thread | undefined);
const posts = computed<Post[]>(() => (postsQuery.data.value as Post[] | undefined) ?? []);
const { reply, removeThread, removePost, editPost } = useForumMutations();

const forum = useForumStore();
const form = ref({ author: forum.author, content: '' });

function submit() {
  if (!idRef.value || !form.value.content.trim()) return;
  reply.mutate({ threadId: idRef.value, input: { author: form.value.author, content: form.value.content } });
  form.value.content = '';
}

const editingPostId = ref<string | null>(null);
const editingContent = ref('');
function startEditPost(p: Post) {
  editingPostId.value = p.id;
  editingContent.value = p.content;
}
function cancelEditPost() {
  editingPostId.value = null;
  editingContent.value = '';
}
function saveEditPost() {
  if (!editingPostId.value) return;
  editPost.mutate({ postId: editingPostId.value, content: editingContent.value }, { onSuccess: cancelEditPost });
}
</script>

<template>
  <section class="mx-auto max-w-5xl p-4 space-y-4">
  <div v-if="threadQuery.isPending && !thread" class="space-y-1">
      <Skeleton class="h-7 w-64" />
      <Skeleton class="h-4 w-32" />
    </div>
    <div v-else-if="thread">
      <h1 class="text-2xl font-semibold tracking-tight">{{ thread!.title }}</h1>
      <div class="text-sm text-muted-foreground">Started by {{ thread!.author }}</div>
    </div>
    <Separator />

    <div class="space-y-3">
  <template v-if="postsQuery.isPending && posts.length === 0">
        <Card v-for="i in 3" :key="i">
          <CardHeader class="py-3">
            <Skeleton class="h-4 w-24" />
          </CardHeader>
          <CardContent class="pt-0 space-y-2">
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-3/4" />
          </CardContent>
        </Card>
      </template>
      <template v-else>
        <Card v-for="p in posts" :key="p.id">
          <CardHeader class="py-3 flex-row items-center justify-between gap-3">
            <CardTitle class="text-sm">{{ p.author }}</CardTitle>
            <div class="flex items-center gap-2">
              <Button size="sm" variant="secondary" @click="startEditPost(p)">Edit</Button>
              <Button size="sm" variant="destructive" :disabled="Boolean(removePost.isPending)" @click="removePost.mutate(p.id)">Delete</Button>
            </div>
          </CardHeader>
          <CardContent class="pt-0 space-y-2">
            <template v-if="editingPostId === p.id">
              <textarea v-model="editingContent" class="min-h-28 w-full rounded-md border bg-background px-3 py-2 text-sm" />
              <div class="flex gap-2">
                <Button size="sm" :disabled="Boolean(editPost.isPending)" @click="saveEditPost">Save</Button>
                <Button size="sm" variant="ghost" :disabled="Boolean(editPost.isPending)" @click="cancelEditPost">Cancel</Button>
              </div>
            </template>
            <template v-else>
              <p class="whitespace-pre-line">{{ p.content }}</p>
            </template>
          </CardContent>
        </Card>
      </template>
    </div>

    <Separator />

    <form class="grid gap-3 max-w-xl" @submit.prevent="submit">
      <div class="grid gap-1">
        <Label for="author">Author</Label>
        <Input id="author" v-model="form.author" />
      </div>
      <div class="grid gap-1">
        <Label for="content">Reply</Label>
        <textarea
          id="content"
          v-model="form.content"
          class="min-h-28 rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Write a reply..."
        />
      </div>
      <div class="flex items-center gap-2">
        <Button type="submit" :disabled="Boolean(reply.isPending)">Post reply</Button>
        <Button v-if="thread" variant="destructive" :disabled="Boolean(removeThread.isPending)" @click="removeThread.mutate(thread!.id)">Delete thread</Button>
      </div>
    </form>
  </section>
</template>
