"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useOrders } from "../homepage/orderContext";
import { OrderCard } from "../homepage/orderCard";
import { STATUS_OPTIONS } from "../types/statusOptions";
import { getStatusStyle } from "../types/statusStyles";

export default function AllOrdersPage() {
  const { orders } = useOrders();

  return (
    <main className="min-h-screen bg-[#F5E6CA] p-6 md:p-12 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#4B3832]/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto bg-white rounded-[3rem] min-h-[80vh] p-8 md:p-16 shadow-xl border border-[#DCC7AA]/30 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          {/* page header */}
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
          {/* total transactions */}
          <div className="flex items-center gap-3 bg-[#4B3832] text-white px-6 py-3 rounded-2xl shadow-lg">
            <span className="text-xs font-black tracking-widest">
              {orders.length} TOTAL TRANSACTIONS
            </span>
          </div>
        </div>

        {/* orders grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              getStatusStyles={getStatusStyle}
              statusOptions={STATUS_OPTIONS}
              showFullDetails={true}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
