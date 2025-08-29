import { createApp } from 'vue';

import { VueQueryPlugin } from '@tanstack/vue-query';

import queryClient from '@/lib/query-client';
import router from '@/router';
import pinia from '@/stores';

import App from './App.vue';
import { i18n } from './i18n';
import './assets/tailwind.css';

const app = createApp(App);

app.use(VueQueryPlugin, { queryClient });
app.use(router);
app.use(pinia);
app.use(i18n);
app.mount('#app');

// Eagerly seed forum demo data in dev if storage is empty or unavailable.
// This is non-blocking and best-effort.
if (import.meta.env.DEV) {
	(async () => {
		try {
				const { fetchThreads, resetForum } = await import('@/features/forum/api/forum.api');
				let threads = await fetchThreads();
				if (!threads || threads.length === 0) {
					await resetForum();
					threads = await fetchThreads();
				}
				// Seed cache so UI shows immediately
				const { default: qc } = await import('@/lib/query-client');
				qc.setQueryData(['threads'], threads);
		} catch {
			try {
				const { resetForum } = await import('@/features/forum/api/forum.api');
				await resetForum();
			} catch {
				// ignore
			}
		}
	})();
}
