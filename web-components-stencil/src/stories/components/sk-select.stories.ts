import type { Meta, StoryObj } from '@storybook/web-components';

import { storyGrid, storyPage, storySection } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Select',
  component: 'sk-select',
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
        storyGrid(
          2,
          '<sk-select label="City" placeholder="Select city..." options="["Tokyo","Osaka","Kyoto","Sapporo"]"></sk-select>',
          '<sk-select label="City" placeholder="Select city..." options="["Tokyo","Osaka","Kyoto","Sapporo"]" disabled></sk-select>',
        ),
      ),
    ),
};
