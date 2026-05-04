"use client";

import { Printer } from "lucide-react";
//display component for the receipt card
export default function ReceiptCard({ order }: { order: any }) {
  const transaction = order?.transaction || {}; 
  const items = order?.items || order?.itemsList || [];
  
  const receiptNo = transaction.receipt_no || order.receiptNo || "000000";
  const amount = transaction.amount || order.amount || 0;
  const cashReceived = transaction.cash_received || order.cashReceived || 0;
  const change = transaction.change || order.change || 0;
  const paymentMethod = transaction.payment_method || order.paymentType || "CASH";
  //trigger print dialog 
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <>
       <style jsx global>{`
       @media print {

          body {
            background: white !important;
          }

          #printable-receipt {
            box-shadow: none !important;
            border: none !important;
          }

          .print-bg-brown {
            background-color: #4B3832 !important;
            color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>
      {/*main receipt card container*/}
      <div 
        id="printable-receipt"
        className="w-150 mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border border-[#DCC7AA]/30">
        <div className="bg-[#4B3832] p-12 text-center print-bg-brown">
          <h1 className="text-white font-black text-5xl italic tracking-tighter uppercase leading-none">
            BrewFlow
          </h1>
          <div className="mt-3 inline-block px-6 py-1.5 bg-white/10 rounded-full border border-white/20">
            <p className="text-[#DCC7AA] text-[10px] font-black tracking-[0.5em] uppercase">
              Official Transaction
            </p>
          </div>
        </div>

        <div className="p-12">
          {/*grid details*/}
          <div className="flex justify-between items-start gap-6 mb-5 pb-6 border-b-2 border-dashed border-[#F5E6CA]">
            <div className="max-w-200">
              <p className="text-xs font-black text-[#DCC7AA] uppercase tracking-widest mb-1">Customer</p>
              <p className="text-[17px] font-black text-black uppercase leading-tight wrap-break-words">
                {order.customerName || "Guest"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-black text-[#DCC7AA] uppercase tracking-widest mb-1">Receipt</p>
              <p className="text-[15px] font-black text-black">#{receiptNo}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-[#DCC7AA] uppercase tracking-widest mb-1">Date</p>
              <p className="text-[15px] font-bold text-black">{order.date}</p>
            </div>
          </div>

          {/*items table*/}
          <div className="mb-5">
            <p className="text-xs font-black text-black uppercase tracking-[0.25em] mb-6">Ordered Items</p>
            <div className="space-y-6">
              {items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-end border-b border-[#F5E6CA]/50 pb-2 gap-4">
                  <div className="flex flex-col flex-1">
                    <span className="text-xs font-black text-black uppercase italic wrap-break-words leading-snug">
                      {item.name}
                    </span>
                    <span className="text-[11px] font-bold text-[#DCC7AA]">
                      Quantity: {item.quantity} Unit(s)
                    </span>
                  </div>
                  <span className="text-sm font-black text-black whitespace-nowrap">
                    ₱{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/*payment stuff*/}
          <div className="bg-[#F5E6CA]/20 rounded-3xl p-6 space-y-4 mb-8">
            <div className="flex justify-between items-center text-xs font-bold uppercase text-[#4B3832]">
              <span>Payment Method</span>
              <span className="font-black text-black text-sm">{paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold uppercase text-[#4B3832]">
              <span>Cash Received</span>
              <span className="font-black text-black text-sm">₱{cashReceived.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-[12px] font-bold uppercase text-[#4B3832]">
              <span>Change Due</span>
              <span className="font-black text-black text-sm">₱{change.toFixed(2)}</span>
            </div>
          </div>

          {/*grand total*/}
          <div className="bg-[#4B3832] rounded-[2.5rem] p-5 text-center print-bg-brown">
            <p className="text-xs font-black text-[#DCC7AA] uppercase tracking-[0.3em] mb-3 opacity-70">
              Grand Total Collected
            </p>
            <div className="flex items-center justify-center text-white">
              <span className="text-3xl font-black italic tracking-tighter">
                ₱{amount.toFixed(2)}
              </span>
            </div>
          </div>
           {/*print button, hidden when printing*/}
          <div className="mt-8 no-print">
            <button 
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-4 py-6 bg-[#4B3832] text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-[#4B3832] transition-all active:scale-95 shadow-2xl"
            >
              <Printer size={20} />
              Print Official Receipt
            </button>
            {/*thank you note, hidden when printing*/}
            <p className="mt-8 text-center text-[10px] font-bold text-[#cfab78] uppercase tracking-widest italic">
              Thanks for brewing with us!
            </p>
          </div>
        </div>
        
        {/*design, hidden when printing*/}
        <div className="flex justify-around px-6 -mb-4 no-print">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-[#F5E6CA] rounded-full" />
          ))}
        </div>
      </div>
    </>
  );
}