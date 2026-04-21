import { ChevronDown } from 'lucide-react';
//order card component for displaying individual orders in cashier dashboard with status update functionality
export const OrderCard = ({ order, updateOrderStatus, getStatusStyles, statusOptions }: any) => (
  <div className={`bg-white p-4 rounded-3xl min-w-45 shadow-sm border-2 transition-all relative
    ${order.status === "READY TO SERVE" ? "border-emerald-500 shadow-emerald-500/10" : "border-[#DCC7AA]"}`}>
    <div className="flex justify-between text-[10px] font-black text-[#4B3832] mb-3 uppercase italic">
      <span className="truncate pr-2">{order.name || "GUEST"}</span>
      <span className="opacity-40">#{order.id.toString().slice(-4)}</span>
    </div>
    {/*order details section*/}
    <div className="relative">
      <select 
        value={order.status} 
        onChange={(e) => updateOrderStatus(order.id, e.target.value)} 
        className={`w-full text-center py-2 px-3 rounded-full text-[8px] font-black appearance-none outline-none border-2 cursor-pointer transition-colors relative z-10 ${getStatusStyles(order.status)}`}>
        {statusOptions.map((opt: string) => (
          <option key={opt} value={opt} className="bg-white text-[#4B3832]">{opt}</option>
        ))}
      </select>
      <ChevronDown size={10} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-20 opacity-40" />
    </div>
  </div>
);