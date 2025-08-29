import { ref, watchEffect, onMounted } from 'vue';
import { defineStore } from 'pinia';

import { setLocale } from '@/i18n';

export type Theme = 'light' | 'dark' | 'system';
export type Locale = 'en' | 'es' | 'da';

export const useUiStore = defineStore('ui', () => {
  const theme = ref<Theme>((localStorage.getItem('theme') as Theme) || 'system');
  const locale = ref<Locale>((localStorage.getItem('locale') as Locale) || 'en');

  const applyTheme = (value: Theme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const prefersDark =
      typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = value === 'dark' || (value === 'system' && prefersDark);
    root.classList.toggle('dark', isDark);
  };

  onMounted(() => {
    applyTheme(theme.value);
  });

  watchEffect(() => {
    localStorage.setItem('theme', theme.value);
    applyTheme(theme.value);
  });

  // Keep vue-i18n in sync with selected locale
  watchEffect(() => {
    setLocale(locale.value);
  });

  return { theme, locale, applyTheme };
});
