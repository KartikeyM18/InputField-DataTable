import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

// User interface definition
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  age: number;
}

// Sample data for the table
const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', age: 32 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', age: 28 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', age: 45 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active', age: 38 },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active', age: 25 },
];

// Column definitions for the DataTable
const columns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name' as keyof User,
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email' as keyof User,
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role' as keyof User,
    sortable: true,
  },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age' as keyof User,
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status' as keyof User,
    sortable: true,
    
    render: (value: string) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}
      >
        {value}
      </span>
    ),
  },
];

// Storybook metadata
const meta = {
  title: 'Components/DataTable',
  component: DataTable<User>,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable<User>>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

// Story with row selection enabled
export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns: columns,
    selectable: true,
    onRowSelect: (selectedRows) => {
      console.log('Selected rows:', selectedRows);
    },
  },
};

// Story showing loading state
export const Loading: Story = {
  args: {
    data: [],
    columns: columns,
    loading: true,
  },
};

// Story showing empty state
export const Empty: Story = {
  args: {
    data: [],
    columns: columns,
    emptyMessage: 'No users found',
  },
};

// Story with sorting enabled (functionality is in the component)
export const WithSorting: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

// Story with a larger dataset
export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'User', 'Manager'][i % 3],
      status: i % 3 === 0 ? 'Inactive' : 'Active',
      age: 20 + (i % 40),
    })),
    columns: columns,
    selectable: true,
  },
};