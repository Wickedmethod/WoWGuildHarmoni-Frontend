<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useForumMutations } from '../composables/use-forum';

const router = useRouter();
const { create } = useForumMutations();
const form = ref({ title: '', author: 'Guest', content: '' });
const isValid = () => form.value.title.trim().length > 0 && form.value.content.trim().length > 0;

function submit() {
  if (!isValid()) return;
  create.mutate(
    { title: form.value.title, author: form.value.author, content: form.value.content },
    { onSuccess: (thread) => router.push(`/forum/${thread.id}`) }
  );
}
</script>

<template>
  <section class="mx-auto max-w-3xl p-4">
    <Card>
      <CardHeader>
        <CardTitle>Create Thread</CardTitle>
      </CardHeader>
      <CardContent>
        <form class="grid gap-3" @submit.prevent="submit">
          <div class="grid gap-1">
            <Label for="title">Title</Label>
            <Input id="title" v-model="form.title" />
          </div>
          <div class="grid gap-1">
            <Label for="author">Author</Label>
            <Input id="author" v-model="form.author" />
          </div>
          <div class="grid gap-1">
            <Label for="content">Message</Label>
            <textarea id="content" v-model="form.content" class="min-h-32 rounded-md border bg-background px-3 py-2 text-sm" />
          </div>
          <div class="pt-2">
            <Button type="submit" :disabled="Boolean(create.isPending) || !isValid()">Create</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </section>
</template>
