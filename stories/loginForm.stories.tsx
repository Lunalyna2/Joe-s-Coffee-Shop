import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "../app/login/LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Auth/LoginForm",
  component: LoginForm,
  parameters: {
    // This keeps the component centered in the Canvas regardless of panel position
    layout: "centered",
  },
  decorators: [
    (Story) => (
      /* Fixes the component to a standard desktop 'box' size so it doesn't move */
      <div className="w-360 h-225 overflow-hidden border shadow-2xl relative bg-white">
        <Story />
      </div>
    ),
  ],
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
        <div className="relative h-full w-full">
          <LoginForm />
          {fakeState.error && (
            <div className="absolute top-[72%] left-[75%] -translate-x-1/2 w-full max-w-[320px] hidden lg:block animate-in fade-in slide-in-from-top-1 duration-300">
              <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-center shadow-sm">
                <p className="text-red-600 font-black uppercase tracking-widest text-[9px] mb-0.5">
                  Entry Denied
                </p>
                <p className="text-red-900 text-[11px] font-bold italic">
                  {fakeState.error}
                </p>
              </div>
            </div>
          )}
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
        <div className="pointer-events-none relative h-full w-full overflow-hidden">
          <div className="opacity-50">
            <LoginForm />
          </div>

          {/*simulating loading state*/}
          <div className="absolute top-[75%] left-[75%] -translate-x-1/2 w-full max-w-[320px] text-center hidden lg:block">
            <p className="text-[#4B3832] text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
              Simulating loading state...
            </p>
          </div>

          <div className="lg:hidden absolute bottom-20 left-1/2 -translate-x-1/2 w-full text-center">
            <p className="text-[#4B3832] text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
              Simulating loading state...
            </p>
          </div>
        </div>
      );
    };

    return <Mocked />;
  },
};