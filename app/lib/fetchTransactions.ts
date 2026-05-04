"use server";

import { createClient } from "@/utils/supabase/server";
//server function to fetch all transactions
export async function fetchTransactions() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select("*");

  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }

  return data || [];
}
