"use server";

import { createClient } from "@/utils/supabase/server";
import { MenuItem } from "../types";

// this file contains all CRUD for menu_items

// add new item to database
//omit - not pass an id when adding a new item (supabase generates it)
export async function addMenuItem(
  item: Omit<MenuItem, "id">,
): Promise<MenuItem> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .insert([item])
    .select()
    .single(); // return one row

  if (error) throw new Error(error.message);
  return data as MenuItem;
}

// update existing menu item by id
// partial - makes all fields optional
export async function updateMenuItem(
  id: string,
  item: Partial<MenuItem>,
): Promise<MenuItem> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .update(item)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as MenuItem;
}

// delete menu item by id
export async function deleteMenuItem(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// get all active menu items sorted by creation time (oldest first)
export async function getMenuItems(): Promise<MenuItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data as MenuItem[];
}
