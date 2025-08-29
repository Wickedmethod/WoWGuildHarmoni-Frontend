import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useProjectsStore = defineStore('projects', () => {
  const selectedId = ref<string | null>(null);

  function select(id: string | null) {
    selectedId.value = id;
  }

  return { selectedId, select };
});
