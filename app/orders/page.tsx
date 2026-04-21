'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ReceiptText, ClipboardList, ChevronDown } from 'lucide-react';

export default function AllOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  const statusOptions = ["IN PROGRESS", "READY TO SERVE", "COMPLETED", "CANCELED"];
  //remob if have backend
  const [orders, setOrders] = useState([
    { 
      id: "#00001", 
      name: "JOHN DOE", 
      itemsCount: 4, 
      itemsList: [
        { id: 101, name: "Cholo leyt", category: "NON-COFFEE", price: 65, quantity: 1 },
        { id: 102, name: "cheese burger", category: "PASTA & BURGERS", price: 85, quantity: 1 },
        { id: 103, name: "cappucinno", category: "COFFEE-BASED", price: 55, quantity: 1 },
        { id: 104, name: "matcha latte", category: "NON-COFFEE", price: 55, quantity: 1 },
      ],
      note: "Extra ice on the matcha please",
      total: 260,
      status: "IN PROGRESS", 
      type: "DINE IN"
    },
    { 
      id: "#00002", 
      name: "ANNA SMITH", 
      itemsCount: 1, 
      itemsList: [
        { id: 105, name: "Spanish Latte", category: "COFFEE-BASED", price: 140, quantity: 2 },
      ],
      note: "No sugar",
      total: 280,
      status: "READY TO SERVE", 
      type: "TAKE OUT"
    },
  ]);
  //update order status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prevOrders => prevOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };
  //get styles for order status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "IN PROGRESS":
        return "bg-amber-100 text-amber-900 border-amber-300 shadow-amber-900/5";
      case "READY TO SERVE":
        return "bg-emerald-100 text-emerald-900 border-emerald-400 shadow-emerald-900/10 animate-pulse-subtle";
      case "COMPLETED":
        return "bg-[#4B3832] text-[#DCC7AA] border-[#4B3832] opacity-80";
      case "CANCELED":
        return "bg-red-100 text-red-900 border-red-300 opacity-60";
      default:
        return "bg-[#F5E6CA]/50 border-[#DCC7AA] text-[#4B3832]";
    }
  };

  return (
    <main className="min-h-screen bg-[#F5E6CA] p-6 md:p-12 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#4B3832]/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto bg-white rounded-[3rem] min-h-[80vh] p-8 md:p-16 shadow-xl border border-[#DCC7AA]/30 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          {/*page header section*/}
          <div className="flex items-center gap-6">
            <Link href="/cashier" className="p-4 bg-[#F5E6CA] hover:bg-[#DCC7AA] rounded-2xl transition-all text-[#4B3832] shadow-sm group">
              <ArrowLeft size={24} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h1 className="text-[#4B3832] text-4xl font-black tracking-tighter italic uppercase">Order History</h1>
            </div>
          </div>
          {/*total transactions count*/}
          <div className="flex items-center gap-3 bg-[#4B3832] text-white px-6 py-3 rounded-2xl shadow-lg">
            <span className="text-xs font-black tracking-widest">{orders.length} TOTAL TRANSACTIONS</span>
          </div>
        </div>

        {/*orders*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-[#F5E6CA]/30 rounded-[2.5rem] p-8 flex flex-col border-2 border-[#DCC7AA]/20 hover:border-[#6F4E37] hover:shadow-xl transition-all group relative overflow-hidden">
              <ReceiptText className="absolute -right-4 -top-4 w-24 h-24 text-[#4B3832]/5 group-hover:text-[#4B3832]/10 transition-colors" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <h2 className="font-black text-lg tracking-tighter text-[#4B3832] italic">{order.name}</h2>
                <span className="font-black text-[10px] text-[#DCC7AA] tracking-widest">{order.id}</span>
              </div>
              {/*items list section*/}
              <div className="mb-6 relative z-10">
                <span className="text-[10px] font-black text-[#6F4E37] uppercase tracking-widest border-b-2 border-[#DCC7AA] pb-1">
                  {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}
                </span>
                <ul className="mt-4 space-y-1.5">
                  {order.itemsList.map((item, i) => (
                    <li key={i} className="text-[12px] font-bold text-[#4B3832]/80 flex justify-between">
                      <span className="capitalize">{item.name}</span>
                      <span className="text-[#DCC7AA]">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/*order note section*/}
              <div className="mt-auto pt-6 border-t border-[#DCC7AA]/30 space-y-4 relative z-10">
                <div className="flex justify-between items-center text-[12px] font-black">
                  <span className="text-[#DCC7AA] uppercase tracking-widest text-[10px]">Grand Total</span>
                  <span className="text-[#4B3832] text-lg">₱{order.total.toFixed(2)}</span>
                </div>
                {/*order status dropdown section*/}
                <div className="relative">
                  <select 
                    value={order.status} 
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`${getStatusStyle(order.status)} w-full py-3 px-4 rounded-xl text-[10px] font-black appearance-none outline-none border-2 cursor-pointer shadow-inner transition-all relative z-10 text-center tracking-widest uppercase`}>
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt} className="bg-white text-[#4B3832] font-bold">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20 opacity-40 text-[#4B3832]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}