import { X, Minus, Plus } from 'lucide-react';
//checkout item component for the receipt modal
export const CheckoutItem = ({ item, updateQuantity }: any) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#DCC7AA]/30">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-black text-xs text-[#4B3832] uppercase italic leading-tight">{item.name}</h3>
        <p className="text-[7px] font-black text-[#DCC7AA] uppercase tracking-widest mt-0.5">Quantity: {item.quantity}</p>
      </div>
      <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-[#DCC7AA] hover:text-red-500">
        <X size={14} strokeWidth={3} />
      </button>
    </div>
    {/*quantity selector and total price section*/}
    <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#F5E6CA]">
      <div className="flex items-center gap-2 bg-[#F5E6CA]/50 rounded-full p-0.5">
        <button onClick={() => updateQuantity(item.id, -1)} className="bg-[#4B3832] text-white rounded-full p-1"><Minus size={8}/></button>
        <span className="font-black text-[10px] min-w-4 text-center text-[#4B3832]">{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, 1)} className="bg-[#4B3832] text-white rounded-full p-1"><Plus size={8}/></button>
      </div>
      <span className="font-black text-sm text-[#4B3832]">₱{(item.quantity * item.price).toFixed(2)}</span>
    </div>
  </div>
);