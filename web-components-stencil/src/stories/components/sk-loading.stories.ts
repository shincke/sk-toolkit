import type { Meta, StoryObj } from '@storybook/web-components';

import { storyPage, storyRow, storySection } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Loading',
  component: 'sk-spinner',
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
          '<sk-spinner size="14" label="14px"></sk-spinner>',
          '<sk-spinner size="20" label="20px"></sk-spinner>',
          '<sk-spinner size="28" label="28px"></sk-spinner>',
          '<sk-spinner size="40" label="40px"></sk-spinner>',
        ),
      ),
      storySection('Loading State', '<sk-spinner size="28" label="Loading records..."></sk-spinner>'),
    ),
};
