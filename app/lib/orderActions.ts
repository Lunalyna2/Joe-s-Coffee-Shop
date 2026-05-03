"use server";

import { createClient } from "@/utils/supabase/server";
import {
  Order,
  Transaction,
  OrderStatusLog,
  MenuItemWithQuantity,
  NewOrder,
} from "../types";
import { OrderStatus } from "../types/orderStatus";

// place a new order with items
export async function placeOrder(orderData: NewOrder): Promise<Order> {
  const supabase = await createClient();

  //insert new order row into orders table
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      customer_name: orderData.customer_name,
      order_type: orderData.order_type,
      status: orderData.status ?? "in_progress",
      created_at: new Date().toISOString(),
      cooking_request: orderData.cooking_request ?? null,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to place order: ${error.message}`);

  // insert related order items linked to the order
  const { error: itemsError } = await supabase.from("order_items").insert(
    orderData.items.map((item: MenuItemWithQuantity) => ({
      order_id: order.id,
      menu_item_id: item.id,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    })),
  );
  if (itemsError)
    throw new Error(`Failed to insert order items: ${itemsError.message}`);

  //fetch full order with nested items, transactions, logs
  const { data: fullOrder, error: fetchError } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (*, menu_item:menu_items (*)),
      transactions (*),
      order_status_log (*)
    `,
    )
    .eq("id", order.id)
    .single();

  if (fetchError)
    throw new Error(`Failed to fetch full order: ${fetchError.message}`);
  return fullOrder as Order;
}

// update order status and log it
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  changedBy: string,
): Promise<OrderStatusLog> {
  const supabase = await createClient();

  //update order status field in orders table
  const { error: orderError } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (orderError)
    throw new Error(`Failed to update order: ${orderError.message}`);

  //insert status change record into order_status_log
  const { data, error } = await supabase
    .from("order_status_log")
    .insert({
      order_id: orderId,
      status,
      changed_at: new Date().toISOString(),
      changed_by: changedBy,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to log status change: ${error.message}`);
  return data as OrderStatusLog;
}

// record a transaction (payment)
export async function recordTransaction(tx: {
  order_id: string;
  receipt_no: string;
  payment_method: string;
  amount: number;
  cash_received: number;
  change: number;
}): Promise<Transaction> {
  const supabase = await createClient();

  //insert new transaction row into transactions table
  const { data, error } = await supabase
    .from("transactions")
    .insert({
      ...tx,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to record transaction: ${error.message}`);
  return data as Transaction;
}

// get all orders with items, transactions, and status logs
export async function getOrders(): Promise<Order[]> {
  const supabase = await createClient();

  //fetch all orders with nested items, transactions, and logs
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        *,
        menu_item:menu_items (*)
      ),
      transactions (*),
      order_status_log (*)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to fetch orders: ${error.message}`);
  return (data as Order[]).map((order) => ({ ...order }));
}

// delete an order (and its items, logs, transactions)
export async function deleteOrder(orderId: string): Promise<void> {
  if (!orderId) {
    throw new Error("deleteOrder called without a valid orderId");
  }
  const supabase = await createClient();

  //delete related order_items for the order
  const { error: itemsError } = await supabase
    .from("order_items")
    .delete()
    .eq("order_id", orderId);
  if (itemsError)
    throw new Error(`Failed to delete order items: ${itemsError.message}`);

  // delete related transactions for the order
  const { error: txError } = await supabase
    .from("transactions")
    .delete()
    .eq("order_id", orderId);
  if (txError)
    throw new Error(`Failed to delete transactions: ${txError.message}`);

  //delete related status logs for the order
  const { error: logError } = await supabase
    .from("order_status_log")
    .delete()
    .eq("order_id", orderId);
  if (logError)
    throw new Error(`Failed to delete status logs: ${logError.message}`);

  // delete the order from orders table
  const { error: orderError } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId);
  if (orderError)
    throw new Error(`Failed to delete order: ${orderError.message}`);
}
