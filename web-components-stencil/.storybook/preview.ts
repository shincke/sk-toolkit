import type { Preview } from '@storybook/web-components';

import '../src/global/tokens.css';
import './storybook.css';
import '../dist/web-components-stencil/web-components-stencil.esm.js';

// Import the generated Stencil runtime bundle once so Storybook gets the same
// browser-ready custom element registration that the library ships in `dist/`.
// This repo's generated loader currently points at a missing `dist/esm` path,
// so importing the emitted ESM runtime directly is the most reliable dev flow.

const storybookThemes = {
  light: { name: 'Light', value: 'light' },
  dark: { name: 'Dark', value: 'dark' },
} as const;

const applyTheme = (theme: keyof typeof storybookThemes) => {
  const isDark = theme === 'dark';

  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.classList.toggle('light', !isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

  document.body.classList.toggle('dark', isDark);
  document.body.classList.toggle('light', !isDark);
  document.body.style.colorScheme = isDark ? 'dark' : 'light';
};

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: {
      expanded: true,
    },
    // Storybook background values are intentionally token-based instead of hardcoded
    // hex colors. The actual visual colors come from the design tokens in
    // `src/global/tokens.css` and the `.dark` / `.light` theme classes.
    backgrounds: {
      default: storybookThemes.light.name,
      values: Object.values(storybookThemes),
    },
  },
  decorators: [
    (story, context) => {
      const selectedTheme = String(context.globals.backgrounds?.value ?? storybookThemes.light.value);
      const resolvedTheme = selectedTheme === storybookThemes.dark.value ? 'dark' : 'light';

      applyTheme(resolvedTheme);

      return story();
    },
  ],
};

export default preview;
