import ReceiptCard from "./ReceiptCard";
import Link from "next/link";
import { X, History } from "lucide-react";
//remob if have backend
async function getOrders() {
  return [
    {
      date: "03/30/26",
      receiptNo: "24759029",
      quantity: 5,
      amount: 547,
      paymentType: "Cash",
    },
    {
      date: "03/31/26",
      receiptNo: "24759030",
      quantity: 2,
      amount: 200,
      paymentType: "Card",
    },
  ];
}
//handle print function
export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orders = await getOrders();
  const order = orders.find((o) => o.receiptNo === id);


  [/*if nothing found*/]
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5E6CA]">
        <p className="text-[#4B3832] font-black italic text-xl uppercase">Receipt not found</p>
        <Link href="/history" className="mt-4 text-[#6F4E37] underline font-bold">Return to History</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5E6CA] p-6 relative">
      {/*close button section, hidden when printing*/}
      <div className="w-full max-w-4xl flex justify-end mb-4 print:hidden">
        <Link 
          href="/history" 
          className="p-3 bg-white hover:bg-[#4B3832] text-[#4B3832] hover:text-white rounded-2xl shadow-md transition-all active:scale-95 border border-[#DCC7AA]/20 group">
          <X size={24} strokeWidth={3}/>
        </Link>
      </div>
      {/*receipt card section*/}
      <div className="relative">
        <div className="absolute inset-0 bg-[#6F4E37]/10 blur-[100px] rounded-full" />
        <ReceiptCard order={order}/>
      </div>
      {/*footer section, hidden when printing*/}
      <p className="mt-12 text-[#4B3832]/20 font-black text-[9px] uppercase tracking-[0.5em] flex items-center gap-2 print:hidden">
        <History size={12}/> BrewFlow Transaction Record
      </p>
    </div>
  );
}