// Copied from pages/ProjectEditPage.vue
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { Button } from '@/components/ui/button';

import { fetchProject, updateProject } from '../api/projects.api';

const route = useRoute();
const router = useRouter();
const qc = useQueryClient();

const id = route.params.id as string;

const name = ref('');
const description = ref('');

const { data } = useQuery({
  queryKey: ['project', id],
  queryFn: () => fetchProject(id),
});

watch(
  () => data?.value,
  (p) => {
    if (p) {
      name.value = p.name;
      description.value = p.description;
    }
  },
  { immediate: true }
);

const editMut = useMutation({
  mutationFn: () => updateProject(id, { name: name.value, description: description.value }),
  onSuccess: async () => {
    await qc.invalidateQueries({ queryKey: ['projects'] });
    await qc.invalidateQueries({ queryKey: ['project', id] });
    router.push({ name: 'project-detail', params: { id } });
  },
});
</script>

<template>
  <section class="mx-auto max-w-5xl p-4 space-y-4">
    <h1 class="text-2xl font-semibold tracking-tight">Edit Project</h1>
    <div class="grid gap-3">
      <input v-model="name" placeholder="Name" class="border rounded-md px-3 py-2 bg-background" />
      <textarea
        v-model="description"
        placeholder="Description"
        class="border rounded-md px-3 py-2 bg-background"
      />
      <div>
        <Button :disabled="editMut.isPending" @click="editMut.mutate()">Save</Button>
      </div>
    </div>
  </section>
</template>
