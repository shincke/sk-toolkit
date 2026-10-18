import type { Meta, StoryObj } from '@storybook/web-components';

import { docsPageTemplate, storyStage } from '../storybook-helpers';

const variantOptions = ['primary', 'secondary', 'ghost', 'destructive'] as const;
const sizeOptions = ['sm', 'md', 'lg'] as const;
const iconOptions = ['none', 'plus', 'check', 'arrow'] as const;
const typeOptions = ['button', 'submit', 'reset'] as const;

// This type represents the API we want to expose in Storybook. It can be a bit
// broader than the minimal set of props in one story because docs and controls
// are most useful when readers can explore the full public surface.
type ButtonStoryArgs = {
  label: string;
  variant: (typeof variantOptions)[number];
  size: (typeof sizeOptions)[number];
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
  iconOnly: boolean;
  focusableWhenDisabled: boolean;
  pressed?: boolean;
  href?: string;
  target?: '_self' | '_blank';
  rel?: string;
  download?: string;
  iconLeft: (typeof iconOptions)[number];
  iconRight: (typeof iconOptions)[number];
  type: (typeof typeOptions)[number];
  accessibleLabel?: string;
  skClick?: never;
  skFocus?: never;
  skBlur?: never;
  defaultSlot?: never;
  iconLeftSlot?: never;
  iconRightSlot?: never;
  buttonPart?: never;
};

// Render helper starts here.
// -----------------------------------------------------------------------------
const buildIconMarkup = (slot: 'iconLeft' | 'iconRight', iconName?: ButtonStoryArgs['iconLeft']) => {
  if (!iconName || iconName === 'none') {
    return '';
  }

  return `<sk-icon slot="${slot}" name="${iconName}" aria-hidden="true"></sk-icon>`;
};

// Build one source of truth for the component markup. We reuse this for both the
// live canvas render and the docs code sample, which avoids the two drifting apart.
const buildButtonMarkup = (args: ButtonStoryArgs) => {
  const resolvedIconLeft = args.iconOnly && args.iconLeft === 'none' ? 'plus' : args.iconLeft;
  const attributes = [
    `variant="${args.variant}"`,
    `size="${args.size}"`,
    `type="${args.type}"`,
    args.disabled ? 'disabled' : '',
    args.loading ? 'loading' : '',
    args.fullWidth ? 'full-width' : '',
    args.iconOnly ? 'icon-only' : '',
    args.focusableWhenDisabled ? 'focusable-when-disabled' : '',
    args.pressed === undefined ? '' : `pressed="${String(args.pressed)}"`,
    args.href ? `href="${args.href}"` : '',
    args.target ? `target="${args.target}"` : '',
    args.rel ? `rel="${args.rel}"` : '',
    args.download ? `download="${args.download}"` : '',
    args.accessibleLabel ? `aria-label="${args.accessibleLabel}"` : '',
  ].filter(Boolean);

  const iconLeftMarkup = buildIconMarkup('iconLeft', resolvedIconLeft);
  const iconRightMarkup = buildIconMarkup('iconRight', args.iconRight);
  const labelMarkup = args.iconOnly ? '' : args.label;

  return `<sk-button ${attributes.join(' ')}>${iconLeftMarkup}${labelMarkup}${iconRightMarkup}</sk-button>`;
};

// The render function is what Storybook uses for the canvas. Wrapping with
// `storyStage` keeps the presentation consistent with the other stories in the repo.
const renderButton = (args: ButtonStoryArgs) => {
  return storyStage(buildButtonMarkup(args), 'story-stage-clean story-stage-centered');
};

const defaultArgs: ButtonStoryArgs = {
  label: 'Primary button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  iconOnly: false,
  focusableWhenDisabled: false,
  pressed: undefined,
  href: undefined,
  target: undefined,
  rel: undefined,
  download: undefined,
  iconLeft: 'none',
  iconRight: 'none',
  type: 'button',
  accessibleLabel: 'Primary button',
};

