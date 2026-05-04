"use server";

import { fetchHistoryOrders, HistoryOrder } from "./historyActions";

// server function to fetch a single order by receipt number
export async function getReceiptOrder(receiptNo: string): Promise<HistoryOrder | null> {
  const orders = await fetchHistoryOrders();
  return orders.find((o) => o.transaction?.receipt_no === receiptNo) || null;
}
