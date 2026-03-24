import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'web-components-stencil',
  globalStyle: 'src/global/tokens.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [{ src: 'global/tokens.css', dest: 'tokens.css' }],
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [{ src: 'global/tokens.css', dest: 'tokens.css' }],
    },
  ],
};
