// __tests__/loginPage.test.tsx
import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "../app/login/page";

// mock Supabase client
vi.mock("@/utils/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    },
  }),
}));

test("LoginPage renders LoginForm", async () => {
  const ui = await LoginPage(); // async component
  render(ui);

  expect(screen.getByText(/login/i)).toBeDefined();
});
