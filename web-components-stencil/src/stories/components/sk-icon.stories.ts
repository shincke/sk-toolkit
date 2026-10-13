import type { Meta, StoryObj } from '@storybook/web-components';

import { storyGrid, storyPage, storyPanel, storySection } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Icon',
  component: 'sk-icon',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

const iconTile = (icon: string, label: string) =>
  storyPanel(`
    <div style="display: grid; gap: 8px; justify-items: center; text-align: center;">
      ${icon}
      <sk-caption>${label}</sk-caption>
    </div>
  `);

export const Overview: Story = {
  render: () =>
    storyPage(
      storySection(
        'Library',
        storyGrid(
          4,
          iconTile('<sk-icon name="arrow" size="24" aria-label="Arrow"></sk-icon>', 'Arrow'),
          iconTile('<sk-icon name="plus" size="24" aria-label="Add"></sk-icon>', 'Plus'),
          iconTile('<sk-icon name="close" size="24" aria-label="Close"></sk-icon>', 'Close'),
          iconTile('<sk-icon name="menu" size="24" aria-label="Menu"></sk-icon>', 'Menu'),
          iconTile('<sk-icon name="search" size="24" aria-label="Search"></sk-icon>', 'Search'),
          iconTile('<sk-icon name="chevron" size="24" dir="down" aria-label="Chevron down"></sk-icon>', 'Chevron Down'),
          iconTile('<sk-icon name="chevron" size="24" dir="up" aria-label="Chevron up"></sk-icon>', 'Chevron Up'),
          iconTile('<sk-icon name="check" size="24" aria-label="Check"></sk-icon>', 'Check'),
          iconTile('<sk-icon name="external" size="24" aria-label="External"></sk-icon>', 'External'),
          iconTile('<sk-icon name="moon" size="24" aria-label="Moon"></sk-icon>', 'Moon'),
          iconTile('<sk-icon name="sun" size="24" aria-label="Sun"></sk-icon>', 'Sun'),
          iconTile('<sk-icon name="mail" size="24" aria-label="Mail"></sk-icon>', 'Mail'),
          iconTile('<sk-icon name="github" size="24" aria-label="GitHub"></sk-icon>', 'GitHub'),
          iconTile('<sk-icon name="instagram" size="24" aria-label="Instagram"></sk-icon>', 'Instagram'),
        ),
      ),
    ),
};
