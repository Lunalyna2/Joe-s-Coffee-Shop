"use server";

import { createClient } from "@/utils/supabase/server";
import {
  Order,
  Transaction,
  OrderStatusLog,
  MenuItemWithQuantity,
  NewOrder,
  PaymentInfo, //added paymentinfo type for transaction details
} from "../types";
import { OrderStatus } from "../types/orderStatus";

// place a new order with items
export async function placeOrder(orderData: NewOrder): Promise<Order> {
  const supabase = await createClient();

  const normalizedStatus =
    orderData.status === "draft"
      ? "in_progress"
      : (orderData.status ?? "in_progress");

  //insert new order row into orders table
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      customer_name: orderData.customer_name,
      order_type: orderData.order_type,
      status: normalizedStatus,
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

  //record transaction immediately after order placement
  if (orderData.payment) {
    const { error: txError } = await supabase.from("transactions").insert({
      order_id: order.id,
      receipt_no: orderData.payment.receipt_no,
      amount: orderData.payment.amount,
      cash_received: orderData.payment.cash_received,
      change: orderData.payment.change,
      created_at: new Date().toISOString(),
    });

    if (txError)
      throw new Error(`Failed to record transaction: ${txError.message}`);
  }

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

  // update the order status in the orders table
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
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to log status change: ${error.message}`);
  return data as OrderStatusLog;
}

// record a transaction (payment)
export async function recordTransaction(
  tx: PaymentInfo & { order_id: string },
): Promise<Transaction> {
  const supabase = await createClient();

  //insert new transaction record linked to the order
  const { data, error } = await supabase
    .from("transactions")
    .insert({
      order_id: tx.order_id,
      receipt_no: tx.receipt_no,
      amount: tx.amount,
      cash_received: tx.cash_received,
      change: tx.change,
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

  // delete related transactions for the order
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
