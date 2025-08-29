<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { Button } from '@/components/ui/button';

import ProjectCard from '../components/ProjectCard.vue';
import type { Project } from '../types';
import { deleteProject, fetchProjects } from '../api/projects.api';

const router = useRouter();
const qc = useQueryClient();

const { data, isLoading, isError, error } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  staleTime: 30_000,
});

const projects = ref<Project[]>([]);

watchEffect(() => {
  projects.value = data?.value ?? [];
});

const remove = useMutation({
  mutationFn: (id: string) => deleteProject(id),
  onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
});

function openProject(id: string) {
  router.push({ name: 'project-detail', params: { id } });
}

function createProjectPage() {
  router.push({ name: 'project-create' });
}
</script>

<template>
  <section class="mx-auto max-w-5xl p-4">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-semibold tracking-tight">Projects</h1>
      <Button size="sm" @click="createProjectPage">New</Button>
    </div>

    <div v-if="isLoading" class="text-sm text-muted-foreground">Loading…</div>
    <div v-else-if="isError" class="text-sm text-destructive">{{ (error as Error).message }}</div>

    <div class="grid gap-3 sm:grid-cols-2">
      <div v-for="p in projects" :key="p.id" class="group rounded-md border p-2 hover:bg-accent/40">
        <button class="w-full text-left" @click="openProject(p.id)">
          <ProjectCard :project="p" />
        </button>
        <div class="mt-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="sm"
            variant="outline"
            @click.stop="router.push({ name: 'project-edit', params: { id: p.id } })"
            >Edit</Button
          >
          <Button size="sm" variant="destructive" @click.stop="remove.mutate(p.id)">Delete</Button>
        </div>
      </div>
    </div>
  </section>
</template>
