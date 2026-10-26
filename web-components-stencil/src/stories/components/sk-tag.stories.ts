import type { Meta, StoryObj } from '@storybook/web-components';

import { TAG_COLOR_DEFAULT, TAG_VARIANT_DEFAULT, type TagColor, type TagVariant } from '../../components/sk-tag/sk-tag.types';
import { docsPageTemplate, storyStage } from '../storybook-helpers';

const variantOptions: TagVariant[] = ['status', 'filled', 'interactive'];
const colorOptions: TagColor[] = ['success', 'warning', 'error', 'accent', 'secondary', 'default'];

type TagStoryArgs = {
  label: string;
  slotText: string;
  variant: TagVariant;
  color: TagColor;
  size: 'sm' | 'md' | 'lg';
  skClick?: never;
  defaultSlot?: never;
};

const buildTagMarkup = (args: TagStoryArgs) => {
  const attributes = [`variant="${args.variant}"`, `color="${args.color}"`, `size="${args.size}"`, args.label ? `label="${args.label}"` : ''].filter(Boolean);

  const content = args.label ? '' : args.slotText;

  return `<sk-tag ${attributes.join(' ')}>${content}</sk-tag>`;
};

const renderTag = (args: TagStoryArgs) => {
  return storyStage(buildTagMarkup(args), 'story-stage-clean story-stage-centered');
};

const defaultArgs: TagStoryArgs = {
  label: 'Published',
  slotText: 'Published',
  variant: TAG_VARIANT_DEFAULT,
  color: TAG_COLOR_DEFAULT,
  size: 'sm',
};

const meta: Meta<TagStoryArgs> = {
  title: 'Components/Tag',
  component: 'sk-tag',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    actions: {
      handles: ['skClick'],
    },
    docs: {
      page: docsPageTemplate,
      description: {
        component: `sk-tag is a small label for quick recognition and navigation.
## API
Use the controls below to explore the tag variants, sizes, colors, and text content. Clear the label control to preview slot-based content.
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
        interactive: 'Props',
      },
    },
    slotText: {
      control: 'text',
      description: 'Fallback text rendered in the default slot when `label` is empty.',
      table: {
        interactive: 'Story Controls',
      },
    },
    variant: {
      control: 'select',
      options: variantOptions,
      description:
        'Visual style of the tag. `status` and `filled` variants are used for static and non-interactive tags. `interactive` is the only clickable variant and can be used for filtering and performing actions.',
      table: {
        interactive: 'Props',
        defaultValue: { summary: TAG_VARIANT_DEFAULT },
      },
    },
    color: {
      control: 'select',
      options: colorOptions,
      description: 'Semantic color treatment applied to the tag. `success`, `warning`, `error`, `accent`, `secondary`, and `default`.',
      table: {
        interactive: 'Props',
        defaultValue: { summary: TAG_COLOR_DEFAULT },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tag size `sm` | `md` | `lg`.',
      table: {
        interactive: 'Props',
        defaultValue: { summary: 'sm' },
      },
    },
    skClick: {
      name: 'skClick',
      description: 'Emitted when the user clicks a interactive tag.',
      control: false,
      table: {
        interactive: 'Events',
        type: { summary: 'CustomEvent<MouseEvent>' },
      },
    },
    defaultSlot: {
      name: 'default',
      description: 'Tag text content used when the `label` prop is not provided.',
      control: false,
      table: {
        interactive: 'Slots',
        type: { summary: 'text' },
      },
    },
  },
  render: renderTag,
};

export default meta;

type Story = StoryObj<TagStoryArgs>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: buildTagMarkup(defaultArgs),
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
        story: '`filled` tags increase emphasis by using a solid background color.',
      },
      source: {
        code: buildTagMarkup({
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

export const interactive: Story = {
  args: {
    variant: 'interactive',
    color: 'default',
    size: 'sm',
    label: 'Research',
    slotText: 'Research',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: '`interactive` tags are the only clickable variant and can be used for labels, groupings, and metadata.',
      },
      source: {
        code: buildTagMarkup({
          ...defaultArgs,
          variant: 'interactive',
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
        story: 'When `label` is empty, the tag renders its text from the default slot instead.',
      },
      source: {
        code: buildTagMarkup({
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
