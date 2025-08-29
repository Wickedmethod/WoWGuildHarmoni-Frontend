<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { Button } from '@/components/ui/button';

import { createProject } from '../api/projects.api';

const router = useRouter();
const qc = useQueryClient();
const name = ref('');
const description = ref('');

const createMut = useMutation({
  mutationFn: () => createProject({ name: name.value, description: description.value }),
  onSuccess: async (p) => {
    await qc.invalidateQueries({ queryKey: ['projects'] });
    router.push({ name: 'project-detail', params: { id: p.id } });
  },
});
</script>

<template>
  <section class="mx-auto max-w-5xl p-4 space-y-4">
    <h1 class="text-2xl font-semibold tracking-tight">New Project</h1>
    <div class="grid gap-3">
      <input v-model="name" placeholder="Name" class="border rounded-md px-3 py-2 bg-background" />
      <textarea
        v-model="description"
        placeholder="Description"
        class="border rounded-md px-3 py-2 bg-background"
      />
      <div>
        <Button :disabled="createMut.isPending" @click="createMut.mutate()">Create</Button>
      </div>
    </div>
  </section>
</template>
