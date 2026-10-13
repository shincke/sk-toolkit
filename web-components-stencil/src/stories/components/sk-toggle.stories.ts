import type { Meta, StoryObj } from '@storybook/web-components';

import { storyPage, storyRow, storySection } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Toggle',
  component: 'sk-toggle',
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
        'States',
        storyRow('<sk-toggle label="Theme mode"></sk-toggle>', '<sk-toggle checked label="Dark mode"></sk-toggle>', '<sk-toggle disabled label="Disabled"></sk-toggle>'),
      ),
    ),
};
