import { test, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

// api test: supabase auth api endpoint - valid  and invalid credentials

// read keys from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey); // client instance - calls auth api

const TEST_EMAIL = process.env.TEST_USER_EMAIL!; //credentials on .env.local
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD!;

// test 1: valid login -- correct credetials
test("API login succeeds with valid test user", async () => {
  //utilize test user
  const { data, error } = await supabase.auth.signInWithPassword({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  });

  expect(error).toBeNull();
  expect(data.user).not.toBeNull();
  expect(data.user?.email).toBe(TEST_EMAIL);
  expect(data.user?.id).toMatch(/[0-9a-f-]{36}/); //uuid format
});

// test 2: invalid credentials - not in supabase
test("API login fails with invalid credentials", async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "wrong@example.com",
    password: "walakobalo",
  });

  expect(data.user).toBeNull(); // no user returned
  expect(error?.message).toMatch(/Invalid/);
  expect(error).not.toBeNull();
  expect(error?.status).toBe(400); // bad login
});
