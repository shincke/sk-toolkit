import type { Meta, StoryObj } from '@storybook/web-components';

import { SPINNER_SIZE_DEFAULT, type SpinnerSize } from '../../components/sk-spinner/sk-spinner.types';
import { docsPageTemplate, storyStage } from '../storybook-helpers';

const sizeOptions: SpinnerSize[] = ['sm', 'md', 'lg', 'xl'];

type SpinnerStoryArgs = {
  size: SpinnerSize;
  label: string;
  paused: boolean;
};

// Render helper starts here.
// -----------------------------------------------------------------------------
const buildSpinnerMarkup = (args: SpinnerStoryArgs) => {
  const attributes = [`size="${args.size}"`, args.label ? `label="${args.label}"` : '', args.paused ? 'paused' : ''].filter(Boolean);

  return `<sk-spinner ${attributes.join(' ')}></sk-spinner>`;
};

const renderSpinner = (args: SpinnerStoryArgs) => {
  return storyStage(buildSpinnerMarkup(args), 'story-stage-clean story-stage-centered');
};
const defaultArgs: SpinnerStoryArgs = {
  size: SPINNER_SIZE_DEFAULT,
  label: 'Loading records...',
  paused: false,
};

// Docs and shared story configuration start here.
// -----------------------------------------------------------------------------
// The Meta block is used to attach a custom MDX docs page alongside a component’s list of stories.
// read more here: https://storybook.js.org/docs/api/doc-blocks/doc-block-meta
const meta: Meta<SpinnerStoryArgs> = {
  title: 'Components/Spinner',
  component: 'sk-spinner',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: docsPageTemplate,
      description: {
        component: `sk-spinner is used as a sign that something is loading or being processed on a page.
## API
Use the controls below to explore the spinner states and API.
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
    size: {
      control: 'select',
      options: sizeOptions,
      description: 'Controls the rendered size of the spinner.',
      table: {
        category: 'Props',
        defaultValue: { summary: SPINNER_SIZE_DEFAULT },
      },
    },
    label: {
      control: 'text',
      description: 'Visible loading text shown beneath the spinner and reused as the accessible label when provided.',
      table: {
        category: 'Props',
      },
    },
    paused: {
      control: 'boolean',
      description: 'Pauses the spinner animation while keeping the component visible.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
  },
  render: renderSpinner,
};

export default meta;

type Story = StoryObj<SpinnerStoryArgs>;

// Variant stories start here.
// -----------------------------------------------------------------------------
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: buildSpinnerMarkup(defaultArgs),
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Loading small content...',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'Use the small spinner when space is limited or when it appears inline with compact UI.',
      },
      source: {
        code: buildSpinnerMarkup({
          ...defaultArgs,
          size: 'sm',
          label: 'Loading small content...',
        }),
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'xl',
    label: 'Loading dashboard...',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'Larger spinners work better for prominent loading states that need more visual emphasis.',
      },
      source: {
        code: buildSpinnerMarkup({
          ...defaultArgs,
          size: 'xl',
          label: 'Loading dashboard...',
        }),
      },
    },
  },
};

export const Paused: Story = {
  args: {
    paused: true,
    label: 'Loading paused',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'Paused state is useful when you need to demonstrate or test the component without motion.',
      },
      source: {
        code: buildSpinnerMarkup({
          ...defaultArgs,
          paused: true,
          label: 'Loading paused',
        }),
      },
    },
  },
};

export const WithoutLabel: Story = {
  args: {
    label: '',
  },
  parameters: {
    docs: {
      disable: true,
      description: {
        story: 'When no label is provided, the component falls back to its internal accessible label of “Loading”.',
      },
      source: {
        code: buildSpinnerMarkup({
          ...defaultArgs,
          label: '',
        }),
      },
    },
  },
};
