import type { Meta, StoryObj } from "@storybook/react";
import ReceiptCard from "../app/receipt/[id]/ReceiptCard";

const meta: Meta = {
  title: "Receipt/ReceiptPage",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

export const Found: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-screen bg-[#F5E6CA] p-6">
      <ReceiptCard
        order={{
          customerName: "JUAN DELA CRUZ",
          receiptNo: "24759029",
          date: "March 30, 2026",
          quantity: 3,
          amount: 360,
          paymentType: "Cash",
          cashReceived: 500,
          change: 140,
          items: [
            { name: "Latte", quantity: 2, price: 120 },
            { name: "Cake", quantity: 1, price: 120 },
          ],
        }}/>
    </div>
  ),
};


export const NotFound: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5E6CA]">
      <p className="text-[#4B3832] font-black italic text-xl uppercase">
        Receipt not found
      </p>
      <p className="mt-4 text-[#6F4E37] underline font-bold">
        Return to History
      </p>
    </div>
  ),
};