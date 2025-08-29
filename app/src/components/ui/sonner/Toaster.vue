<script setup lang="ts">
import { Toaster as VueSonnerToaster } from 'vue-sonner';
import 'vue-sonner/style.css';
</script>

<template>
  <VueSonnerToaster class="pointer-events-auto" />
  <!-- pointer-events-auto helps when used with dialogs -->
  <!-- Position, theme can be configured via props if needed -->
</template>
