# Vue 3 Template — Vite + TypeScript + shadcn-vue + TanStack Query

This guide sets up a modern Vue 3 template that follows best practices and includes:

- Vite + TypeScript
- Tailwind CSS + shadcn-vue components
- TanStack Query (Vue Query) + Devtools
- ESLint + Prettier + Vitest (optional but recommended)

Works on Windows PowerShell (commands below use npm; pnpm/yarn equivalents included where helpful).

---

## Prerequisites

- Node.js 18+ (recommend latest LTS)
- npm 9+ (or pnpm/yarn)

Optional but useful:

- VS Code with Volar, ESLint, Tailwind CSS IntelliSense extensions

---

## 1) Create a new Vue project (Vite + TypeScript)

PowerShell (in the parent directory where you want the project folder):

```powershell
npm create vue@latest my-app
```

Choose:

- TypeScript: Yes
- JSX Support: No (or Yes if you need it)
- Vue Router: Yes (recommended)
- Pinia: Yes (recommended for global UI state; server state handled by Vue Query)
- Vitest: Yes (recommended)
- Cypress: Optional
- ESLint: Yes
- Prettier: Yes

Then:

```powershell
cd my-app
npm install
```

> pnpm: `pnpm install` | yarn: `yarn`

---

## 2) Tailwind CSS setup (v4)

Tailwind v4 uses zero-config by default. Install:

```powershell
npm install -D tailwindcss tailwindcss-animate
```

Create `src/assets/tailwind.css` with:

```css
@import "tailwindcss";
/* Optional Tailwind plugin via CSS */
@plugin "tailwindcss-animate";
```

Import it in `src/main.ts`:

```ts
import "./assets/tailwind.css";
```

---

## 3) Install and initialize shadcn-vue

Install the CLI and init:

```powershell
npx shadcn-vue@latest init
```

When prompted, prefer:

- TypeScript: Yes
- Tailwind config path: `tailwind.config.js`
- Components path: `src/components/ui`
- Aliases: accept defaults or set `@/` to `src/`

Add your first components (example):

```powershell
npx shadcn-vue@latest add button card input dialog dropdown-menu tabs toast tooltip
```

This will generate ready-to-use, Tailwind-powered UI components under `src/components/ui`.

Docs: https://www.shadcn-vue.com/

---

## 4) Install TanStack Query (Vue Query)

```powershell
npm install @tanstack/vue-query
npm install -D @tanstack/vue-query-devtools
```

Wire it up in `src/main.ts`:

```ts
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";

import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

const app = createApp(App);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

app.use(VueQueryPlugin, { queryClient });
app.mount("#app");
```

Use devtools in `App.vue` (development only):

```vue
<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const isDev = import.meta.env.DEV;
const Devtools = isDev
  ? defineAsyncComponent(() =>
      import("@tanstack/vue-query-devtools").then((m) => m.VueQueryDevtools)
    )
  : null;
</script>

<template>
  <RouterView />
  <component v-if="Devtools" :is="Devtools" />
</template>
```

Docs: https://tanstack.com/query/latest/docs/vue/overview

---

## 5) Recommended project structure

```
src/
  app/
    providers/        # app-wide plugin/providers registration
    router/           # vue-router config
    stores/           # pinia stores (for client UI state)
  components/
    ui/               # shadcn-vue generated components
    common/           # shared presentational components
  features/
    <feature-name>/
      components/
      pages/
      api/            # request fns + types
      hooks/          # composables (useXyz.ts) wrapping Vue Query
  lib/
    http/             # fetch/axios client, interceptors
    utils/            # small helpers (cn, formatters)
    types/            # global types
```

Notes:

- Group by feature; co-locate pages, components, and data hooks.
- Keep global state (Pinia) small. Use Vue Query for server state.
- Prefer composables like `useUserQuery()`, `useUpdateUserMutation()` per feature.

---

## 6) Example: a typed query composable + UI

`src/features/todos/api/getTodo.ts`

```ts
export type Todo = { id: number; title: string; completed: boolean };

export async function getTodo(id: number): Promise<Todo> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json() as Promise<Todo>;
}
```

`src/features/todos/hooks/useTodoQuery.ts`

```ts
import { useQuery } from "@tanstack/vue-query";
import { getTodo } from "../api/getTodo";

export function useTodoQuery(id: number) {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => getTodo(id),
    staleTime: 60_000,
  });
}
```

