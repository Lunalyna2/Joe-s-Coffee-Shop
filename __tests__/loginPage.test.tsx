import { test, expect, vi, beforeEach } from "vitest";
import LoginPage from "../app/login/page";
import { LoginForm } from "../app/login/LoginForm";

// unit test: loginPage - redirect or render form

// define type
type GetUserResponse = {
  data: { user: { id: string } | null };
  error: { message?: string } | null;
};

// fake supabse client
const fakeSupabase = {
  auth: {
    getUser: async (): Promise<GetUserResponse> => ({
      data: { user: null },
      error: null,
    }),
  },
};

// mock createClient
vi.mock("@/utils/supabase/server", () => ({
  createClient: async () => fakeSupabase,
}));

// mock redirect
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

import { redirect } from "next/navigation"; //mock

//clears mock call history beforoe each test
beforeEach(() => {
  vi.clearAllMocks();
});

// login page test 1: user exists - redirect
test("loginPage redirects to /cashier when user is authenticated", async () => {
  // Override fakeSupabase to simulate a logged-in user
  fakeSupabase.auth.getUser = async () => ({
    data: { user: { id: "123" } },
    error: null,
  });

  await LoginPage();

  // Assert redirect was called once with correct path
  expect(redirect).toHaveBeenCalledTimes(1);
  expect(redirect).toHaveBeenCalledWith("/cashier");
});

// test 2: no user - render form
test("loginPage renders LoginForm when no user is authenticated", async () => {
  fakeSupabase.auth.getUser = async () => ({
    data: { user: null },
    error: null,
  });

  const result = await LoginPage();

  expect(result).toMatchObject({ type: LoginForm });
  expect(result.type).toBe(LoginForm);
  expect(result.props).toBeDefined(); // extra check for props existence
});
