import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { MenuItemCard } from "../app/homepage/menuItemCard";
import { MenuItemWithQuantity } from "../app/types";

const meta: Meta<typeof MenuItemCard> = {
  title: "Dashboard/MenuItemCard",
  component: MenuItemCard,
};
export default meta;

type Story = StoryObj<typeof MenuItemCard>;

export const CoffeeItem: Story = {
  args: {
    item: {
      id: "1",
      name: "Caramel Macchiato",
      price: 185,
      category: "coffee", 
      status: "active",
      quantity: 1,
    } as MenuItemWithQuantity,
    updateQuantity: fn(),
  },
};

export const LongNameFood: Story = {
  args: {
    item: {
      id: "2",
      name: "Triple Patty Overload Classic Burger with Extra Cheese",
      price: 450,
      category: "pasta_burger",
      status: "active",
      quantity: 0,
    } as MenuItemWithQuantity,
    updateQuantity: fn(),
  },
};

export const HighQuantity: Story = {
  args: {
    item: {
      id: "6",
      name: "Butter Croissant",
      price: 95,
      category: "dessert_pastry",
      status: "active",
      quantity: 99,
    } as MenuItemWithQuantity,
    updateQuantity: fn(),
  },
};

export const ExpensiveItem: Story = {
  args: {
    item: {
      id: "7",
      name: "Tres Leches Cake",
      price: 1550.5,
      category: "dessert_pastry",
      status: "active",
      quantity: 0,
    } as MenuItemWithQuantity,
    updateQuantity: fn(),
  },
};

export const CategoryTagLongName: Story = {
  args: {
    item: {
      id: "8",
      name: "Classic Burger",
      price: 220,
      category: "pasta_burger",
      status: "active",
      quantity: 0,
    } as MenuItemWithQuantity,
    updateQuantity: fn(),
  },
};
