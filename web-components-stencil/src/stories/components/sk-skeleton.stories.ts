import type { Meta, StoryObj } from '@storybook/web-components';

import { storyGrid, storyPage, storySection, storyStack } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Skeleton',
  component: 'sk-skeleton',
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
        'Grid Variant',
        storyGrid(
          4,
          '<sk-skeleton variant="grid"></sk-skeleton>',
          '<sk-skeleton variant="grid"></sk-skeleton>',
          '<sk-skeleton variant="grid"></sk-skeleton>',
          '<sk-skeleton variant="grid"></sk-skeleton>',
        ),
      ),
      storySection(
        'List Variant',
        storyStack('<sk-skeleton variant="list"></sk-skeleton>', '<sk-skeleton variant="list"></sk-skeleton>', '<sk-skeleton variant="list"></sk-skeleton>'),
      ),
      storySection('Text Block Variant', '<sk-skeleton variant="text-block"></sk-skeleton>'),
    ),
};
