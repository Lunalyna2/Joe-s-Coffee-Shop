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
  expect(ui.type).toBe(LoginForm);
  expect(ui.props).toBeDefined();
});

// test 2: user exists
test("redirects to /cashier if user exists", async () => {
  fakeSupabase.auth.getUser.mockResolvedValue({
    data: { user: { id: "123" } },
  });

  await LoginPage();
  expect(redirect).toHaveBeenCalledTimes(1);
  expect(redirect).toHaveBeenCalledWith("/cashier");
});

// test 3: Supabase error case
test("renders LoginForm if getUser returns error", async () => {
  fakeSupabase.auth.getUser.mockResolvedValue({
    data: { user: null },
    error: { message: "Session expired" },
  });

  const ui = await LoginPage();
  expect(ui.type).toBe(LoginForm);
  expect(redirect).not.toHaveBeenCalled();
});

// test 4: multiple calls ensure fresh state
test("redirect is not called when no user across multiple calls", async () => {
  fakeSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });

  const ui1 = await LoginPage();
  const ui2 = await LoginPage();

  expect(ui1.type).toBe(LoginForm);
  expect(ui2.type).toBe(LoginForm);
  expect(redirect).not.toHaveBeenCalled();
});

// test 5: user object with additional fields
test("redirects correctly even if user object has extra fields", async () => {
  fakeSupabase.auth.getUser.mockResolvedValue({
    data: { user: { id: "123", email: "test@example.com" } },
  });

  await LoginPage();
  expect(redirect).toHaveBeenCalledWith("/cashier");
});
