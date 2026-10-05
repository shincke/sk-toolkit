import type { Meta, StoryObj } from '@storybook/web-components';

import { storyGrid, storyPage, storySection } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Input',
  component: 'sk-input',
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
          '<sk-input label="Username" placeholder="Enter username"></sk-input>',
          '<sk-input type="email" label="Email" placeholder="you@example.com" hint="We\'ll never share your email"></sk-input>',
          '<sk-input type="password" label="Password" placeholder="Enter password"></sk-input>',
          '<sk-input type="password" label="Password" value="password123" error="Passwords must be at least 8 characters"></sk-input>',
          '<sk-input label="Disabled" value="Cannot edit" disabled></sk-input>',
          '<sk-input type="number" label="Age" placeholder="Enter your age"></sk-input>',
        ),
      ),
    ),
};
