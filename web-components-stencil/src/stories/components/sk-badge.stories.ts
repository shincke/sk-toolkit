import type { Meta, StoryObj } from '@storybook/web-components';

import { BADGE_COLOR_DEFAULT, BADGE_VARIANT_DEFAULT, type BadgeColor, type BadgeVariant } from '../../components/sk-badge/sk-badge.types';
import { docsPageTemplate, storyStage } from '../storybook-helpers';

const variantOptions: BadgeVariant[] = ['status', 'filled', 'category'];
const colorOptions: BadgeColor[] = ['success', 'warning', 'error', 'accent', 'secondary', 'default'];

type BadgeStoryArgs = {
  label: string;
  slotText: string;
  variant: BadgeVariant;
  color: BadgeColor;
  size: 'sm' | 'md' | 'lg';
  skClick?: never;
  defaultSlot?: never;
};

const buildBadgeMarkup = (args: BadgeStoryArgs) => {
  const attributes = [`variant="${args.variant}"`, `color="${args.color}"`, `size="${args.size}"`, args.label ? `label="${args.label}"` : ''].filter(Boolean);

  const content = args.label ? '' : args.slotText;

  return `<sk-badge ${attributes.join(' ')}>${content}</sk-badge>`;
};

const renderBadge = (args: BadgeStoryArgs) => {
  return storyStage(buildBadgeMarkup(args), 'story-stage-clean story-stage-centered');
};

const defaultArgs: BadgeStoryArgs = {
  label: 'Published',
  slotText: 'Published',
  variant: BADGE_VARIANT_DEFAULT,
  color: 'success',
  size: 'sm',
};

const meta: Meta<BadgeStoryArgs> = {
  title: 'Components/Badge',
  component: 'sk-badge',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    actions: {
      handles: ['skClick'],
    },
    docs: {
      page: docsPageTemplate,
      description: {
        component: `sk-badge displays short status labels, category chips, and metadata tags.
## API
Use the controls below to explore the badge variants, sizes, colors, and text content. Clear the label control to preview slot-based content.
        `,
      },
    },
  },
  args: defaultArgs,
  argTypes: {
    label: {
      control: 'text',
      description: 'Text rendered through the `label` prop. When this is empty, the default slot content is shown instead.',
      table: {
        category: 'Props',
      },
    },
    slotText: {
      control: 'text',
      description: 'Fallback text rendered in the default slot when `label` is empty.',
      table: {
        category: 'Story Controls',
      },
    },
    variant: {
      control: 'select',
      options: variantOptions,
      description: 'Visual style of the badge.',
      table: {
        category: 'Props',
        defaultValue: { summary: BADGE_VARIANT_DEFAULT },
      },
    },
    color: {
      control: 'select',
      options: colorOptions,
      description: 'Semantic color treatment applied to the badge, unless the variant is interactive category.',
      table: {
        category: 'Props',
        defaultValue: { summary: BADGE_COLOR_DEFAULT },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size. Defaults to `sm`.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'sm' },
      },
    },
    skClick: {
      name: 'skClick',
      description: 'Emitted when the user clicks a category badge.',
      control: false,
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<MouseEvent>' },
      },
    },
    defaultSlot: {
      name: 'default',
      description: 'Badge text content used when the `label` prop is not provided.',
      control: false,
      table: {
        category: 'Slots',
        type: { summary: 'text' },
      },
    },
  },
  render: renderBadge,
};

export default meta;

type Story = StoryObj<BadgeStoryArgs>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: buildBadgeMarkup(defaultArgs),
      },
    },
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    color: 'success',
    size: 'sm',
    label: 'Published',
    slotText: 'Published',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'Filled badges increase emphasis by using a solid background color.',
      },
      source: {
        code: buildBadgeMarkup({
          ...defaultArgs,
          variant: 'filled',
          color: 'success',
          size: 'sm',
          label: 'Published',
          slotText: 'Published',
        }),
      },
    },
  },
};

export const Category: Story = {
  args: {
    variant: 'category',
    color: 'default',
    size: 'sm',
    label: 'Research',
    slotText: 'Research',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'Category badges are the only clickable variant and can be used for labels, groupings, and metadata.',
      },
      source: {
        code: buildBadgeMarkup({
          ...defaultArgs,
          variant: 'category',
          color: 'default',
          size: 'sm',
          label: 'Research',
          slotText: 'Research',
        }),
      },
    },
  },
};

export const WithSlotContent: Story = {
  args: {
    label: '',
    slotText: 'Archived',
    variant: 'status',
    color: 'secondary',
    size: 'sm',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'When `label` is empty, the badge renders its text from the default slot instead.',
      },
      source: {
        code: buildBadgeMarkup({
          ...defaultArgs,
          label: '',
          slotText: 'Archived',
          variant: 'status',
          color: 'secondary',
          size: 'sm',
        }),
      },
    },
  },
};
