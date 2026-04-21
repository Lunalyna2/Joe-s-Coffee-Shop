import { vi, test, expect } from "vitest";
import { logoutAction } from "../app/logout/actions";
import { redirect } from "next/navigation";

// unit testing: redirect or error
// minimal type for mock
type MockAuth = {
  signOut: () => Promise<{ error: { message: string } | null }>;
};
type MockSupabase = {
  auth: MockAuth;
};

// mock createClient returns MockSupabase
vi.mock("@/utils/supabase/server", () => ({
  createClient: async (): Promise<MockSupabase> => ({
    auth: {
      signOut: vi.fn(async () => ({ error: null })),
    },
  }),
}));

// redirect mock
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// logoutAction test 1: success case
test("calls supabase signOut and redirects", async () => {
  await logoutAction();

  expect(redirect).toHaveBeenCalledTimes(1);
  expect(redirect).toHaveBeenCalledWith("/");
});

// test 2: error case
test("logs error if signOut fails", async () => {
  const supabaseModule = await import("@/utils/supabase/server");

  // override supabase mock for this test to simulate failure
  (
    supabaseModule as { createClient: () => Promise<MockSupabase> }
  ).createClient = async () => ({
    auth: {
      signOut: vi.fn(async () => ({
        error: { message: "Something went wrong" },
      })),
    },
  });

  // spy on console.error to capture logs
  const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  await logoutAction();

  expect(consoleSpy).toHaveBeenCalledWith(
    "Logout error:",
    "Something went wrong",
  );

  // clean up spy to avoid affecting other tests
  consoleSpy.mockRestore();
});
