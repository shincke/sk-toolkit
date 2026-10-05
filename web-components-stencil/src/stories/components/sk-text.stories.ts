import type { Meta, StoryObj } from '@storybook/web-components';

import { storyPage, storySection, storyStack } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Text',
  component: 'sk-text',
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
          '<sk-text size="lg">The postwar Japanese graphic poster synthesized Western modernism with indigenous visual traditions to produce a singular and enduring aesthetic language.</sk-text>',
          '<sk-text size="md">Shigeo Fukuda\'s reductive compositions strip imagery to geometric essentials, allowing negative space to generate meaning as forcefully as positive form.</sk-text>',
          '<sk-text size="sm">Awazu\'s experimental collage work collapsed the distance between art, protest, and commercial design across three decades of radical practice.</sk-text>',
        ),
      ),
      storySection('Alignment', '<sk-text size="md" align="center">Center aligned body copy.</sk-text>'),
    ),
};