// Docs and shared story configuration start here.
// -----------------------------------------------------------------------------
// The Meta block is used to attach a custom MDX docs page alongside a component’s list of stories.
// read more here: https://storybook.js.org/docs/api/doc-blocks/doc-block-meta
const meta: Meta<ButtonStoryArgs> = {
  title: 'Components/Button',
  component: 'sk-button',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    actions: {
      handles: ['skClick', 'skFocus', 'skBlur'],
    },
    docs: {
      page: docsPageTemplate,
      description: {
        component: `sk-button triggers an action with a single click or tap and acts as a clear call to action.
Variants express a hierarchy of importance so users can quickly identify the main, alternative, supplementary, and destructive actions on a page.
It can be used as a button or as a link, depending on whether the \`href\` property is set.
## API
Use the controls below to explore the button states and API.
        `,
      },
    },
  },
  args: defaultArgs,
  // Controls table starts here.
  // -----------------------------------------------------------------------------
  // `argTypes` is where Storybook learns how to display each property in docs.
  // The descriptions feed the docs table, and `control` decides which UI widget
  // is shown in the Controls panel.
  argTypes: {
    label: {
      control: 'text',
      description: 'Text content rendered inside the button.',
      table: {
        category: 'Props',
      },
    },
    variant: {
      control: 'select',
      options: variantOptions,
      description: 'Visual hierarchy of the button.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: sizeOptions,
      description: 'Controls the button height and internal spacing.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Shows the button as disabled and prevents interaction.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Displays a loading indicator and blocks interaction.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      name: 'full-width',
      description: 'Expands the button to the width of its container.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
    iconOnly: {
      control: 'boolean',
      name: 'icon-only',
      description: 'Hides text and displays only icon content.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
    focusableWhenDisabled: {
      control: 'boolean',
      name: 'focusable-when-disabled',
      description: 'Allows keyboard focus while the button remains non-interactive.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
    pressed: {
      control: 'boolean',
      description: 'Indicates toggle-button pressed state when applicable.',
      table: {
        category: 'Props',
        type: { summary: 'boolean | undefined' },
      },
    },
    href: {
      control: 'text',
      description: 'Renders the component as an anchor when a URL is provided.',
      table: {
        category: 'Props',
        type: { summary: 'string | undefined' },
      },
    },
    target: {
      control: 'select',
      options: [undefined, '_self', '_blank'],
      description: 'Target attribute used together with `href`.',
      table: {
        category: 'Props',
        type: { summary: '"_self" | "_blank" | undefined' },
      },
    },
    rel: {
      control: 'text',
      description: 'Rel attribute used together with `href`.',
      table: {
        category: 'Props',
        type: { summary: 'string | undefined' },
      },
    },
    download: {
      control: 'text',
      description: 'Download attribute used together with `href`.',
      table: {
        category: 'Props',
        type: { summary: 'string | undefined' },
      },
    },
    iconLeft: {
      control: 'select',
      options: iconOptions,
      description: 'Optional leading icon rendered in the `iconLeft` slot.',
      table: {
        category: 'Props',
      },
    },
    iconRight: {
      control: 'select',
      options: iconOptions,
      description: 'Optional trailing icon rendered in the `iconRight` slot.',
      table: {
        category: 'Props',
      },
    },
    type: {
      control: 'select',
      options: typeOptions,
      description: 'Native button type when the component renders a button element.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'button' },
      },
    },
    accessibleLabel: {
      control: 'text',
      name: 'aria-label',
      description: 'Accessible label, especially important for icon-only buttons.',
      table: {
        category: 'Props',
        type: { summary: 'string | undefined' },
      },
    },
    skClick: {
      name: 'skClick',
      description: 'Emitted when the user activates the button.',
      control: false,
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<MouseEvent | KeyboardEvent>' },
      },
    },
    skFocus: {
      name: 'skFocus',
      description: 'Emitted when the button receives focus.',
      control: false,
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<void>' },
      },
    },
    skBlur: {
      name: 'skBlur',
      description: 'Emitted when the button loses focus.',
      control: false,
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<void>' },
      },
    },
    defaultSlot: {
      name: 'default',
      description: 'Text content placed inside the button.',
      control: false,
      table: {
        category: 'Slots',
        type: { summary: 'text' },
      },
    },
    iconLeftSlot: {
      name: 'iconLeft',
      description: 'Slot for a leading icon element.',
      control: false,
      table: {
        category: 'Slots',
        type: { summary: '<sk-icon /> or similar' },
      },
    },
    iconRightSlot: {
      name: 'iconRight',
      description: 'Slot for a trailing icon element.',
      control: false,
      table: {
        category: 'Slots',
        type: { summary: '<sk-icon /> or similar' },
      },
    },
    buttonPart: {
      name: 'button',
      description: 'Shadow part exposed by the internal button or anchor element.',
      control: false,
      table: {
        category: 'CSS Shadow Parts',
        type: { summary: 'part' },
      },
    },
  },
  render: renderButton,
};

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

