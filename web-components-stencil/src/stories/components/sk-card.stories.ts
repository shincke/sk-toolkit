import type { Meta, StoryObj } from '@storybook/web-components';

import { storyGrid, storyPage, storySection } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Card',
  component: 'sk-card',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

const cardBody = '<sk-text size="md">How bold geometric reduction in postwar Japanese poster design encodes cultural memory and political meaning through shape alone.</sk-text>';
const cardFooter = '<sk-caption slot="footer-start">Kamekura, Y. - 12 min</sk-caption><sk-button slot="footer-end" variant="ghost" size="sm">Read →</sk-button>';

export const Overview: Story = {
  render: () =>
    storyPage(
      storySection(
        'Variants',
        storyGrid(
          3,
          `<sk-card variant="default" title="Graphic Form and Spatial Memory" subtitle="Research · 2024">${cardBody}${cardFooter}</sk-card>`,
          `<sk-card variant="image" title="Graphic Form and Spatial Memory" subtitle="Research · 2024" image-alt="Abstract waterside gate illustration">${cardBody}${cardFooter}</sk-card>`,
          `<sk-card variant="selected" title="Graphic Form and Spatial Memory" subtitle="Research · 2024" selected>${cardBody}${cardFooter}</sk-card>`,
        ),
      ),
    ),
};
