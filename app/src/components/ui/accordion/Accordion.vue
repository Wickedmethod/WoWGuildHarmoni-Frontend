<script setup lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui';
import { AccordionRoot, useForwardPropsEmits } from 'reka-ui';

// Default to single + collapsible so the open item can be toggled closed
const props = withDefaults(defineProps<AccordionRootProps>(), {
  type: 'single',
  collapsible: true,
});

const emits = defineEmits<AccordionRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AccordionRoot data-slot="accordion" v-bind="forwarded">
    <slot />
  </AccordionRoot>
</template>
