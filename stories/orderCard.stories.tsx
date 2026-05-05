import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { OrderCard } from "../app/homepage/orderCard";
import { StatusOrUndo } from "../app/types/orderStatus";

const meta: Meta<typeof OrderCard> = {
  title: "Dashboard/OrderCard",
  component: OrderCard,
  parameters: {
    layout: "centered",
  },
  args: {
    statusOptions: ["in_progress", "ready_to_serve", "completed", "canceled"] as StatusOrUndo[],
    getStatusStyles: (status: StatusOrUndo) => {
      switch (status) {
        case "in_progress":
          return "bg-amber-100 text-amber-900 border-amber-300";
        case "ready_to_serve":
          return "bg-emerald-100 text-emerald-900 border-emerald-400 animate-pulse-subtle";
        case "completed":
          return "bg-[#4B3832] text-[#DCC7AA] border-[#4B3832]";
        case "canceled":
          return "bg-red-100 text-red-900 border-red-300";
        default:
          return "bg-gray-100";
      }
    },
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[#F5E6CA] w-75">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OrderCard>;

export const InProgress: Story = {
  args: {
    order: {
      id: "1001",
      customer_name: "Yna",
      status: "in_progress",
      order_type: "dine_in",
      order_items: [],
    },
  },
};

export const ReadyToServe: Story = {
  args: {
    order: {
      id: "1002",
      customer_name: "Gemini",
      status: "ready_to_serve",
      order_type: "take_out",
      order_items: [],
    },
  },
};

export const Canceled: Story = {
  args: {
    order: {
      id: "1003",
      customer_name: "Guest User",
      status: "canceled",
      order_type: "dine_in",
      order_items: [],
    },
  },
};

export const LongCustomerName: Story = {
  args: {
    order: {
      id: "9999",
      customer_name: "Maria Clara de los Santos-Custodio",
      status: "in_progress",
      order_type: "take_out",
      order_items: [],
    },
  },
};

export const CompletedOrder: Story = {
  args: {
    order: {
      id: "5005",
      customer_name: "Maria",
      status: "completed",
      order_type: "dine_in",
      order_items: [],
    },
  },
};

export const GuestNoName: Story = {
  args: {
    order: {
      id: "2022",
      customer_name: "",
      status: "in_progress",
      order_type: "take_out",
      order_items: [],
    },
  },
};
