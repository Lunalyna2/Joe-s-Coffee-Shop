import { test, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// api test: supabase auth api endpoint - valid  and invalid credentials

// read keys from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey); // client instance - calls auth api

const TEST_EMAIL = process.env.TEST_USER_EMAIL!; //credentials on .env.local
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD!;

// test 1: valid login -- correct credetials
test("API login succeeds with valid test user", async () => {
  //utilize real test user
  const { data, error } = await supabase.auth.signInWithPassword({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  });

  expect(error).toBeNull();
  expect(data.user?.email).toBe(TEST_EMAIL);
});

// test 2: invalid credentials - not in supabase
test("API login fails with invalid credentials", async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "wrong@example.com",
    password: "walakobalo",
  });

  expect(data.user).toBeNull(); // no user returned
  expect(error?.message).toMatch(/Invalid/);
});
