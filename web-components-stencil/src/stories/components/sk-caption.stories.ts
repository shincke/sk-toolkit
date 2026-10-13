import type { Meta, StoryObj } from '@storybook/web-components';

import { storyGrid, storyPage, storyPanel, storySection } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Caption',
  component: 'sk-caption',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () =>
    storyPage(
      storySection(
        'Alignment',
        storyGrid(2, storyPanel('<sk-caption>Left aligned caption</sk-caption>'), storyPanel('<sk-caption align="center">Center aligned caption</sk-caption>')),
      ),
    ),
};