// Variant stories start here.
// -----------------------------------------------------------------------------
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: buildButtonMarkup(defaultArgs),
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary button',
    accessibleLabel: 'Secondary button',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'Secondary buttons are lower contrast than primary buttons and are used for secondary actions.',
      },
      source: {
        code: buildButtonMarkup({
          ...defaultArgs,
          variant: 'secondary',
          label: 'Secondary button',
          accessibleLabel: 'Secondary button',
        }),
      },
    },
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost button',
    accessibleLabel: 'Ghost button',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'Ghost buttons are low-contrast and work well on colored backgrounds.',
      },
      source: {
        code: buildButtonMarkup({
          ...defaultArgs,
          variant: 'ghost',
          label: 'Ghost button',
          accessibleLabel: 'Ghost button',
        }),
      },
    },
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    label: 'Destructive button',
    accessibleLabel: 'Destructive button',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'Use destructive buttons for actions that are potentially dangerous or irreversible.',
      },
      source: {
        code: buildButtonMarkup({
          ...defaultArgs,
          variant: 'destructive',
          label: 'Destructive button',
          accessibleLabel: 'Destructive button',
        }),
      },
    },
  },
};

export const Loading: Story = {
  args: {
    variant: 'secondary',
    label: 'Loading',
    loading: true,
    accessibleLabel: 'Loading button',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'Loading states communicate progress and temporarily prevent repeated interaction.',
      },
      source: {
        code: buildButtonMarkup({
          ...defaultArgs,
          variant: 'secondary',
          label: 'Loading',
          loading: true,
          accessibleLabel: 'Loading button',
        }),
      },
    },
  },
};

export const IconOnly: Story = {
  args: {
    label: '',
    iconOnly: true,
    accessibleLabel: 'Icon only button',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'Icon-only buttons require an accessible label because there is no visible text content.',
      },
      source: {
        code: buildButtonMarkup({
          ...defaultArgs,
          label: '',
          iconOnly: true,
          accessibleLabel: 'Icon only button',
        }),
      },
    },
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Add item',
    variant: 'primary',
    iconLeft: 'plus',
    iconRight: 'arrow',
    accessibleLabel: 'Add item',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'Use leading and trailing icons to reinforce the action and improve clarity in command-heavy interfaces.',
      },
      source: {
        code: buildButtonMarkup({
          ...defaultArgs,
          label: 'Add item',
          variant: 'primary',
          iconLeft: 'plus',
          iconRight: 'arrow',
          accessibleLabel: 'Add item',
        }),
      },
    },
  },
};

export const AsLink: Story = {
  args: {
    label: 'Open documentation',
    href: '#docs',
    target: '_self',
    rel: 'noopener noreferrer',
    iconRight: 'arrow',
    accessibleLabel: 'Open documentation',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'Set `href` when the button should navigate instead of triggering an in-place action.',
      },
      source: {
        code: buildButtonMarkup({
          ...defaultArgs,
          label: 'Open documentation',
          href: '#docs',
          target: '_self',
          rel: 'noopener noreferrer',
          iconRight: 'arrow',
          accessibleLabel: 'Open documentation',
        }),
      },
    },
  },
};

export const Pressed: Story = {
  args: {
    label: 'Selected filter',
    variant: 'secondary',
    pressed: true,
    accessibleLabel: 'Selected filter',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'Use `pressed` for toggle-style actions where the button represents an on/off state.',
      },
      source: {
        code: buildButtonMarkup({
          ...defaultArgs,
          label: 'Selected filter',
          variant: 'secondary',
          pressed: true,
          accessibleLabel: 'Selected filter',
        }),
      },
    },
  },
};
