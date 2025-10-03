import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputField } from './InputField';

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for controlled input
const ControlledInput = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <div className="w-80">
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email',
  },
};

export const WithError: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    invalid: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const Password: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithClearButton: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
    showClearButton: true,
    value: 'Sample text',
  },
};

export const Loading: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Username',
    placeholder: 'Checking availability...',
    loading: true,
    value: 'johndoe',
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    disabled: true,
    value: 'Disabled text',
  },
};

export const SmallSize: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
  },
};

export const FilledVariant: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Filled Input',
    placeholder: 'Filled variant',
    variant: 'filled',
  },
};

export const GhostVariant: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Ghost Input',
    placeholder: 'Ghost variant',
    variant: 'ghost',
  },
};

export const Required: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <ControlledInput
        label="Outlined (Default)"
        placeholder="Outlined variant"
        variant="outlined"
      />
      <ControlledInput
        label="Filled"
        placeholder="Filled variant"
        variant="filled"
      />
      <ControlledInput
        label="Ghost"
        placeholder="Ghost variant"
        variant="ghost"
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <ControlledInput label="Small" placeholder="Small size" size="sm" />
      <ControlledInput label="Medium" placeholder="Medium size" size="md" />
      <ControlledInput label="Large" placeholder="Large size" size="lg" />
    </div>
  ),
};