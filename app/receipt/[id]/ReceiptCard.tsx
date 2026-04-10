"use client";

import { Printer } from "lucide-react";

export default function ReceiptCard({ order }: { order: any }) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          .print-bg-fix {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background-color: #4B3832 !important;
          }
        }
      `}</style>

      <div 
        id="printable-receipt"
        className="w-150 max-w-7xl mx-auto bg-white rounded-4xl shadow-[0_30px_60px_-15px_rgba(75,56,50,0.2)] overflow-hidden relative border border-[#DCC7AA]/20 print:rounded-none">
        <div className="bg-[#4B3832] p-10 text-center relative print-bg-fix">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="absolute rotate-45 -top-10 -left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          </div>

          <h1 className="text-white font-black text-3xl italic tracking-tighter uppercase leading-none">BrewFlow</h1>
          <div className="mt-2 inline-block px-3 py-1 bg-[#DCC7AA]/20 rounded-full border border-[#DCC7AA]/30">
              <p className="text-[#DCC7AA] text-[8px] font-black tracking-[0.4em] uppercase">Official Transaction</p>
          </div>
        </div>

        <div className="p-8 pt-10">
          <div className="flex justify-between items-start mb-10 pb-8 border-b-2 border-dashed border-[#F5E6CA]">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-[#DCC7AA] uppercase tracking-widest">Customer Name</p>
              <p className="text-xl font-black text-[#4B3832] italic uppercase">{order.customerName || "Julian"}</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-[10px] font-black text-[#DCC7AA] uppercase tracking-widest">Receipt No.</p>
              <p className="text-lg font-black text-[#4B3832] italic">#{order.receiptNo || "284749"}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[10px] font-black text-[#DCC7AA] uppercase tracking-widest">Date</p>
              <p className="text-sm font-bold text-[#4B3832]">{order.date || "March 30, 2026"}</p>
            </div>
          </div>

          <div className="mb-10">
            <p className="text-[10px] font-black text-[#4B3832] uppercase tracking-widest mb-4">Ordered Items:</p>
            <div className="space-y-3">
              {(order.items || order.itemsList || []).map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center group">
                  <span className="text-xs font-bold text-[#4B3832] uppercase italic">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-sm font-black text-[#4B3832]">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#F5E6CA]">
            {[
              { label: "Total Items", value: `${order.quantity || 0} Units` },
              { label: "Payment Method", value: order.paymentType || "Cash" },
              { label: "Cash Received", value: `₱${(order.cashReceived || 0).toFixed(2)}` },
              { label: "Change", value: `₱${(order.change || 0).toFixed(2)}` },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b border-[#F5E6CA]/60 pb-3 last:border-0">
                <span className="text-[10px] font-black text-[#4B3832]/40 uppercase tracking-widest">
                  {item.label}
                </span>
                <span className="text-xs font-black text-[#4B3832] uppercase italic">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 mb-8 bg-[#4B3832] rounded-4xl p-8 text-center shadow-xl shadow-[#4B3832]/20 print-bg-fix">
            <p className="text-[9px] font-black text-[#DCC7AA] uppercase tracking-[0.3em] mb-2 opacity-60">Total Amount Collected</p>
            <div className="flex items-center justify-center gap-1 text-white">
              <span className="text-xl font-bold opacity-50 text-[#DCC7AA]">₱</span>
              <span className="text-5xl font-black italic tracking-tighter">{(order.amount || 0).toFixed(2)}</span>
            </div>
          </div>


          <button 
            onClick={handlePrint}
            className="w-full group flex items-center justify-center gap-3 py-5 bg-[#F5E6CA] text-[#4B3832] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#DCC7AA] transition-all active:scale-[0.98] print:hidden shadow-sm">
            <Printer size={16} />
            Print Copy of Transaction
          </button>

          <p className="mt-8 text-center text-[9px] font-bold text-[#DCC7AA] uppercase tracking-widest italic">
          Thanks for brewing with us!
          </p>
        </div>
        <div className="flex justify-around px-2 -mb-2 opacity-50 print:hidden">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-[#F5E6CA] rounded-full" />
          ))}
        </div>
      </div>
    </>
  );
}