"use client";

import { ChevronDown } from "lucide-react";
import { Order } from "../types";
import { StatusOrUndo } from "../types/orderStatus";
import { statusMap } from "../types/statusMap";
import { useOrders } from "../homepage/orderContext";
interface OrderCardProps {
  order: Order;
  getStatusStyles: (status: StatusOrUndo) => string;
  statusOptions: StatusOrUndo[];
  onClick?: () => void;
  showFullDetails?: boolean;
}

export const OrderCard = ({
  order,
  getStatusStyles,
  statusOptions,
  onClick,
  showFullDetails,
}: OrderCardProps) => {
  const { updateStatus, undoStatus, canUndo } = useOrders();

  // calculate totals
  const itemCount =
    order.order_items?.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  const grandTotal =
    order.order_items?.reduce((sum, i) => sum + i.subtotal, 0) ?? 0;

  // ensure dropdown value stays consistent (avoid flicker when undo is selected)
  const currentValue: StatusOrUndo = order.status;

  return (
    <div
      className={`bg-white p-4 rounded-3xl min-w-45 shadow-sm border-2 transition-all relative
      ${
        order.status === "ready_to_serve"
          ? "border-emerald-500 shadow-emerald-500/10"
          : "border-[#DCC7AA]"
      }`}
      onClick={onClick}
    >
      {/* header */}
      <div className="flex justify-between text-[10px] font-black text-[#4B3832] mb-3 uppercase italic">
        <span className="truncate pr-2">{order.customer_name || "GUEST"}</span>
        <span className="opacity-40">#{order.id.toString().slice(-4)}</span>
      </div>

      {/* order type */}
      <p className="text-[9px] font-bold text-[#4B3832]/60 uppercase tracking-widest mb-3">
        {order.order_type === "dine_in" ? "DINE IN" : "TAKE OUT"}
      </p>

      {/* summary */}
      <p className="text-[9px] font-bold text-[#4B3832]/80 tracking-widest mb-2">
        {itemCount} ITEMS — ₱{grandTotal.toFixed(2)}
      </p>

      {/* details */}
      {showFullDetails && order.order_items && (
        <ul className="text-[9px] text-[#4B3832]/70 mb-2">
          {order.order_items.map((item) => (
            <li key={item.id}>
              {item.quantity} × {item.menu_item?.name} — ₱
              {item.subtotal.toFixed(2)}
            </li>
          ))}
        </ul>
      )}

      {/* status dropdown */}
      <div className="relative">
        <select
          aria-label="Order status"
          value={order.status}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            const selected = e.target.value as StatusOrUndo;
            if (selected === "undo") {
              undoStatus(order.id);
              e.currentTarget.value = order.status;
            } else {
              updateStatus(order, selected);
            }
          }}
          className={`w-full text-center py-2 px-3 rounded-full text-[8px] font-black appearance-none outline-none border-2 cursor-pointer transition-colors relative z-10 ${getStatusStyles(order.status)}`}
        >
          {statusOptions.map((opt) => (
            <option
              key={opt}
              value={opt}
              disabled={opt === "undo" && !canUndo(order.id)} // disable undo when no history
              className="bg-white text-[#4B3832]"
            >
              {statusMap[opt]}
            </option>
          ))}
        </select>
        <ChevronDown
          size={10}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-20 opacity-40"
        />
      </div>
    </div>
  );
};
