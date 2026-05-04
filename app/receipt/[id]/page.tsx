"use client";

import { useEffect, useState, use } from "react"; 
import ReceiptCard from "./ReceiptCard";
import Link from "next/link";
import { X, History } from "lucide-react";
import { getReceiptOrder } from "../../lib/getReceiptOrder";
import { HistoryOrder } from "../../lib/historyActions";
//display and fetch a receipt page for a specific order
export default function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 
  
  const [order, setOrder] = useState<HistoryOrder | null>(null);

  useEffect(() => {
    async function load() {
      const found = await getReceiptOrder(id);
      setOrder(found);
    }
    load();
  }, [id]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5E6CA]">
        <p className="text-[#4B3832] font-black italic text-xl uppercase animate-pulse">
          Brewing Receipt Details...
        </p>
        <Link
          href="/history"
          className="mt-4 text-[#6F4E37] underline font-bold">
          Return to History
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5E6CA] p-6">
      <div className="flex items-start gap-6 relative">
        <div className="relative">
          <div className="absolute inset-0 bg-[#4B3832]/5 blur-[60px] rounded-full" />
          <div className="relative">
            <ReceiptCard order={order} />
          </div>
        </div>
        <div className="print:hidden sticky top-10">
          <Link
            href="/history"
            title="Close and Return"
            className="flex items-center justify-center w-14 h-14 bg-white hover:bg-red-500 text-[#4B3832] hover:text-white rounded-2xl shadow-xl transition-all active:scale-90 border border-[#DCC7AA]/30 group">
            <X size={28} strokeWidth={3} />
          </Link>
        </div>
      </div>

      <p className="mt-12 text-[#4B3832]/30 font-black text-[9px] uppercase tracking-[0.5em] flex items-center gap-2 print:hidden select-none">
        <History size={12} /> BrewFlow Transaction Record
      </p>
    </div>
  );
}