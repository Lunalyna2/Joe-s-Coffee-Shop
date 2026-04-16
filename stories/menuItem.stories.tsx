import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { MenuItem } from '../app/homepage/menuItem';

const meta: Meta<typeof MenuItem> = {
  title: 'Dashboard/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  args: {
    updateQuantity: fn(),
  },
  decorators: [
    (Story) => <div className="p-10 bg-[#F5E6CA] w-100"><Story /></div>
  ],
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const CoffeeItem: Story = {
  args: {
    item: { 
      id: 1, 
      name: 'Caramel Macchiato', 
      price: 185, 
      category: 'COFFEE-BASED', 
      quantity: 1 
    },
  },
};

export const LongNameFood: Story = {
  args: {
    item: { 
      id: 2, 
      name: 'Triple Patty Overload Classic Burger with Extra Cheese', 
      price: 450, 
      category: 'PASTA & BURGERS', 
      quantity: 0 
    },
  },
};



export const HighQuantity: Story = {
  args: {
    item: { 
      id: 6, 
      name: 'Butter Croissant', 
      price: 95, 
      category: 'DESSERTS & PASTRIES', 
      quantity: 99 
    },
  },
};

export const ExpensiveItem: Story = {
  args: {
    item: { 
      id: 7, 
      name: 'Tres Leches Cake', 
      price: 1550.50,
      category: 'DESSERTS & PASTRIES', 
      quantity: 0 
    },
  },
};

export const CategoryTagLongName: Story = {
    args: {
      item: { 
        id: 8, 
        name: 'Classic Burger', 
        price: 220, 
        category: 'SIGNATURE BURGERS & SANDWICHES', 
        quantity: 0 
      },
    },
};