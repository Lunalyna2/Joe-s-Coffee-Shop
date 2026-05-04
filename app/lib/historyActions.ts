"use server";

import { fetchOrders } from "./fetchOrders";
import { fetchTransactions } from "./fetchTransactions";
import { fetchOrderItems } from "./fetchOrderItems";
import { createClient } from "@/utils/supabase/server";
//combine orders, transactions, and order items
export interface HistoryOrder {
  id: string;
  customerName: string;
  status: string;
  orderType: string;
  cookingRequest?: string | null;
  date: string;
  transaction: {
    receipt_no: string;
    amount: number;
    cash_received: number;
    change: number;
  } | null;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
}
//fetch orders, transactions, and order items
export async function fetchHistoryOrders(): Promise<HistoryOrder[]> {
  const orders = await fetchOrders();
  const transactions = await fetchTransactions();
  const orderItems = await fetchOrderItems();

  // fetch menu_items once
  const supabase = await createClient();
  const { data: menuItems } = await supabase.from("menu_items").select("*");
//combine data into historyorder format for ui
  return orders.map((order) => {
    const tx = transactions.find((t) => t.order_id === order.id) || null;
    const items = orderItems
      .filter((i) => i.order_id === order.id)
      .map((i) => {
        const menu = menuItems?.find((m) => m.id === i.menu_item_id);
        return {
          id: i.id,
          name: menu?.name || "Unknown Item",
          price: menu?.price || 0,
          quantity: i.quantity,
          subtotal: i.subtotal,
        };
      });
   //format date and return combined order data for history page
    return {
      id: order.id,
      customerName: order.customer_name,
      status: order.status,
      orderType: order.order_type,
      cookingRequest: order.cooking_request,
      date: new Date(order.created_at).toLocaleString("en-PH", {
        timeZone: "Asia/Manila",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      transaction: tx 
        ? {
            receipt_no: tx.receipt_no,
            amount: tx.amount,
            cash_received: tx.cash_received,
            change: tx.change,
          }
        : null,
      items,
    };
  });
}
