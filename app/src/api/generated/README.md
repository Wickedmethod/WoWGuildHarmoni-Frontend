# Generated API client

- Output: src/api/generated/index.ts (modular exports)
- Generator: swagger-typescript-api

Usage example:

```ts
import { Api } from '@/api/generated';
const api = new Api({ baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000' });
const res = await api.users.getUsers();
```
