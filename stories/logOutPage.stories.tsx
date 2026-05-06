import type { Meta, StoryObj } from "@storybook/react";
import LogoutPage from "../app/logout/page";

const meta: Meta<typeof LogoutPage> = {
  title: "Auth/LogoutPage",
  component: LogoutPage,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-360 h-225 overflow-hidden border shadow-2xl relative bg-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof LogoutPage>;

export const Default: Story = {
  render: () => <LogoutPage />,
};

export const Loading: Story = {
  render: () => (
    <div className="relative h-full w-full pointer-events-none">
      <div className="opacity-60">
        <LogoutPage />
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full text-center">
        <p className="text-[#4B3832] text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
          Simulating logout...
        </p>
      </div>
    </div>
  ),
};