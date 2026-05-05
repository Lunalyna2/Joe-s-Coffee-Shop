import type { Meta, StoryObj } from "@storybook/react";
import { AddMenuModal } from "../app/add menu/addMenuModal";
import { MenuItemWithQuantity } from "../app/types";

// Mock data
const mockMenuItems: MenuItemWithQuantity[] = [
  {
    id: "1",
    name: "Caramel Macchiato",
    price: 150.0,
    category: "coffee",
    status: "active",
    quantity: 0,
  },
  {
    id: "2",
    name: "Truffle Pasta",
    price: 320.0,
    category: "pasta_burger",
    status: "active",
    quantity: 0,
  },
  {
    id: "3",
    name: "Old Item",
    price: 45.0,
    category: "dessert_pastry",
    status: "hidden",
    quantity: 0,
  },
];

const meta: Meta<typeof AddMenuModal> = {
  title: "Admin/AddMenuModal",
  component: AddMenuModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    menuItems: mockMenuItems,
    onClose: () => {},        // simple mock functions
    onMenuUpdate: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-full h-screen bg-stone-100">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AddMenuModal>;

export const Default: Story = {
  args: {
    menuItems: mockMenuItems,
  },
};

export const EmptyInventory: Story = {
  args: {
    menuItems: [],
  },
};

