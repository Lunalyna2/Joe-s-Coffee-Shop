'use client';

import React, { useState } from 'react';
import DashboardClient from '../homepage/dashBoardClient';
import OrderDetailsModal from '../receiptmodal/orderDetailsModal';

export default function CashierDashboard({ userEmail }: { userEmail?: string }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orderFilter, setOrderFilter] = useState('DINE IN');
  //pede mo mn addan sng more items if u want
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Matcha Latte", category: "NON-COFFEE", price: 120, quantity: 0 },
    { id: 2, name: "Choco leyt", category: "NON-COFFEE", price: 120, quantity: 0 },
    { id: 5, name: "Spanish Latte", category: "COFFEE-BASED", price: 140, quantity: 0 },
    { id: 7, name: "Classic Burger", category: "PASTA & BURGERS", price: 180, quantity: 0 },
    { id: 8, name: "Cheese Burger", category: "PASTA & BURGERS", price: 200, quantity: 0 },
    { id: 9, name: "Chocolate Cake", category: "DESSERTS & PASTRIES", price: 150, quantity: 0 },
    { id: 10, name: "Blueberry Muffin", category: "DESSERTS & PASTRIES", price: 80, quantity: 0 },
    { id: 11, name: "Espresso", category: "COFFEE-BASED", price: 100, quantity: 0 },
    { id: 12, name: "Cappuccino", category: "COFFEE-BASED", price: 130, quantity: 0 },
    { id: 13, name: "Vanilla Latte", category: "COFFEE-BASED", price: 140, quantity: 0 },
    { id: 14, name: "Caramel Macchiato", category: "COFFEE-BASED", price: 150, quantity: 0 },
    { id: 15, name: "Mocha", category: "COFFEE-BASED", price: 150, quantity: 0 },
    { id: 16, name: "Americano", category: "COFFEE-BASED", price: 110, quantity: 0 },
  ]);

  //remob if have backend
  const [orders, setOrders] = useState([
    { id: "#00001", name: "JOHN DOE", status: "IN PROGRESS", type: "DINE IN", color: "bg-[#b8d8be]" },
  ]);

  const updateQuantity = (id: number, amount: number) => {
    setMenuItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + amount);
        if (newQty > 0) setIsSidebarOpen(true);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handlePlaceOrder = (customerName: string, type: string) => {
    const newOrder = {
      id: `#${Math.floor(10000 + Math.random() * 90000)}`, 
      name: customerName.toUpperCase() || "GUEST",
      status: "IN PROGRESS",
      type: type,
      color: "bg-[#b8d8be]"
    };

    setOrders(prev => [newOrder, ...prev]);
    setMenuItems(prev => prev.map(item => ({ ...item, quantity: 0 })));
    setIsSidebarOpen(false);
    setOrderFilter(type);
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const colorMap: any = { 
      "IN PROGRESS": "bg-[#b8d8be]", 
      "READY TO SERVE": "bg-[#adcbe3]", 
      "COMPLETED": "bg-[#d1d1d1]", 
      "CANCELED": "bg-[#e5a5a5]" 
    };
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus, color: colorMap[newStatus] } : order
    ));
  };

  return (
    <main className="flex h-screen w-full overflow-hidden bg-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <DashboardClient 
            menuItems={menuItems} 
            updateQuantity={updateQuantity}
            orders={orders}
            updateOrderStatus={updateOrderStatus}
            orderFilter={orderFilter}
            setOrderFilter={setOrderFilter}/>
        </div>
      </div>

      {isSidebarOpen && (
        <aside className="w-110 h-full shrink-0 border-l border-gray-100 bg-[#B5B5B5] animate-in slide-in-from-right duration-300">
          <OrderDetailsModal 
            orderItems={menuItems.filter(i => i.quantity > 0)} 
            updateQuantity={updateQuantity}
            onPlaceOrder={handlePlaceOrder}
            onClose={() => setIsSidebarOpen(false)}/>
        </aside>
      )}
    </main>
  );
}