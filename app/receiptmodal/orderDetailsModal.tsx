"use client";

import React, { useState } from "react";
import { Utensils } from "lucide-react";
import { CheckoutItem } from "../receiptmodal/checkOutItem";
import { CheckoutHeader } from "../receiptmodal/checkOutHeader";
import { CheckoutSummary } from "../receiptmodal/checkOutSummary";
import { MenuItemWithQuantity, Order, OrderType } from "../types";

interface OrderDetailsModalProps {
  orderId: string | null;
  orderItems: MenuItemWithQuantity[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  onPlaceOrder: (
    customerName: string,
    orderType: OrderType,
    cookingRequest?: string,
  ) => Promise<Order>;
  onClose: () => void;
  onResetMenuItems: () => void;
}

//modal component for displaying order details and handling checkout process
export default function OrderDetailsModal({
  orderItems,
  updateQuantity,
  removeItem,
  onPlaceOrder,
  onClose,
  orderId,
  onResetMenuItems,
}: OrderDetailsModalProps) {
  //state for order type, customer name, cooking request, discount, payment, and editing mode
  const [orderType, setOrderType] = useState<OrderType>("dine_in");
  const [customerName, setCustomerName] = useState("");
  const [cookingRequest, setCookingRequest] = useState("");
  const [isEditingRequest, setIsEditingRequest] = useState(false);
  const [discountType, setDiscountType] = useState<"amount" | "percent">(
    "amount",
  );
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [paymentReceived, setPaymentReceived] = useState<number>(0);

  const subtotal = orderItems.reduce(
    (sum: number, item: MenuItemWithQuantity) =>
      sum + item.quantity * item.price,
    0,
  );

  const calculatedDiscount =
    discountType === "percent"
      ? subtotal * (discountValue / 100)
      : discountValue;

  const finalTotal = Math.max(0, subtotal - calculatedDiscount);
  const change =
    paymentReceived >= finalTotal ? paymentReceived - finalTotal : 0;

  return (
    <div className="h-full w-full flex flex-col bg-[#F5E6CA] overflow-hidden">
      {/*checkout header section with order type selection and customer name input*/}
      <CheckoutHeader
        orderType={orderType}
        setOrderType={setOrderType}
        customerName={customerName}
        setCustomerName={setCustomerName}
        onClose={onClose}
        onResetMenuItems={onResetMenuItems}
      />
      {/*order items section, shows message if cart is empty*/}
      <section className="flex-1 overflow-y-auto px-5 py-4 space-y-3 no-scrollbar bg-[#F5E6CA]">
        {orderItems.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-[#DCC7AA]">
            <Utensils size={48} strokeWidth={1} className="mb-2 opacity-10" />
            <p className="text-[9px] font-black tracking-widest uppercase">
              Cart is empty
            </p>
          </div>
        ) : (
          //list of checkout items with quantity controls and total price for each item
          orderItems.map((item: MenuItemWithQuantity) => (
            <CheckoutItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))
        )}
      </section>
      {/*checkout summary section with subtotal, discount, total due, payment input, and place order button*/}
      <CheckoutSummary
        subtotal={subtotal}
        finalTotal={finalTotal}
        change={change}
        discountType={discountType}
        setDiscountType={setDiscountType}
        discountValue={discountValue}
        setDiscountValue={setDiscountValue}
        paymentReceived={paymentReceived}
        setPaymentReceived={setPaymentReceived}
        cookingRequest={cookingRequest}
        setCookingRequest={setCookingRequest}
        isEditingRequest={isEditingRequest}
        setIsEditingRequest={setIsEditingRequest}
        canPlaceOrder={orderItems.length > 0 && paymentReceived >= finalTotal}
        onPlaceOrder={() =>
          onPlaceOrder(customerName, orderType, cookingRequest)
        }
      />
    </div>
  );
}
