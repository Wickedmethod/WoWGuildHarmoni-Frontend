<script setup lang="ts">
type FileEntry = { path: string; lazy: boolean };
// List all files under src (excluding node_modules)
const files = Object.entries(
  import.meta.glob<string>(
    [
      '/src/**/*.*',
      '!/src/**/*.map',
      '!/src/**/*.svg',
      '!/src/**/*.ico',
      '!/src/**/*.png',
      '!/src/**/*.jpg',
      '!/src/**/*.webp',
      '!/src/**/*.gif',
    ],
    { eager: false }
  )
)
  .map(([path]) => ({ path, lazy: true }) satisfies FileEntry)
  .sort((a, b) => a.path.localeCompare(b.path));
</script>

<template>
  <section class="mx-auto max-w-5xl p-4">
    <h1 class="text-2xl font-semibold tracking-tight mb-2">Showcase: Project Files</h1>
    <p class="text-sm text-muted-foreground mb-6">
      This page lists source files discovered via Vite's glob import.
    </p>
    <div class="rounded-md border">
      <div class="grid grid-cols-1 divide-y">
        <div
          v-for="f in files"
          :key="f.path"
          class="px-3 py-2 text-sm flex items-center justify-between"
        >
          <code class="text-muted-foreground">{{ f.path }}</code>
          <span class="text-xs">{{ f.lazy ? 'lazy' : 'eager' }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
