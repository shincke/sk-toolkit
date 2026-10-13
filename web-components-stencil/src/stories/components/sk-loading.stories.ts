import type { Meta, StoryObj } from '@storybook/web-components';

import { storyPage, storyRow, storySection } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Loading',
  component: 'sk-loading',
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
        'Sizes',
        storyRow(
          '<sk-loading size="14" label="14px"></sk-loading>',
          '<sk-loading size="20" label="20px"></sk-loading>',
          '<sk-loading size="28" label="28px"></sk-loading>',
          '<sk-loading size="40" label="40px"></sk-loading>',
        ),
      ),
      storySection('Loading State', '<sk-loading size="28" label="Loading records..."></sk-loading>'),
    ),
};
