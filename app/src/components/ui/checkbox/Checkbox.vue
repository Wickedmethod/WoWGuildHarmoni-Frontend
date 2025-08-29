<script setup lang="ts">
const model = defineModel<boolean | 'indeterminate'>();
defineProps<{ ariaLabel?: string; class?: string }>();
</script>

<template>
  <input
    :aria-label="ariaLabel"
    type="checkbox"
    :class="['size-4 rounded border', $props.class]"
    :checked="model === true || model === 'indeterminate'"
    @change="(e: Event) => ((model as any) = (e.target as HTMLInputElement).checked)"
  />
</template>
