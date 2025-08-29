<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { Button } from '@/components/ui/button';

import { deleteProject, fetchProject } from '../api/projects.api';

const route = useRoute();
const router = useRouter();
const qc = useQueryClient();
const id = computed(() => String(route.params.id ?? ''));

const { data, isLoading, isError, error } = useQuery({
  queryKey: ['project', id],
  queryFn: () => fetchProject(id.value),
  enabled: computed(() => !!id.value),
});

const remove = useMutation({
  mutationFn: () => deleteProject(id.value),
  onSuccess: async () => {
    await qc.invalidateQueries({ queryKey: ['projects'] });
    router.push({ name: 'projects' });
  },
});

function back() {
  router.push({ name: 'projects' });
}
</script>

<template>
  <section class="mx-auto max-w-5xl p-4">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-semibold tracking-tight">Project: {{ id }}</h1>
      <Button variant="outline" @click="back">Back</Button>
    </div>

    <div v-if="isLoading" class="text-sm text-muted-foreground">Loading…</div>
    <div v-else-if="isError" class="text-sm text-destructive">{{ (error as Error).message }}</div>
    <div v-else class="rounded-md border p-4 space-y-2">
      <h2 class="text-xl font-medium">{{ data?.name }}</h2>
      <p class="text-sm text-muted-foreground">{{ data?.description }}</p>
      <div class="pt-2 flex gap-2">
        <Button variant="outline" @click="router.push({ name: 'project-edit', params: { id } })"
          >Edit</Button
        >
        <Button variant="destructive" @click="remove.mutate()">Delete</Button>
      </div>
    </div>
  </section>
</template>
