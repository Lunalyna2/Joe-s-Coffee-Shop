import { X, User } from 'lucide-react';
//checkout header component for the receipt modal
export const CheckoutHeader = ({ 
  orderType, 
  setOrderType, 
  customerName, 
  setCustomerName, 
  onClose 
}: any) => (
  //section container with close button, order type selection, and customer name input
  <section className="p-5 shrink-0 bg-[#4B3832] text-white z-20">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <h1 className="font-black text-lg tracking-tighter uppercase italic">Checkout</h1>
      </div>
      <button onClick={onClose} className="text-[#DCC7AA] hover:bg-white/10 rounded-full p-1.5 transition">
        <X size={20} strokeWidth={3} />
      </button>
    </div>
    
    <div className="grid grid-cols-2 gap-2 bg-[#F5E6CA]/10 rounded-xl p-1 border border-white/10 mb-4">
      {['DINE IN', 'TAKE OUT'].map(type => (
        <button 
          key={type}
          onClick={() => setOrderType(type)}
          className={`text-center py-2.5 rounded-lg text-[8px] font-black tracking-[0.2em] transition-all ${
            orderType === type ? 'bg-[#DCC7AA] text-[#4B3832] shadow-md' : 'text-white/40 hover:text-white'}`}>
          {type}
        </button>
      ))}
    </div>
    
    <div className="relative group">
      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B3832]/40" size={14} />
      <input 
        type="text" 
        placeholder="CUSTOMER NAME"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="w-full bg-white rounded-lg pl-10 pr-4 py-3 text-[10px] font-black text-[#4B3832] outline-none placeholder:text-[#4B3832]/20 uppercase tracking-widest"/>
    </div>
  </section>
);