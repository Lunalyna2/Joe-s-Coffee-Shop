import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "../app/navbar/navbar";

const meta: Meta<typeof Navbar> = {
  title: "Layout/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/cashier", 
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const MenuActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/cashier",
      },
    },
  },
  render: () => <Navbar />,
};


export const HistoryActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/history",
      },
    },
  },
  render: () => <Navbar />,
};


export const LogoutActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/logout",
      },
    },
  },
  render: () => <Navbar />,
};


export const NoActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/random",
      },
    },
  },
  render: () => <Navbar />,
};
