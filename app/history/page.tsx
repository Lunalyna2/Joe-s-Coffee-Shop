import { fetchHistoryOrders, HistoryOrder } from "../lib/historyActions";
import OrderDetailsButton from "./OrderDetailsBtn";
import { Search } from "lucide-react";

//fetches and displays order history with search functionality
export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const query = params.query || "";

  const allOrders: HistoryOrder[] = await fetchHistoryOrders();

  const filteredOrders = allOrders.filter((order: HistoryOrder) => {
    if (!query) return true;

    const s = query.toLowerCase();
  //allow search by customer name, receipt number, or date
    return (
      order.customerName.toLowerCase().includes(s) ||
      order.transaction?.receipt_no?.toLowerCase().includes(s) ||
      order.date.toLowerCase().includes(s)
    );
  });

  return (
    <div className="min-h-screen bg-[#F5E6CA] p-6 md:p-12 text-black no-scrollbar">
      <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#DCC7AA]/40">
        <div className="p-8 md:p-12 border-b border-[#F5E6CA] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <h1 className="text-[#4B3832] text-4xl font-black uppercase tracking-tighter italic">
              Transactions
            </h1>

            <p className="text-[#4B3832] font-bold text-[11px] tracking-[0.25em] uppercase mt-2 opacity-80">
              Complete Brew Log & Financial Records
            </p>
          </div>

          <div className="relative w-full lg:w-96 group">
            <form
              action="/history"
              method="GET"
              className="relative flex items-center"
            >
              {/*search section*/}
              <button
                type="submit"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DCC7AA] hover:text-black transition-colors z-10"
              >
                <Search size={20} />
              </button>

              <input
                type="text"
                name="query"
                defaultValue={query}
                placeholder="SEARCH CUSTOMER OR RECEIPT..."
                className="w-full pl-12 pr-6 py-4 bg-[#F5E6CA]/20 border-2 border-[#DCC7AA]/30 rounded-2xl text-xs font-black text-black placeholder:text-[#DCC7AA] outline-none focus:border-black focus:bg-white transition-all uppercase tracking-widest shadow-inner"
              />
            </form>
          </div>
        </div>

        {/*table section*/}
        <div className="p-4 md:p-8 overflow-x-auto">
          {filteredOrders.length > 0 ? (
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-[#4B3832] text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Receipt No.</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-right">Received</th>
                  <th className="px-4 py-2 text-right">Change</th>
                  <th className="px-4 py-2 text-center">Details</th>
                </tr>
              </thead>
              {/*list of orders with details button for each order*/}
              <tbody className="text-black">
                {filteredOrders.map((order: HistoryOrder) => (
                  <tr
                    key={order.id}
                    className="group hover:translate-x-1 transition-transform duration-200"
                  >
                    <td className="bg-[#F5E6CA]/10 px-4 py-5 rounded-l-2xl border-y border-l border-[#DCC7AA]/20 font-bold text-sm uppercase">
                      {order.date}
                    </td>

                    <td className="bg-[#F5E6CA]/10 px-4 py-5 border-y border-[#DCC7AA]/20 font-black text-sm uppercase">
                      {order.customerName}
                    </td>

                    <td className="bg-[#F5E6CA]/10 px-4 py-5 border-y border-[#DCC7AA]/20 text-xs font-black uppercase tracking-tighter opacity-70">
                      {order.orderType}
                    </td>

                    <td className="bg-[#F5E6CA]/10 px-4 py-5 border-y border-[#DCC7AA]/20 font-mono text-xs font-bold">
                      #{order.transaction?.receipt_no || "—"}
                    </td>

                    <td className="bg-[#F5E6CA]/10 px-4 py-5 border-y border-[#DCC7AA]/20 text-right text-sm font-bold">
                      {order.transaction
                        ? `₱${order.transaction.amount.toFixed(2)}`
                        : "—"}
                    </td>

                    <td className="bg-[#F5E6CA]/10 px-4 py-5 border-y border-[#DCC7AA]/20 text-right font-bold text-sm">
                      {order.transaction
                        ? `₱${order.transaction.cash_received.toFixed(2)}`
                        : "—"}
                    </td>

                    <td className="bg-[#F5E6CA]/10 px-4 py-5 border-y border-[#DCC7AA]/20 text-right font-bold text-sm text-black/60">
                      {order.transaction
                        ? `₱${order.transaction.change.toFixed(2)}`
                        : "—"}
                    </td>

                    <td className="bg-[#F5E6CA]/10 px-4 py-5 rounded-r-2xl border-y border-r border-[#DCC7AA]/20 text-center">
                      <OrderDetailsButton
                        receiptNo={order.transaction?.receipt_no || ""}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-20 text-center">
              <p className="text-[#DCC7AA] font-black uppercase tracking-[0.4em] animate-pulse">
                No Transactions Found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}