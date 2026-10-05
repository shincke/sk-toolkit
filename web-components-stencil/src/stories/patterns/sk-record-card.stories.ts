import type { Meta, StoryObj } from '@storybook/web-components';

import { storyGrid, storyPage, storySection, storyStack } from '../storybook-helpers';

const meta: Meta = {
  title: 'Patterns/Record Card',
  component: 'sk-record-card',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

export const List: Story = {
  render: () =>
    storyPage(
      storySection(
        'List Variant',
        storyStack(
          '<sk-record-card variant="list" title="Watering a Flower" artist="Haruomi Hosono" price="32" label="LP" condition="VG+" image-alt="Album artwork"></sk-record-card>',
          '<sk-record-card variant="list" title="Through the Looking Glass" artist="Midori Takada" price="28" label="LP" condition="NM" image-alt="Album artwork"></sk-record-card>',
          '<sk-record-card variant="list" title="Technodelic" artist="Yellow Magic Orchestra" price="45" label="LP" condition="VG" image-alt="Album artwork"></sk-record-card>',
        ),
      ),
    ),
};

export const Grid: Story = {
  render: () =>
    storyPage(
      storySection(
        'Grid Variant',
        storyGrid(
          4,
          '<sk-record-card variant="grid" title="Watering a Flower" artist="Haruomi Hosono" price="32" label="LP" year="1984" condition="VG+"></sk-record-card>',
          '<sk-record-card variant="grid" title="Through the Looking Glass" artist="Midori Takada" price="28" label="LP" year="1983" condition="NM"></sk-record-card>',
          '<sk-record-card variant="grid" title="Technodelic" artist="Yellow Magic Orchestra" price="45" label="LP" year="1981" condition="VG"></sk-record-card>',
          '<sk-record-card variant="grid" title="B-2 Unit" artist="Ryuichi Sakamoto" price="38" label="LP" year="1980" condition="Rare"></sk-record-card>',
        ),
      ),
    ),
};

export const Detail: Story = {
  render: () =>
    storyPage(
      storySection(
        'Detail Variant',
        '<sk-record-card variant="detail" title="Watering a Flower" artist="Haruomi Hosono" price="32" label="LP" year="1984" condition="VG+" genre="Ambient, Electronic, Japanese"></sk-record-card>',
      ),
    ),
};
