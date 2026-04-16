import type { Meta, StoryObj } from "@storybook/react";
import LogoutPage from "../app/logout/page";

const meta: Meta<typeof LogoutPage> = {
  title: "Auth/LogoutPage",
  component: LogoutPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof LogoutPage>;


export const Default: Story = {
  render: () => <LogoutPage />,
};

export const Loading: Story = {
  render: () => (
    <div className="pointer-events-none opacity-80">
      <LogoutPage />
      <div className="text-amber-900 absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-black uppercase tracking-widest">
        Simulating logout...
      </div>
    </div>
  ),
};

