import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useForumStore = defineStore('forum', () => {
  const author = ref('Guest');
  return { author };
});
