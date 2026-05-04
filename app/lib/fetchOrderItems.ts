"use server";

import { createClient } from "@/utils/supabase/server";
//server function to fetch all order items
export async function fetchOrderItems() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("order_items")
    .select("*");

  if (error) {
    console.error("Error fetching order_items:", error);
    return [];
  }

  return data || [];
}
