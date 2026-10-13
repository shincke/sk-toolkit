import type { Preview } from '@storybook/web-components';

import '../src/global/tokens.css';
import './storybook.css';

import { defineCustomElements } from '../loader';

defineCustomElements(window);

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: {
      expanded: true,
    },
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: '#C0E4F4' },
        { name: 'Dark', value: '#1A0848' },
      ],
    },
  },
  decorators: [
    (story, context) => {
      const selectedBackground = String(context.globals.backgrounds?.value ?? '#C0E4F4').toLowerCase();
      const isDark = selectedBackground === '#1a0848';
      const colorScheme = isDark ? 'dark' : 'light';

      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.classList.toggle('light', !isDark);
      document.body.classList.toggle('dark', isDark);
      document.body.classList.toggle('light', !isDark);
      document.documentElement.style.colorScheme = colorScheme;
      document.body.style.colorScheme = colorScheme;

      return story();
    },
  ],
};

export default preview;
