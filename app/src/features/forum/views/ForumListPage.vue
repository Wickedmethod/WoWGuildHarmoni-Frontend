<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'vue-sonner';

import { useQuery } from '@tanstack/vue-query';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { fetchThreads } from '../api/forum.api';
import type { Thread } from '../types';
import { useForumMutations } from '../composables/use-forum';

const threadsQuery = useQuery({ queryKey: ['threads'], queryFn: fetchThreads });
const isPending = computed(() => !!threadsQuery.isPending.value);
const isError = computed(() => !!threadsQuery.isError.value);
const errorMessage = computed(() => {
  const e = threadsQuery.error.value as unknown;
  if (!e) return '';
  if (e instanceof Error) return e.message;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
});
const threads = computed<Thread[]>(() => (threadsQuery.data.value as Thread[] | undefined) ?? []);
const { reset, removeThread, editThreadTitle } = useForumMutations();

const editingId = ref<string | null>(null);
const editingTitle = ref('');
function startEdit(t: Thread) {
  editingId.value = t.id;
  editingTitle.value = t.title;
}
function cancelEdit() {
  editingId.value = null;
  editingTitle.value = '';
}
function saveEdit() {
  if (!editingId.value) return;
  const title = editingTitle.value.trim();
  if (!title) return;
  editThreadTitle.mutate({ threadId: editingId.value, title }, { onSuccess: cancelEdit });
}

function formatPostsLabel(count: number) {
  return `${count} ${count === 1 ? 'post' : 'posts'}`;
}

// Auto reseed once if the first successful fetch returns empty
const reseeded = ref(false);
watch(
  () => threadsQuery.isSuccess && threads.value.length === 0,
  (shouldReseed) => {
    if (shouldReseed && !reseeded.value && !reset.isPending) {
      reseeded.value = true;
      reset.mutate(undefined, {
        onSuccess: () => toast.success('Demo data has been reset'),
        onError: () => toast.error('Failed to reset demo data'),
      });
    }
  }
);
</script>

<template>
  <section class="mx-auto max-w-6xl p-6 space-y-6">
  <div class="flex flex-wrap items-center justify-between gap-2">
      <h1 class="text-2xl font-semibold tracking-tight">Forum</h1>
      <div class="flex items-center gap-2">
  <Button variant="secondary" size="sm" :disabled="reset.isPending" @click="reset.mutate()">Reset Demo</Button>
        <RouterLink to="/forum/new"><Button>Create Thread</Button></RouterLink>
      </div>
    </div>
    <Separator />

  <div v-if="isPending && threads.length === 0" class="space-y-3">
      <Card v-for="i in 3" :key="i">
        <CardHeader class="flex-row items-center justify-between">
          <Skeleton class="h-5 w-40" />
          <Skeleton class="h-4 w-28" />
        </CardHeader>
        <CardContent>
          <Skeleton class="h-4 w-24" />
        </CardContent>
      </Card>
    </div>
  <div v-else-if="isError" class="flex items-center justify-between text-sm">
      <div class="text-destructive">Failed to load<span v-if="errorMessage">: {{ errorMessage }}</span></div>
      <div class="flex items-center gap-2">
        <Button size="sm" variant="secondary" @click="threadsQuery.refetch()">Retry</Button>
        <Button size="sm" variant="outline" :disabled="Boolean(reset.isPending)" @click="reset.mutate()">Reset Demo</Button>
      </div>
    </div>
    <div v-else-if="threads.length === 0" class="text-sm text-muted-foreground">
      <div class="flex items-center justify-between">
        <div>No threads yet.</div>
        <div class="flex items-center gap-2">
          <Button variant="secondary" size="sm" :disabled="Boolean(reset.isPending)" @click="reset.mutate()">Reset Demo</Button>
          <RouterLink to="/forum/new"><Button size="sm">Create Thread</Button></RouterLink>
        </div>
      </div>
    </div>
    <div v-else class="space-y-3">
      <Card v-for="t in threads" :key="t.id">
        <CardHeader class="space-y-2 p-7">
          <div class="flex items-start justify-between gap-3">
            <CardTitle class="text-lg md:text-xl min-w-0 grow">
              <template v-if="editingId === t.id">
                <input
                  v-model="editingTitle"
                  class="w-full rounded-md border bg-background px-3 py-1.5 text-sm"
                  :disabled="Boolean(editThreadTitle.isPending)"
                />
              </template>
              <template v-else>
                <RouterLink :to="`/forum/${t.id}`" class="hover:underline truncate inline-block max-w-full">{{ t.title }}</RouterLink>
              </template>
            </CardTitle>
            <div class="flex items-center gap-2 shrink-0">
              <template v-if="editingId === t.id">
                <Button :disabled="Boolean(editThreadTitle.isPending)" @click="saveEdit">Save</Button>
                <Button variant="ghost" :disabled="Boolean(editThreadTitle.isPending)" @click="cancelEdit">Cancel</Button>
              </template>
              <template v-else>
                <Button variant="secondary" @click="startEdit(t)">Edit</Button>
                <Button variant="destructive" :disabled="Boolean(removeThread.isPending)" @click="removeThread.mutate(t.id)">Delete</Button>
              </template>
            </div>
          </div>
          <div class="text-sm text-muted-foreground">
            {{ formatPostsLabel(t.postsCount) }} • updated
            {{ formatDistanceToNow(new Date(t.lastActivityAt), { addSuffix: true }) }}
          </div>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">Started by {{ t.author }}</CardContent>
      </Card>
    </div>
  </section>
</template>
