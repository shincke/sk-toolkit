import type { Meta, StoryObj } from '@storybook/web-components';

import { storyPage, storyRow, storySection } from '../storybook-helpers';

// Docs and shared story configuration start here.
// -----------------------------------------------------------------------------
// The Meta block is used to attach a custom MDX docs page alongside a component’s list of stories.
// read more here: https://storybook.js.org/docs/api/doc-blocks/doc-block-meta
const meta: Meta = {
  title: 'Components/Spinner',
  component: 'sk-spinner',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `sk-spinner is used as a sign that something is loading or being processed on a page.
## API
Use the controls below to explore the spinner states, or open the stories further down this page for focused examples such as sizes, loading, and paused behavior.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () =>
    storyPage(
      storySection(
        'Sizes',
        storyRow(
          '<sk-spinner size="sm" label="14px"></sk-spinner>',
          '<sk-spinner size="md" label="20px"></sk-spinner>',
          '<sk-spinner size="lg" label="28px"></sk-spinner>',
          '<sk-spinner size="xl" label="40px"></sk-spinner>',
        ),
      ),
      storySection('Loading State', '<sk-spinner size="lg" label="Loading records..."></sk-spinner>'),
    ),
};
