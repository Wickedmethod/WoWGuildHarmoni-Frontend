<script setup lang="ts">
import { Button } from '@/components/ui/button';
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue';
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue';

const props = defineProps<{ payment: { id: string }; onExpand: () => void }>();
defineEmits<{ (e: 'expand'): void }>();

function copyId() {
  if (typeof window !== 'undefined') {
    window.navigator?.clipboard?.writeText(props.payment.id);
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost">Actions</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="$emit('expand')">Toggle details</DropdownMenuItem>
      <DropdownMenuItem @click="copyId">Copy ID</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
