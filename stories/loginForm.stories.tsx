import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "../app/login/LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Auth/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof LoginForm>;


export const Default: Story = {
  render: () => <LoginForm />,
};

export const WithError: Story = {
  render: () => {
    const Mocked = () => {
      const fakeState = { error: "Invalid email or password" };

      return (
        <div>
          <LoginForm />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
              <p className="text-red-500 font-bold">Entry Denied</p>
              <p className="text-red-900 text-sm">{fakeState.error}</p>
            </div>
          </div>
        </div>
      );
    };

    return <Mocked />;
  },
};


export const Loading: Story = {
  render: () => {
    const Mocked = () => {
      return (
        <div className="pointer-events-none opacity-80">
          <LoginForm />
          <div className="text-amber-900 absolute bottom-8 right-2.5 -translate-x-1/2 text-sm font-bold">
            Simulating loading state...
          </div>
        </div>
      );
    };

    return <Mocked />;
  },
};
