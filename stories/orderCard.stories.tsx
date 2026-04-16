import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { OrderCard } from '../app/homepage/orderCard';

const meta: Meta<typeof OrderCard> = {
  title: 'Dashboard/OrderCard',
  component: OrderCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    updateOrderStatus: fn(),
    statusOptions: ["IN PROGRESS", "READY TO SERVE", "COMPLETED", "CANCELED"],
    getStatusStyles: (status: string) => {
        switch (status) {
          case "IN PROGRESS": return "bg-amber-100 text-amber-900 border-amber-300";
          case "READY TO SERVE": return "bg-emerald-100 text-emerald-900 border-emerald-400 animate-pulse-subtle";
          case "COMPLETED": return "bg-[#4B3832] text-[#DCC7AA] border-[#4B3832]";
          case "CANCELED": return "bg-red-100 text-red-900 border-red-300";
          default: return "bg-gray-100";
        }
      },
  },
  decorators: [
    (Story) => <div className="p-6 bg-[#F5E6CA] w-75"><Story /></div>
  ],
};

export default meta;
type Story = StoryObj<typeof OrderCard>;

export const InProgress: Story = {
  args: {
    order: { id: '1001', name: 'Yna', status: 'IN PROGRESS' },
  },
};

export const ReadyToServe: Story = {
  args: {
    order: { id: '1002', name: 'Gemini', status: 'READY TO SERVE' },
  },
};

export const Canceled: Story = {
    args: {
      order: { id: '1003', name: 'Guest User', status: 'CANCELED' },
    },
};

export const LongCustomerName: Story = {
  args: {
    order: { 
      id: '9999', 
      name: 'Maria Clara de los Santos-Custodio', 
      status: 'IN PROGRESS' 
    },
  },
};

export const CompletedOrder: Story = {
  args: {
    order: { 
      id: '5005', 
      name: 'Maria', 
      status: 'COMPLETED' 
    },
  },
};

export const GuestNoName: Story = {
  args: {
    order: { 
      id: '2022', 
      name: '', 
      status: 'IN PROGRESS' 
    },
  },
};