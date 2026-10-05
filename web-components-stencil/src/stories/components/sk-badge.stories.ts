import type { Meta, StoryObj } from '@storybook/web-components';

import { storyPage, storyRow, storySection } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Badge',
  component: 'sk-badge',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () =>
    storyPage(
      storySection(
        'Status',
        storyRow(
          '<sk-badge variant="status" color="success" label="Published"></sk-badge>',
          '<sk-badge variant="status" color="warning" label="Draft"></sk-badge>',
          '<sk-badge variant="status" color="secondary" label="Archived"></sk-badge>',
          '<sk-badge variant="status" color="accent" label="Featured"></sk-badge>',
          '<sk-badge variant="status" color="error" label="Error"></sk-badge>',
        ),
      ),
      storySection(
        'Filled',
        storyRow(
          '<sk-badge variant="filled" color="success" label="Published"></sk-badge>',
          '<sk-badge variant="filled" color="warning" label="Draft"></sk-badge>',
          '<sk-badge variant="filled" color="secondary" label="Archived"></sk-badge>',
          '<sk-badge variant="filled" color="accent" label="Featured"></sk-badge>',
          '<sk-badge variant="filled" color="error" label="Error"></sk-badge>',
        ),
      ),
      storySection(
        'Category',
        storyRow(
          '<sk-badge variant="category" color="default" label="Research"></sk-badge>',
          '<sk-badge variant="category" color="default" label="Archive"></sk-badge>',
          '<sk-badge variant="category" color="default" label="Typography"></sk-badge>',
          '<sk-badge variant="category" color="default" label="Editorial"></sk-badge>',
        ),
      ),
      storySection(
        'AI Chip',
        storyRow(
          '<sk-badge variant="ai-chip" color="default" label="Something atmospheric"></sk-badge>',
          '<sk-badge variant="ai-chip" color="default" label="Japanese ambient 1980s"></sk-badge>',
          '<sk-badge variant="ai-chip" color="default" label="Similar to Aphex Twin"></sk-badge>',
        ),
      ),
    ),
};
