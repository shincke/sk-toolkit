import type { Meta, StoryObj } from '@storybook/web-components';

import { storyStage } from '../storybook-helpers';

const defaultOptions = ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo'];

type SelectStoryArgs = {
  label: string;
  placeholder: string;
  options: string[];
  value: string | null;
  disabled: boolean;
  accessibleLabel?: string;
};

const renderSelect = (args: SelectStoryArgs) => {
  const labelAttribute = args.label ? ` label="${args.label}"` : '';
  const placeholderAttribute = ` placeholder="${args.placeholder}"`;
  const valueAttribute = args.value ? ` value="${args.value}"` : '';
  const disabledAttribute = args.disabled ? ' disabled' : '';
  const accessibleLabelAttribute = args.accessibleLabel ? ` aria-label="${args.accessibleLabel}"` : '';
  const optionsAttribute = ` options='${JSON.stringify(args.options)}'`;

  return storyStage(`<sk-select${labelAttribute}${placeholderAttribute}${optionsAttribute}${valueAttribute}${disabledAttribute}${accessibleLabelAttribute}></sk-select>`);
};

const meta: Meta<SelectStoryArgs> = {
  title: 'Components/Select',
  component: 'sk-select',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'City',
    placeholder: 'Select city...',
    options: defaultOptions,
    value: null,
    disabled: false,
    accessibleLabel: 'City',
  },
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    options: {
      control: 'object',
    },
    value: {
      control: 'select',
      options: [null, ...defaultOptions],
    },
    disabled: {
      control: 'boolean',
    },
    accessibleLabel: {
      control: 'text',
      name: 'aria-label',
    },
  },
  render: renderSelect,
};

export default meta;

type Story = StoryObj<SelectStoryArgs>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: 'Kyoto',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Tokyo',
  },
};

export const NoLabel: Story = {
  args: {
    label: '',
    accessibleLabel: 'City',
  },
};
