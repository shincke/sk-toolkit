import type { StorybookConfig } from '@storybook/web-components-vite';

const normalizeBasePath = (value?: string) => {
  const trimmed = value?.trim();

  if (!trimmed || trimmed === '/') {
    return '/';
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
};

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    config.base = normalizeBasePath(process.env.PAGES_BASE_PATH);

    return config;
  },
};

export default config;
