"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Order } from "../types";
import { getOrders, updateOrderStatus } from "../lib/orderActions";
import { OrderStatus } from "../types/orderStatus";
import { OrderCard } from "../homepage/orderCard";

// this file is the main page component for viewing all orders

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const statusOptions: Exclude<OrderStatus, "draft">[] = [
    "in_progress",
    "ready_to_serve",
    "completed",
    "canceled",
  ];
  //fetch all orders on mount
  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        alert("Unable to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  // handler to update order status and refresh list
  const handleStatusChange = async (
    orderId: string,
    newStatus: Order["status"],
  ) => {
    try {
      await updateOrderStatus(orderId, newStatus, "Cashier"); // changedBy = current user
      const updatedOrders = await getOrders();
      setOrders(updatedOrders);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Unable to update order status.");
    }
  };

  //get styles for order status
  const getStatusStyle = (status: Order["status"]) => {
    switch (status) {
      case "in_progress":
        return "bg-amber-100 text-amber-900 border-amber-300 shadow-amber-900/5";
      case "ready_to_serve":
        return "bg-emerald-100 text-emerald-900 border-emerald-400 shadow-emerald-900/10 animate-pulse-subtle";
      case "completed":
        return "bg-[#4B3832] text-[#DCC7AA] border-[#4B3832] opacity-80";
      case "canceled":
        return "bg-red-100 text-red-900 border-red-300 opacity-60";
      default:
        return "bg-[#F5E6CA]/50 border-[#DCC7AA] text-[#4B3832]";
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F5E6CA]">
        <p className="text-[#4B3832] font-bold">Loading orders...</p>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#F5E6CA] p-6 md:p-12 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#4B3832]/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto bg-white rounded-[3rem] min-h-[80vh] p-8 md:p-16 shadow-xl border border-[#DCC7AA]/30 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          {/*page header section*/}
          <div className="flex items-center gap-6">
            <Link
              href="/cashier"
              className="p-4 bg-[#F5E6CA] hover:bg-[#DCC7AA] rounded-2xl transition-all text-[#4B3832] shadow-sm group"
            >
              <ArrowLeft
                size={24}
                strokeWidth={3}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </Link>
            <div>
              <h1 className="text-[#4B3832] text-4xl font-black tracking-tighter italic uppercase">
                Order History
              </h1>
            </div>
          </div>
          {/*total transactions count*/}
          <div className="flex items-center gap-3 bg-[#4B3832] text-white px-6 py-3 rounded-2xl shadow-lg">
            <span className="text-xs font-black tracking-widest">
              {orders.length} TOTAL TRANSACTIONS
            </span>
          </div>
        </div>

        {/*orders*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              updateOrderStatus={handleStatusChange}
              getStatusStyles={getStatusStyle}
              statusOptions={statusOptions}
              showFullDetails={true}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
