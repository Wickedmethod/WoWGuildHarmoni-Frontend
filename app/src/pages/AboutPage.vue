<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <section class="mx-auto max-w-5xl p-6">
    <h1 class="text-2xl font-semibold">About</h1>
    <p class="text-muted-foreground mt-2">{{ t('subtitle') }}</p>
  </section>
</template>
