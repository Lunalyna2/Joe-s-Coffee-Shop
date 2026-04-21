// menuActions.test.ts
import { test, expect, vi, beforeEach } from "vitest";
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItems,
} from "../app/add menu/menuActions";

// union type for supabasse responses (success or error)
type SupabaseResponse<T> =
  | { data: T; error: null }
  | { data: null; error: { message: string } };

// row type for menu_items
type MenuItem = { id: number; name: string };

// fake supabase client to override per test
let fakeSupabase: any = {
  from: () => ({
    insert: () => ({
      select: async (): Promise<SupabaseResponse<MenuItem[]>> => ({
        data: [{ id: 1, name: "Latte" }],
        error: null,
      }),
    }),
    update: () => ({
      eq: () => ({
        select: async (): Promise<SupabaseResponse<MenuItem[]>> => ({
          data: [{ id: 1, name: "Updated Latte" }],
          error: null,
        }),
      }),
    }),
    delete: () => ({
      eq: async (): Promise<SupabaseResponse<null>> => ({
        data: null,
        error: null,
      }),
    }),
    select: () => ({
      order: async (): Promise<SupabaseResponse<MenuItem[]>> => ({
        data: [{ id: 1, name: "Latte" }],
        error: null,
      }),
    }),
  }),
};

// mock createClient to return fakeSupabase
vi.mock("@/utils/supabase/server", () => ({
  createClient: async () => fakeSupabase,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

// success cases

//test 1: verify insert returns new row
test("addMenuItem returns inserted data", async () => {
  const result = await addMenuItem({
    name: "Latte",
    price: 100,
    category: "Coffee",
    status: "active",
  });
  expect(result[0]).toMatchObject({ id: 1, name: "Latte" });
});

//test 2: verify update returns updated row
test("updateMenuItem returns updated data", async () => {
  const result = await updateMenuItem(1, {
    name: "Updated Latte",
    price: 120,
    category: "Coffee",
    status: "active",
  });
  expect(result[0]).toMatchObject({ id: 1, name: "Updated Latte" });
});

//test 3: verify delete resolves successfully
test("deleteMenuItem succeeds without error", async () => {
  await expect(deleteMenuItem(1)).resolves.not.toThrow();
});

//test4: verify select returns array of rows
test("getMenuItems returns sorted data", async () => {
  const result = await getMenuItems();
  expect(Array.isArray(result)).toBe(true);
  expect(result[0]).toMatchObject({ id: 1, name: "Latte" });
});

// error cases

//test 5: verify insert throws on error
test("addMenuItem throws on Supabase error", async () => {
  fakeSupabase.from = () => ({
    insert: () => ({
      select: async (): Promise<SupabaseResponse<MenuItem[]>> => ({
        data: null,
        error: { message: "Insert failed" },
      }),
    }),
  });

  await expect(
    addMenuItem({
      name: "Latte",
      price: 100,
      category: "Coffee",
      status: "active",
    }),
  ).rejects.toThrow("Insert failed");
});

//test6: verify update throws on error
test("updateMenuItem throws on Supabase error", async () => {
  fakeSupabase.from = () => ({
    update: () => ({
      eq: () => ({
        select: async (): Promise<SupabaseResponse<MenuItem[]>> => ({
          data: null,
          error: { message: "Update failed" },
        }),
      }),
    }),
  });

  await expect(
    updateMenuItem(1, {
      name: "Latte",
      price: 100,
      category: "Coffee",
      status: "active",
    }),
  ).rejects.toThrow("Update failed");
});

//test 7: verify delete throws on error
test("deleteMenuItem throws on Supabase error", async () => {
  fakeSupabase.from = () => ({
    delete: () => ({
      eq: async (): Promise<SupabaseResponse<null>> => ({
        data: null,
        error: { message: "Delete failed" },
      }),
    }),
  });

  await expect(deleteMenuItem(1)).rejects.toThrow("Delete failed");
});

//test8: verify select throws on error
test("getMenuItems throws on Supabase error", async () => {
  fakeSupabase.from = () => ({
    select: () => ({
      order: async (): Promise<SupabaseResponse<MenuItem[]>> => ({
        data: null,
        error: { message: "Select failed" },
      }),
    }),
  });

  await expect(getMenuItems()).rejects.toThrow("Select failed");
});
