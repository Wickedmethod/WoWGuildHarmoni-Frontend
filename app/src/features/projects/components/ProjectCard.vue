<script setup lang="ts">
export interface Project {
  id: string;
  name: string;
  description: string;
}

defineProps<{ project: Project }>();
</script>

<template>
  <div class="rounded-md border p-3 hover:bg-accent/40 transition-colors">
    <h3 class="font-medium">{{ project.name }}</h3>
    <p class="text-sm text-muted-foreground">{{ project.description }}</p>
  </div>
</template>
