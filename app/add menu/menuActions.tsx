"use server";

import { createClient } from "@/utils/supabase/server";

// add new item to database
export async function addMenuItem(item: {
  name: string;
  price: number;
  category: string;
  status: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .insert([item])
    .select();
  if (error) throw new Error(error.message);
  return data;
}

// update existing menu item by id
export async function updateMenuItem(
  id: number,
  item: {
    name: string;
    price: number;
    category: string;
    status: string;
  },
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .update(item)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
}

// delete menu item by id
export async function deleteMenuItem(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// get all active menu items sorted by creation time
export async function getMenuItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}
