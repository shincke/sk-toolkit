import type { Meta, StoryObj } from '@storybook/web-components';

import { storyPage, storySection } from '../storybook-helpers';

const meta: Meta = {
  title: 'Components/Drawer',
  component: 'sk-drawer',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj;

const selectionItems = `
  <div class="story-stack">
    <sk-record-card variant="list" title="Watering a Flower" artist="Haruomi Hosono" price="32" label="LP" condition="VG+" image-alt="Album artwork"></sk-record-card>
    <sk-record-card variant="list" title="Through the Looking Glass" artist="Midori Takada" price="28" label="LP" condition="NM" image-alt="Album artwork"></sk-record-card>
  </div>
`;

const drawerFooter = `
  <div slot="footer" class="story-stack">
    <div class="story-row" style="justify-content: space-between;">
      <sk-caption>Total</sk-caption>
      <sk-caption>$60</sk-caption>
    </div>
    <sk-button variant="primary" full-width>Checkout</sk-button>
  </div>
`;

export const Selection: Story = {
  render: () =>
    storyPage(
      storySection(
        'Selection Drawer',
        `<div class="story-panel" style="min-height: 680px;">` +
          `<sk-drawer open id="selection-drawer-story" title="Selection - 2" type="selection">${selectionItems}${drawerFooter}</sk-drawer>` +
          `</div>`,
      ),
    ),
};

export const MobileSelection: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () =>
    storyPage(
      storySection(
        'Mobile Drawer',
        `<div class="story-panel" style="min-height: 680px;">` +
          `<sk-drawer open id="mobile-drawer-story" title="Selection - 2" type="selection" is-mobile>${selectionItems}${drawerFooter}</sk-drawer>` +
          `</div>`,
      ),
    ),
};
