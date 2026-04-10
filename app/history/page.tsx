import OrderDetailsButton from "./OrderDetailsBtn";
import { Calendar, Receipt, CreditCard, Search } from "lucide-react";

async function getOrders() {
  // change to fetch from supabase when connected to db
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

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const allOrders = await getOrders();
  const filteredOrders = allOrders.filter((order) => {
    if (!query) return true;
    const s = query.toLowerCase();
    return (
      order.receiptNo.toLowerCase().includes(s) || 
      order.date.toLowerCase().includes(s)
    );
  });

  return (
    <div className="min-h-screen bg-[#F5E6CA] p-8 md:p-12 no-scrollbar">
      <div className="w-full mx-auto bg-white rounded-[3rem] shadow-xl overflow-hidden border border-[#DCC7AA]/30">
        <div className="p-10 border-b border-[#F5E6CA] bg-white flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-[#4B3832] text-4xl font-black tracking-tighter italic uppercase">
                Transaction History
              </h1>
            </div>
            <p className="text-[#DCC7AA] font-black text-[10px] tracking-[0.2em] uppercase ml-2">
              Reviewing all past brewed orders
            </p>
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DCC7AA] group-focus-within:text-[#4B3832] transition-colors" size={18} />
            <form action="/history" method="GET">
               <input 
                type="text"
                name="query"
                defaultValue={query}
                placeholder="SEARCH BY DATE OR RECEIPT NUMBER"
                className="w-full pl-12 pr-6 py-4 bg-[#F5E6CA]/30 border-2 border-transparent focus:border-[#4B3832] focus:bg-white rounded-2xl text-xs font-black text-[#4B3832] placeholder:text-[#DCC7AA] transition-all outline-none uppercase tracking-widest shadow-inner"/>
            </form>
          </div>
        </div>

        <div className="p-6 md:p-10 overflow-x-auto">
          {filteredOrders.length > 0 ? (
            <table className="w-full border-separate border-spacing-y-4">
              <thead>
                <tr className="text-[#4B3832] text-[11px] font-black uppercase tracking-widest">
                  <th className="py-4 px-6 text-left"><span className="flex items-center gap-2"><Calendar size={14}/> Date</span></th>
                  <th className="py-4 px-6 text-left"><span className="flex items-center gap-2"><Receipt size={14}/> Receipt No.</span></th>
                  <th className="py-4 px-6 text-center">Qty</th>
                  <th className="py-4 px-6 text-right">Amount</th>
                  <th className="py-4 px-6 text-center"><span className="flex items-center justify-center gap-2"><CreditCard size={14}/> Payment</span></th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.receiptNo} className="group transition-all">
                    <td className="py-5 px-6 text-sm font-bold text-[#4B3832] bg-[#F5E6CA]/30 rounded-l-3xl border-y border-l border-[#DCC7AA]/20 group-hover:bg-[#F5E6CA]/60">
                      {order.date}
                    </td>
                    <td className="py-5 px-6 text-sm font-black text-[#6F4E37] bg-[#F5E6CA]/30 border-y border-[#DCC7AA]/20 group-hover:bg-[#F5E6CA]/60">
                      #{order.receiptNo}
                    </td>
                    <td className="py-5 px-6 text-sm font-bold text-center text-[#4B3832] bg-[#F5E6CA]/30 border-y border-[#DCC7AA]/20 group-hover:bg-[#F5E6CA]/60">
                      {order.quantity}
                    </td>
                    <td className="py-5 px-6 text-sm font-black text-right text-[#4B3832] bg-[#F5E6CA]/30 border-y border-[#DCC7AA]/20 group-hover:bg-[#F5E6CA]/60">
                      ₱{order.amount.toFixed(2)}
                    </td>
                    <td className="py-5 px-6 bg-[#F5E6CA]/30 border-y border-[#DCC7AA]/20 group-hover:bg-[#F5E6CA]/60">
                      <div className="flex justify-center">
                        <span className="px-4 py-1 bg-white border border-[#DCC7AA] text-[#4B3832] rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                          {order.paymentType}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-right bg-[#F5E6CA]/30 rounded-r-3xl border-y border-r border-[#DCC7AA]/20 group-hover:bg-[#F5E6CA]/60">
                      <OrderDetailsButton receiptNo={order.receiptNo} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-20 text-center">
              <p className="text-[#DCC7AA] font-black uppercase tracking-[0.3em]">No Transactions Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}