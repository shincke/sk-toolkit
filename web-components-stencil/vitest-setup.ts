import { beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./dist/web-components-stencil/web-components-stencil.esm.js');
});

export {};
