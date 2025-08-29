// Generate TypeScript types and a typed client from an OpenAPI/Swagger JSON URL
// Usage (PowerShell):
//   $env:OPENAPI_URL='http://localhost:4000/swagger.json'; npm run api:gen

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateApi } from 'swagger-typescript-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src');
const OUT_DIR = path.join(SRC_DIR, 'api', 'generated');
const TYPES_FILE = path.join(OUT_DIR, 'index.ts');

const argUrl = process.argv.find((a) => a.startsWith('--url='))?.split('=')[1];
const OPENAPI_URL = argUrl || process.env.OPENAPI_URL || 'http://localhost:4000/swagger.json';

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function generateClientFromUrl(url) {
  await generateApi({
    url,
    output: OUT_DIR,
    name: 'index.ts',
    httpClientType: 'fetch',
    modular: true,
    prettier: { printWidth: 100 },
  });
}

async function writeClientReadme() {
  const readme = `# Generated API client\n\n- Output: src/api/generated/index.ts (modular exports)\n- Generator: swagger-typescript-api\n\nUsage example:\n\n\`\`\`ts
import { Api } from '@/api/generated';
const api = new Api({ baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000' });
const res = await api.users.getUsers();
\`\`\`
`;
  await fs.writeFile(path.join(OUT_DIR, 'README.md'), readme, 'utf8');
}

async function main() {
  console.log(`[openapi] Generating from: ${OPENAPI_URL}`);
  await ensureDir(OUT_DIR);
  await generateClientFromUrl(OPENAPI_URL);
  console.log(`[openapi] Generated: ${path.relative(ROOT, TYPES_FILE)}`);
  await writeClientReadme();
  console.log(`[openapi] Done.`);
}

main().catch((err) => {
  console.error('[openapi] Error:', err?.message || err);
  process.exit(1);
});