`src/features/todos/components/TodoCard.vue`

```vue
<script setup lang="ts">
import { computed, ref } from "vue";
import { useTodoQuery } from "../hooks/useTodoQuery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const id = ref(1);
const { data, isLoading, isError, refetch } = useTodoQuery(id.value);
const todo = computed(() => data?.value);
</script>

<template>
  <Card class="max-w-md">
    <CardHeader>
      <CardTitle>Todo {{ id }}</CardTitle>
    </CardHeader>
    <CardContent>
      <div v-if="isLoading">Loading…</div>
      <div v-else-if="isError">Something went wrong.</div>
      <div v-else>
        <p class="font-medium">{{ todo?.title }}</p>
        <p class="text-sm text-muted-foreground">
          Completed: {{ todo?.completed }}
        </p>
      </div>
      <div class="mt-4 flex gap-2">
        <Button @click="refetch()">Refetch</Button>
        <Button variant="secondary" @click="id++">Next</Button>
      </div>
    </CardContent>
  </Card>
</template>
```

---

## 7) Linting, formatting, and scripts

If you selected ESLint + Prettier in create-vue, you already have the basics.
Add helpful scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "typecheck": "vue-tsc --noEmit -p tsconfig.app.json",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest"
  }
}
```

Recommended ESLint plugins/configs if you want stricter rules:

- `@vue/eslint-config-typescript`, `@vue/eslint-config-prettier`
- `eslint-plugin-import`, `eslint-plugin-unicorn`

### ESLint + Prettier setup (add/verify)

Install dependencies:

```powershell
npm install -D eslint prettier eslint-plugin-vue @vue/eslint-config-typescript @vue/eslint-config-prettier eslint-plugin-import eslint-plugin-unicorn
```

Create or update `eslint.config.js` (flat config) or `.eslintrc.cjs`. Example flat config:

```js
// eslint.config.js
// Flat config recommended by ESLint; compatible with Vue 3 + TS
import js from "@eslint/js";
import ts from "typescript-eslint";
import vue from "eslint-plugin-vue";
// Using @vue/eslint-config-prettier instead of eslint-plugin-prettier

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs["flat/essential"],
  // Tailwind ESLint plugin removed for Tailwind v4
  {
    files: ["**/*.{ts,tsx,vue}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "prettier/prettier": "warn",
      "import/order": ["warn", { "newlines-between": "always" }],
      "unicorn/filename-case": [
        "warn",
        { cases: { kebabCase: true, pascalCase: true } },
      ],
    },
  },
  // Prettier handled by @vue/eslint-config-prettier
];
```

Prettier config (optional):

```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

VS Code settings (optional) in `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "css.validate": false,
  "tailwindCSS.emmetCompletions": true,
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[""'`]([^""'`]*).*?[""'`]"]
  ]
}
```

---

## 8) Dev UX tips

- Use `darkMode: 'class'` and control theme with an app-level toggle that sets `document.documentElement.classList.toggle('dark')`.
- Prefer `cn()` utility (class merge) when composing Tailwind classes; many shadcn-vue templates include one. If not, add `clsx` and `tailwind-merge`.
- Keep server state in Vue Query; use Pinia for UI preferences and non-server data.
- Add `@tanstack/vue-query-devtools` only in development.

---

## 9) Run it

```powershell
npm run dev
```

Open http://localhost:5173

---

## 10) Optional: PNPM commands

If you prefer pnpm:

```powershell
pnpm create vue@latest my-app
cd my-app
pnpm install
pnpm dlx shadcn-vue@latest init
pnpm dlx shadcn-vue@latest add button
pnpm add @tanstack/vue-query
pnpm add -D @tanstack/vue-query-devtools tailwindcss postcss autoprefixer tailwindcss-animate
```

---

## Best practices checklist

- [ ] Feature-first folders; keep code close to where it’s used
- [ ] Composables wrap Vue Query per feature (useXyzQuery/useXyzMutation)
- [ ] Minimal global state; prefer server state in Vue Query
- [ ] Strict TypeScript; enable `noUncheckedIndexedAccess` if possible
- [ ] ESLint + Prettier enforced via CI
- [ ] Unit tests for critical logic; component tests for complex UIs
- [ ] Accessible UI: follow shadcn-vue and Radix guidance
- [ ] Performance: code-split routes, lazy-load heavy features

---

Need this scaffold auto-generated here? Ask and I can initialize the project in this folder for you.
