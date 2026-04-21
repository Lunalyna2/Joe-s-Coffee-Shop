'use client';

import React, { useState } from 'react';
import DashboardClient from '../homepage/dashBoardClient';
import OrderDetailsModal from '../receiptmodal/orderDetailsModal';

export default function CashierDashboard({ userEmail }: { userEmail?: string }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orderFilter, setOrderFilter] = useState('DINE IN');
  
//remob lang if butangan mo na backends
  const [menuItems, setMenuItems] = useState<any[]>([
    { id: 1, name: "Matcha Latte", category: "NON-COFFEE", price: 120, quantity: 0 },
    { id: 11, name: "Espresso", category: "COFFEE-BASED", price: 100, quantity: 0 },
    { id: 7, name: "Classic Burger", category: "PASTA & BURGERS", price: 180, quantity: 0 },
  ]);

  //store orders locally for now
  const [orders, setOrders] = useState<any[]>([]);
  const syncMenu = (updatedMenu: any[]) => {
    setMenuItems(updatedMenu);
  };
  // update quantity of menu item in order
  const updateQuantity = (id: number | string, amount: number) => {
    setMenuItems(prev => prev.map(item => {
      if (item.id === id) {
        const currentQty = item.quantity || 0;
        const newQty = Math.max(0, currentQty + amount);
        if (newQty > 0) setIsSidebarOpen(true);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };
  // handle placing order, reset menu quantities and close sidebar
  const handlePlaceOrder = (customerName: string, type: string) => {
    const newOrder = {
      id: `#${Math.floor(10000 + Math.random() * 90000)}`, 
      name: customerName.toUpperCase() || "GUEST",
      status: "IN PROGRESS",
      type: type,
      items: menuItems.filter(i => i.quantity > 0)
    };
    // add new order to state and reset menu item quantities
    setOrders(prev => [newOrder, ...prev]);
    setMenuItems(prev => prev.map(item => ({ ...item, quantity: 0 })));
    setIsSidebarOpen(false);
  };
  // update order status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <main className="flex h-screen w-full overflow-hidden bg-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/*dashboard header with user email and filter options*/}
          <DashboardClient 
            menuItems={menuItems} 
            updateQuantity={updateQuantity}
            orders={orders}
            updateOrderStatus={updateOrderStatus}
            orderFilter={orderFilter}
            setOrderFilter={setOrderFilter}
            onMenuUpdate={syncMenu} 
          />
        </div>
      </div>
      {/*sidebar for order details and placing order*/}
      {isSidebarOpen && (
        <aside className="w-100 h-full shrink-0 border-l border-gray-100 bg-[#B5B5B5] z-40">
          <OrderDetailsModal 
            orderItems={menuItems.filter(i => (i.quantity || 0) > 0)} 
            updateQuantity={updateQuantity}
            onPlaceOrder={handlePlaceOrder}
            onClose={() => setIsSidebarOpen(false)}/>
        </aside>
      )}
    </main>
  );
}