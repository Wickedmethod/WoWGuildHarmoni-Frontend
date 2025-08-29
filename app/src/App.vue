<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import { Toaster } from '@/components/ui/sonner';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <Toaster />
    <router-view />
  </div>
</template>
