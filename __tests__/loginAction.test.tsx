import { test, expect, vi, beforeEach } from "vitest";
import { loginAction } from "../app/login/actions";

// unit test: loginAction - returns error or redirects

// define expected shape of SignInWithPassword response
type SignInResponse = {
  data: { user: { email: string } | null };
  error: { message: string; status?: number; name?: string } | null;
};

//fake supabase client -- simulates auth.signInWithPassword
//returns both data and error
const fakeSupabase = {
  auth: {
    signInWithPassword: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<SignInResponse> => {
      if (email === "valid@example.com" && password === "validpw123") {
        return { data: { user: { email } }, error: null };
      }
      return {
        data: { user: null },
        error: { message: "Invalid login credentials" },
      };
    },
  },
};

// replace real createClient with fake supabase client
vi.mock("@/utils/supabase/server", () => ({
  createClient: async () => fakeSupabase,
}));

// replace redirect with spy function; checks if redirect was called
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// import mocked redirect
import { redirect } from "next/navigation";

// reset mock history before each test
beforeEach(() => {
  vi.clearAllMocks();
});

// login action test 1: success case
test("loginAction redirects to /cashier on success", async () => {
  const formData = new FormData();
  formData.set("email", "valid@example.com"); // form data with valid credentials
  formData.set("password", "validpw123");

  await loginAction({ error: null }, formData);

  expect(redirect).toHaveBeenCalledTimes(1);
  expect(redirect).toHaveBeenCalledWith("/cashier");
});

//test 2: failure case
test("loginAction returns error and does not rediretc on failure", async () => {
  const formData = new FormData();
  formData.set("email", "wrong@example.com");
  formData.set("password", "waykobalo");

  const result = await loginAction({ error: null }, formData);

  expect(result).toEqual({ error: expect.stringMatching(/Invalid/) });
  expect(redirect).toHaveBeenCalledTimes(0);
});
