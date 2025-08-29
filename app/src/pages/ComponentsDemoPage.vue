<script setup lang="ts">
import { ref } from 'vue';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import DataTable from '@/components/ui/data-table/DataTable.vue';
import DatePicker from '@/components/ui/date-picker/DatePicker.vue';
//

const picked = ref<string | null>(null);
const loading = ref(true);
window.setTimeout(() => (loading.value = false), 800);

//
</script>

<template>
  <section class="mx-auto max-w-5xl p-4 space-y-8">
    <h1 class="text-2xl font-semibold tracking-tight">Components Demo</h1>

    <!-- Accordion -->
    <div>
      <h2 class="mb-2 font-medium">Accordion</h2>
      <Accordion>
        <AccordionItem value="a1">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="a2">
          <AccordionTrigger>Section B</AccordionTrigger>
          <AccordionContent>
            Morbi placerat, urna a volutpat hendrerit, mauris nisl fermentum leo.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <!-- Skeleton -->
    <div>
      <h2 class="mb-2 font-medium">Skeleton</h2>
      <div class="grid gap-2 sm:grid-cols-2">
        <div class="space-y-2">
          <div v-if="loading" class="space-y-2">
            <Skeleton class="h-6 w-40" />
            <Skeleton class="h-24 w-full" />
          </div>
          <div v-else>
            <div class="h-6 w-40 rounded-md bg-muted/40" />
            <p class="text-sm text-muted-foreground">Loaded content.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div>
      <h2 class="mb-2 font-medium">Data Table</h2>
      <DataTable />
    </div>

    <!-- Date Picker -->
    <div>
      <h2 class="mb-2 font-medium">Date Picker</h2>
      <DatePicker v-model="picked" />
      <div class="mt-2 text-sm text-muted-foreground">Selected: {{ picked || 'none' }}</div>
    </div>
  </section>
</template>
