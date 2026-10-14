import type { Meta, StoryObj } from '@storybook/web-components';

import { storyStage } from '../storybook-helpers';

type ButtonStoryArgs = {
  label: string;
  variant: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
  iconOnly: boolean;
  type: 'button' | 'submit' | 'reset';
  accessibleLabel?: string;
};

const renderButton = (args: ButtonStoryArgs) => {
  const label = args.iconOnly ? '' : args.label;
  const variantAttribute = ` variant="${args.variant}"`;
  const sizeAttribute = ` size="${args.size}"`;
  const disabledAttribute = args.disabled ? ' disabled' : '';
  const loadingAttribute = args.loading ? ' loading' : '';
  const fullWidthAttribute = args.fullWidth ? ' full-width' : '';
  const iconOnlyAttribute = args.iconOnly ? ' icon-only' : '';
  const typeAttribute = ` type="${args.type}"`;
  const accessibleLabelAttribute = args.accessibleLabel ? ` aria-label="${args.accessibleLabel}"` : '';

  return storyStage(
    `<sk-button${variantAttribute}${sizeAttribute}${disabledAttribute}${loadingAttribute}${fullWidthAttribute}${iconOnlyAttribute}${typeAttribute}${accessibleLabelAttribute}${
      label ? `>${label}</sk-button>` : '></sk-button>'
    }`,
  );
};

const meta: Meta<ButtonStoryArgs> = {
  title: 'Components/Button',
  component: 'sk-button',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'Primary button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false,
    type: 'button',
    accessibleLabel: 'Primary button',
  },
  argTypes: {
    label: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
      name: 'full-width',
    },
    iconOnly: {
      control: 'boolean',
      name: 'icon-only',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    accessibleLabel: {
      control: 'text',
      name: 'aria-label',
    },
  },
  render: renderButton,
};

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary button',
    accessibleLabel: 'Secondary button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost button',
    accessibleLabel: 'Ghost button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    label: 'Destructive button',
    accessibleLabel: 'Destructive button',
  },
};

export const Loading: Story = {
  args: {
    variant: 'secondary',
    label: 'Loading',
    loading: true,
    accessibleLabel: 'Loading button',
  },
};

export const IconOnly: Story = {
  args: {
    label: '',
    iconOnly: true,
    accessibleLabel: 'Icon only button',
  },
};
