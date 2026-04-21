import { test, expect, vi, beforeEach } from "vitest";
import LoginPage from "../app/login/page";
import { LoginForm } from "../app/login/LoginForm";

// mock Supabase client
const fakeSupabase = {
  auth: {
    getUser: vi.fn(),
  },
};

vi.mock("@/utils/supabase/server", () => ({
  createClient: async () => fakeSupabase,
}));

// mock redirect
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));
import { redirect } from "next/navigation";

beforeEach(() => {
  vi.clearAllMocks();
});

//test 1: no user
test("renders LoginForm if there is no user", async () => {
  fakeSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });
  const ui = await LoginPage();

  expect(ui.type.name).toBe("LoginForm");
  expect(redirect).not.toHaveBeenCalled();
});

// test 2: user exists
test("redirects to /cashier if user exists", async () => {
  fakeSupabase.auth.getUser.mockResolvedValue({
    data: { user: { id: "123" } },
  });

  await LoginPage();
  expect(redirect).toHaveBeenCalledWith("/cashier");
});
