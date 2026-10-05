import '../src/global/tokens.css';
import './storybook.css';

import { defineCustomElements } from '../loader';

defineCustomElements(window);

export const parameters = {
  layout: 'padded',
  controls: {
    expanded: true,
  },
};
