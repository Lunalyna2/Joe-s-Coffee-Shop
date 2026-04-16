
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import OrderDetailsModal from '../app/receiptmodal/orderDetailsModal';

const meta: Meta<typeof OrderDetailsModal> = {
  title: 'Checkout/OrderDetailsModal',
  component: OrderDetailsModal,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onClose: { action: 'closed' },
    onPlaceOrder: { action: 'order placed' },
  },
};

export default meta;
type Story = StoryObj<typeof OrderDetailsModal>;

export const Default: Story = {
  render: (args) => {
    const [items, setItems] = useState([
      { id: 1, name: 'Spanish Latte', price: 170, quantity: 2 },
      { id: 2, name: 'Truffle Mushroom Pasta', price: 285, quantity: 1 }
    ]);

    const updateQuantity = (id: number, delta: number) => {
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      ).filter(i => i.quantity > 0));
    };

    return (
      <div className="h-screen w-100 border-x">
        <OrderDetailsModal 
          {...args} 
          orderItems={items} 
          updateQuantity={updateQuantity} />
      </div>
    );
  },
  args: {
    orderItems: [], 
  }
};

export const EmptyCart: Story = {
  args: {
    orderItems: [],
    updateQuantity: () => {},
    onClose: () => {},
    onPlaceOrder: () => {},
  },
  render: (args) => (
    <div className="h-screen w-100 border-x">
      <OrderDetailsModal {...args} />
    </div>
  )
};