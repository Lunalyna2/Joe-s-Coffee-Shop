import { ChevronDown } from "lucide-react";
import { Order } from "../types";
import { OrderStatus } from "../types/orderStatus";
import { statusMap } from "../types/statusMap";

// this file defines ordercard component -- displays an individual order's summary, details, and status update dropdown iin cashier dashboard

interface OrderCardProps {
  order: Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getStatusStyles: (status: OrderStatus) => string;
  statusOptions: OrderStatus[];
  onClick?: () => void;
  showFullDetails?: boolean;
}

export const OrderCard = ({
  order,
  updateOrderStatus,
  getStatusStyles,
  statusOptions,
  onClick,
  showFullDetails,
}: OrderCardProps) => {
  // calculate total item count from order items
  const itemCount =
    order.order_items?.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  //calculate ground total price from order items
  const grandTotal =
    order.order_items?.reduce((sum, i) => sum + i.subtotal, 0) ?? 0;

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
      {/* header showing customer name and order id */}
      <div className="flex justify-between text-[10px] font-black text-[#4B3832] mb-3 uppercase italic">
        <span className="truncate pr-2">{order.customer_name || "GUEST"}</span>
        <span className="opacity-40">#{order.id.toString().slice(-4)}</span>
      </div>
      {/* order type (dine in or take out) */}
      <p className="text-[9px] font-bold text-[#4B3832]/60 uppercase tracking-widest mb-3">
        {order.order_type === "dine_in" ? "DINE IN" : "TAKE OUT"}
      </p>

      {/* summary line showing item count and grand total */}
      <p className="text-[9px] font-bold text-[#4B3832]/80 tracking-widest mb-2">
        {itemCount} ITEMS — ₱{grandTotal.toFixed(2)}
      </p>

      {/* detailed item list, shown only when showFullDetails is true */}
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

      {/* status dropdown for updating order status */}
      <div className="relative">
        <select
          value={order.status}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation(); //prevent card click from firing
            updateOrderStatus(order.id, e.target.value as OrderStatus);
          }}
          className={`w-full text-center py-2 px-3 rounded-full text-[8px] font-black appearance-none outline-none border-2 cursor-pointer transition-colors relative z-10 ${getStatusStyles(
            order.status,
          )}`}
        >
          {/* render status options with labels */}
          {statusOptions.map((opt: OrderStatus) => (
            <option key={opt} value={opt} className="bg-white text-[#4B3832]">
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
