<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns';

import type { Post } from '../types';

defineProps<{ post: Post }>();
</script>

<template>
  <div class="rounded-md border p-3 bg-card">
    <div class="flex items-center justify-between text-xs text-muted-foreground">
      <div>by {{ post.author }}</div>
      <div>{{ formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) }}</div>
    </div>
    <div class="mt-2 whitespace-pre-line">{{ post.content }}</div>
  </div>
  
</template>
