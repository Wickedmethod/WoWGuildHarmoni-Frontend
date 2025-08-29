import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import es from './locales/es.json';
import da from './locales/da.json';

export type AppLocale = 'en' | 'es' | 'da';

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: (localStorage.getItem('locale') as AppLocale) || 'en',
  fallbackLocale: 'en',
  messages: { en, es, da },
});

export function setLocale(locale: AppLocale) {
  localStorage.setItem('locale', locale);
  i18n.global.locale.value = locale;
}
