'use client';

import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { CheckoutItem } from '../receiptmodal/checkOutItem';
import { CheckoutHeader } from '../receiptmodal/checkOutHeader';
import { CheckoutSummary } from '../receiptmodal/checkOutSummary';

export default function OrderDetailsModal({ 
  orderItems, 
  updateQuantity, 
  onPlaceOrder, 
  onClose 
}: any) {
  const [orderType, setOrderType] = useState('DINE IN');
  const [customerName, setCustomerName] = useState("");
  const [cookingRequest, setCookingRequest] = useState("");
  const [isEditingRequest, setIsEditingRequest] = useState(false);
  
  const [discountType, setDiscountType] = useState<'amount' | 'percent'>('amount');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [paymentReceived, setPaymentReceived] = useState<number>(0);
  
  const subtotal = orderItems.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0);
  
  const calculatedDiscount = discountType === 'percent' 
    ? (subtotal * (discountValue / 100)) 
    : discountValue;

  const finalTotal = Math.max(0, subtotal - calculatedDiscount);
  const change = paymentReceived >= finalTotal ? paymentReceived - finalTotal : 0;

  return (
    <div className="h-full w-full flex flex-col bg-[#F5E6CA] overflow-hidden">
      
      <CheckoutHeader 
        orderType={orderType} 
        setOrderType={setOrderType} 
        customerName={customerName}
        setCustomerName={setCustomerName}
        onClose={onClose}/>

      <section className="flex-1 overflow-y-auto px-5 py-4 space-y-3 no-scrollbar bg-[#F5E6CA]">
        {orderItems.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-[#DCC7AA]">
             <UtensilsCrossed size={48} strokeWidth={1} className="mb-2 opacity-10" />
             <p className="text-[9px] font-black tracking-widest uppercase">Cart is empty</p>
          </div>
        ) : (
          orderItems.map((item: any) => (
            <CheckoutItem 
              key={item.id} 
              item={item} 
              updateQuantity={updateQuantity}/>
          ))
        )}
      </section>

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
        onPlaceOrder={() => onPlaceOrder(customerName, orderType, cookingRequest)}/>
    
    </div>
  );
}