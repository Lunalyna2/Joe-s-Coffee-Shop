'use client';

import React, { useState } from 'react';
import { X, Minus, Plus, Check, User, UtensilsCrossed } from 'lucide-react';

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

  const totalItemsCount = orderItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
  const subtotal = orderItems.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0);
  
  const calculatedDiscount = discountType === 'percent' 
    ? (subtotal * (discountValue / 100)) 
    : discountValue;

  const finalTotal = Math.max(0, subtotal - calculatedDiscount);
  const change = paymentReceived >= finalTotal ? paymentReceived - finalTotal : 0;

  return (
    <div className="h-full w-full flex flex-col bg-[#F5E6CA] overflow-hidden">
      <section className="p-5 shrink-0 bg-[#4B3832] text-white z-20">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h1 className="font-black text-lg tracking-tighter uppercase italic">Checkout</h1>
          </div>
          <button onClick={onClose} className="text-[#DCC7AA] hover:bg-white/10 rounded-full p-1.5 transition">
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-[#F5E6CA]/10 rounded-xl p-1 border border-white/10 mb-4">
          {['DINE IN', 'TAKE OUT'].map(type => (
            <button 
              key={type}
              onClick={() => setOrderType(type)}
              className={`text-center py-2.5 rounded-lg text-[8px] font-black tracking-[0.2em] transition-all ${
                orderType === type ? 'bg-[#DCC7AA] text-[#4B3832] shadow-md' : 'text-white/40 hover:text-white'
              }`}>
              {type}
            </button>
          ))}
        </div>

        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B3832]/40" size={14} />
          <input 
            type="text" 
            placeholder="CUSTOMER NAME"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full bg-white rounded-lg pl-10 pr-4 py-3 text-[10px] font-black text-[#4B3832] outline-none placeholder:text-[#4B3832]/20 uppercase tracking-widest"/>
        </div>
      </section>
      <section className="flex-1 overflow-y-auto px-5 py-4 space-y-3 no-scrollbar bg-[#F5E6CA]">
        <div className="flex justify-between items-center text-[8px] font-black text-[#4B3832]/40 tracking-[0.3em] uppercase mb-2">
          <span className="flex items-center gap-2">Order Items</span>
          <span>{totalItemsCount} Total</span>
        </div>

        {orderItems.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-[#DCC7AA]">
             <UtensilsCrossed size={48} strokeWidth={1} className="mb-2 opacity-10" />
             <p className="text-[9px] font-black tracking-widest uppercase">Cart is empty</p>
          </div>
        ) : (
          orderItems.map((item: any) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#DCC7AA]/30">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-xs text-[#4B3832] uppercase italic leading-tight">{item.name}</h3>
                  <p className="text-[7px] font-black text-[#DCC7AA] uppercase tracking-widest mt-0.5">Quantity: {item.quantity}</p>
                </div>
                <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-[#DCC7AA] hover:text-red-500">
                  <X size={14} strokeWidth={3} />
                </button>
              </div>
              
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#F5E6CA]">
                <div className="flex items-center gap-2 bg-[#F5E6CA]/50 rounded-full p-0.5">
                  <button onClick={() => updateQuantity(item.id, -1)} className="bg-[#4B3832] text-white rounded-full p-1"><Minus size={8}/></button>
                  <span className="font-black text-[10px] min-w-4 text-center text-[#4B3832]">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="bg-[#4B3832] text-white rounded-full p-1"><Plus size={8}/></button>
                </div>
                <span className="font-black text-sm text-[#4B3832]">₱{(item.quantity * item.price).toFixed(2)}</span>
              </div>
            </div>
          ))
        )}
      </section>
      <section className="shrink-0 p-5 bg-white border-t border-[#DCC7AA] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        
        <div className="mb-3 flex justify-center">
          {!isEditingRequest ? (
            <button 
              onClick={() => setIsEditingRequest(true)} 
              className="text-[11px] font-black text-[#4B3832] flex items-center gap-1.5 uppercase tracking-widest">
              <Plus size={10} strokeWidth={3}/> {cookingRequest || "Special Request"}
            </button>
          ) : (
            <div className="flex items-center bg-[#F5E6CA] rounded-full pr-1 py-0.5 border border-[#DCC7AA]">
               <input 
                 autoFocus 
                 className="bg-transparent pl-3 text-[10px] font-black outline-none w-32 text-[#4B3832] uppercase" 
                 value={cookingRequest} 
                 onChange={(e) => setCookingRequest(e.target.value)} 
                 onBlur={() => !cookingRequest && setIsEditingRequest(false)} 
                 placeholder="NOTES"/>
               <button onClick={() => setIsEditingRequest(false)} className="bg-[#4B3832] text-white rounded-full p-1"><Check size={10} strokeWidth={3} /></button>
            </div>
          )}
        </div>

        <div className="bg-[#F5E6CA]/20 rounded-2xl p-4 border border-[#DCC7AA]/20 space-y-2">
          <div className="flex justify-between text-[11px] font-black text-[#4B3832] uppercase tracking-widest">
            <span>Subtotal</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center py-1">
             <div className="flex gap-0.5">
                <button onClick={() => setDiscountType('amount')} className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-black ${discountType === 'amount' ? 'bg-[#4B3832] text-white' : 'bg-white text-[#DCC7AA]'}`}>₱</button>
                <button onClick={() => setDiscountType('percent')} className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-black ${discountType === 'percent' ? 'bg-[#4B3832] text-white' : 'bg-white text-[#DCC7AA]'}`}>%</button>
             </div>
             <input 
                type="number"
                className="bg-white rounded w-20 text-right px-2 py-1 outline-none font-black text-[12px] text-[#4B3832] border border-[#DCC7AA]/30"
                value={discountValue || ''}
                onChange={(e) => setDiscountValue(Math.max(0, Number(e.target.value)))}
                placeholder="0.00"/>
          </div>

          <div className="flex justify-between items-end border-t border-dashed border-[#DCC7AA] pt-3 pb-1">
             <span className="text-[10px] font-black text-[#4B3832] uppercase italic tracking-widest">Total Due</span>
             <span className="text-xl font-black text-[#4B3832] leading-none tracking-tighter">₱{finalTotal.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
             <span className="text-[10px] font-black text-[#DCC7AA] uppercase tracking-widest">Cash Received</span>
             <input 
                type="number"
                className="bg-white w-40 text-right px-3 py-2 font-black text-lg text-[#4B3832] border border-[#4B3832]"
                value={paymentReceived || ''}
                onChange={(e) => setPaymentReceived(Math.max(0, Number(e.target.value)))}
                placeholder="0.00"/>
          </div>

          <div className="flex justify-between items-center pt-1">
            <span className="text-[10px] font-black text-[#DCC7AA] uppercase tracking-widest">Change</span>
            <span className="text-sm font-black text-[#6F4E37]">₱{change.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={() => onPlaceOrder(customerName, orderType)}
          disabled={orderItems.length === 0 || paymentReceived < finalTotal}
          className="w-full mt-4 bg-[#4B3832] text-[#DCC7AA] rounded-xl py-5 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-[#6F4E37] shadow-lg transition-all disabled:opacity-20 active:scale-95 mb-safe">
          {paymentReceived < finalTotal && orderItems.length > 0 ? "Insufficient Cash" : "Complete Order"}
        </button>
      </section>
    </div>
  );
}