import { test, expect, beforeEach, afterEach } from "vitest";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

// supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const TABLE = "menu_items";

// clean up before each test to avoid leftover rows
beforeEach(async () => {
  await supabase.from(TABLE).delete().like("name", "%Item%");
});
afterEach(async () => {
  await supabase.from(TABLE).delete().like("name", "%Item%");
});

test("happy path: API addMenuItem inserts a row", async () => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([
      {
        name: "Test Item",
        price: 9.99,
        category: "coffee",
        status: "active",
      },
    ])
    .select()
    .single();

  expect(error).toBeNull();
  expect(data?.name).toBe("Test Item");
  expect(data?.status).toBe("active");
});

test("happy path: API getMenuItems retrieves rows", async () => {
  const { data, error } = await supabase.from(TABLE).select("*");

  expect(error).toBeNull();
  expect(Array.isArray(data)).toBe(true);
});

test("happy path: API updateMenuItem modifies a row", async () => {
  // insert first so we have a row to update
  const { data: inserted } = await supabase
    .from(TABLE)
    .insert([
      {
        name: "Test Item",
        price: 9.99,
        category: "coffee",
        status: "active",
      },
    ])
    .select()
    .single();

  const { data, error } = await supabase
    .from(TABLE)
    .update({ price: 12.99 })
    .eq("id", inserted?.id) // safer to update by id
    .select()
    .maybeSingle();

  expect(error).toBeNull();
  expect(data?.price).toBe(12.99);
});

test("happy path: API deleteMenuItem removes a row", async () => {
  // insert first so we have a row to delete
  const { data: inserted } = await supabase
    .from(TABLE)
    .insert([
      {
        name: "Test Item",
        price: 9.99,
        category: "coffee",
        status: "active",
      },
    ])
    .select()
    .single();

  const { error } = await supabase.from(TABLE).delete().eq("id", inserted?.id);
  expect(error).toBeNull();

  // verify deletion
  const { data } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", inserted?.id);
  expect(data?.length).toBe(0);
});

// relaxed type for testing invalid inserts
type TestInsert = {
  name?: string;
  price?: number;
  category?: string;
  status?: string;
};

test("sad path: insert invalid category", async () => {
  const badItem: TestInsert = {
    name: "Bad Item",
    price: 5.0,
    category: "Drinks", //  not allowed category
    status: "active",
  };

  const { error } = await supabase.from(TABLE).insert([badItem]);
  expect(error).not.toBeNull();
  expect(error?.code).toBe("23514"); // check constraint violation
});

test("sad path: insert missing name", async () => {
  const badItem: TestInsert = {
    price: 5.0,
    category: "coffee",
    status: "active",
  };

  const { error } = await supabase.from(TABLE).insert([badItem]);
  expect(error).not.toBeNull();
  expect(error?.code).toBe("23502"); // not-null violation
});

test("sad path: insert invalid status", async () => {
  const badItem: TestInsert = {
    name: "Bad Status Item",
    price: 5.0,
    category: "coffee",
    status: "available", // not in union ("active"|"hidden")
  };

  const { error } = await supabase.from(TABLE).insert([badItem]);
  expect(error).not.toBeNull();
  expect(error?.code).toBe("23514"); // check constraint violation
});

// sad path: insert duplicate name (unique violation)
test("sad path: insert duplicate name", async () => {
  const item = {
    name: "Duplicate Item",
    price: 4.5,
    category: "coffee",
    status: "active",
  };

  await supabase.from(TABLE).insert([item]);
  const { error } = await supabase.from(TABLE).insert([item]);

  expect(error).not.toBeNull();
  expect(error?.code).toMatch("23505"); // unique constraint violation
});
