import type { Preview } from '@storybook/web-components';

import '../src/global/tokens.css';
import './storybook.css';

import { defineCustomElement as defineSkBadge } from '../dist/components/sk-badge';
import { defineCustomElement as defineSkButton } from '../dist/components/sk-button';
import { defineCustomElement as defineSkCaption } from '../dist/components/sk-caption';
import { defineCustomElement as defineSkCard } from '../dist/components/sk-card';
import { defineCustomElement as defineSkDrawer } from '../dist/components/sk-drawer';
import { defineCustomElement as defineSkHeading } from '../dist/components/sk-heading';
import { defineCustomElement as defineSkIcon } from '../dist/components/sk-icon';
import { defineCustomElement as defineSkInput } from '../dist/components/sk-input';
import { defineCustomElement as defineSkLoading } from '../dist/components/sk-loading';
import { defineCustomElement as defineSkRecordCard } from '../dist/components/sk-record-card';
import { defineCustomElement as defineSkSelect } from '../dist/components/sk-select';
import { defineCustomElement as defineSkSkeleton } from '../dist/components/sk-skeleton';
import { defineCustomElement as defineSkText } from '../dist/components/sk-text';
import { defineCustomElement as defineSkToggle } from '../dist/components/sk-toggle';

const registerElement = (tagName: string, defineElement: () => void) => {
  if (!customElements.get(tagName)) {
    defineElement();
  }
};

registerElement('sk-badge', defineSkBadge);
registerElement('sk-button', defineSkButton);
registerElement('sk-caption', defineSkCaption);
registerElement('sk-card', defineSkCard);
registerElement('sk-drawer', defineSkDrawer);
registerElement('sk-heading', defineSkHeading);
registerElement('sk-icon', defineSkIcon);
registerElement('sk-input', defineSkInput);
registerElement('sk-loading', defineSkLoading);
registerElement('sk-record-card', defineSkRecordCard);
registerElement('sk-select', defineSkSelect);
registerElement('sk-skeleton', defineSkSkeleton);
registerElement('sk-text', defineSkText);
registerElement('sk-toggle', defineSkToggle);

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
