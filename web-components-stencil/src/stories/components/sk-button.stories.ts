import type { Meta, StoryObj } from '@storybook/web-components';

import { storyPage, storyRow, storySection } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Button',
  component: 'sk-button',
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
        'Variants',
        storyRow(
          '<sk-button variant="primary" size="sm">Primary</sk-button>',
          '<sk-button variant="secondary" size="md">Secondary</sk-button>',
          '<sk-button variant="secondary" size="md" loading>Loading</sk-button>',
          '<sk-button variant="destructive" size="lg" disabled>Disabled</sk-button>',
          '<sk-button variant="ghost" size="lg">Ghost</sk-button>',
        ),
      ),
      storySection(
        'Icon Only',
        storyRow(
          '<sk-button size="lg" iconOnly aria-label="Add"><sk-icon name="plus" aria-label="Add"></sk-icon></sk-button>',
          '<sk-button variant="ghost" size="lg" iconOnly aria-label="Search"><sk-icon name="search" aria-label="Search"></sk-icon></sk-button>',
        ),
      ),
    ),
};
