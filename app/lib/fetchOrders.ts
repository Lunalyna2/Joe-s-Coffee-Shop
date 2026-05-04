"use server";

import { createClient } from "@/utils/supabase/server";
//server function to fetch all orders, ordered by creation date descending
export async function fetchOrders() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data || [];
}
