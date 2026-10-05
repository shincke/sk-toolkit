import type { Meta, StoryObj } from '@storybook/web-components';

import { storyPage, storyStack, storySection } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Heading',
  component: 'sk-heading',
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
        'Scales',
        storyStack(
          '<sk-heading size="display">形態</sk-heading>',
          '<sk-heading size="lg">Graphic Form</sk-heading>',
          '<sk-heading size="md">Spatial Memory</sk-heading>',
          '<sk-heading size="sm">Geometric Reduction</sk-heading>',
        ),
      ),
    ),
};
