import type { Meta, StoryObj } from "@storybook/react";
import ReceiptCard from "../app/receipt/[id]/ReceiptCard";

const meta: Meta<typeof ReceiptCard> = {
  title: "Receipt/ReceiptCard",
  component: ReceiptCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ReceiptCard>;
const baseOrder = {
  customerName: "JUAN DELA CRUZ",
  receiptNo: "24759029",
  date: "March 30, 2026",
  quantity: 5,
  amount: 547,
  paymentType: "Cash",
  cashReceived: 600,
  change: 53,
  items: [
    { name: "Matcha Latte", quantity: 2, price: 120 },
    { name: "Spanish Latte", quantity: 1, price: 140 },
    { name: "Chocolate Cake", quantity: 2, price: 83.5 },
  ],
};


export const Default: Story = {
  args: {
    order: baseOrder,
  },
};


export const EmptyItems: Story = {
  args: {
    order: {
      ...baseOrder,
      items: [],
      quantity: 0,
      amount: 0,
    },
  },
};


export const CardPayment: Story = {
  args: {
    order: {
      ...baseOrder,
      paymentType: "Card",
      cashReceived: 0,
      change: 0,
    },
  },
};


export const LargeOrder: Story = {
  args: {
    order: {
      ...baseOrder,
      quantity: 15,
      amount: 2150,
      cashReceived: 2500,
      change: 350,
      items: [
        { name: "Espresso", quantity: 5, price: 100 },
        { name: "Cappuccino", quantity: 5, price: 130 },
        { name: "Burger", quantity: 5, price: 200 },
      ],
    },
  },
};