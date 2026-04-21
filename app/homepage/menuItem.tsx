import { Tag, Minus, Plus } from 'lucide-react';
// menu item component for displaying individual menu items in cashier dashboard
export const MenuItem = ({ item, updateQuantity }: any) => (
  <div className="bg-white p-6 rounded-[2.5rem] flex flex-col min-h-40 shadow-sm border border-[#DCC7AA] relative overflow-hidden group hover:shadow-lg transition-all">
    <div className="absolute top-0 right-0 w-20 h-20 bg-[#F5E6CA] rounded-bl-[2.5rem] -mr-8 -mt-8 group-hover:bg-[#DCC7AA] transition-colors" />
    <Tag size={32} className="absolute top-4 right-4 text-[#DCC7AA]/20 z-0" />
    <div className="relative z-10 mb-4 pr-10">
      <h3 className="font-black text-lg text-[#4B3832] leading-tight uppercase italic mb-1">{item.name}</h3>
      <div className="flex items-center gap-2">
        <span className="font-black text-md text-[#6F4E37]">₱{item.price.toFixed(2)}</span>
        <span className="text-[10px] font-black text-[#DCC7AA] uppercase tracking-widest border-l border-[#DCC7AA] pl-2">{item.category}</span>
      </div>
    </div>
    {/*quantity selector section*/}
    <div className="mt-auto flex justify-end relative z-10">
      <div className="flex items-center gap-4 bg-[#4B3832] rounded-full px-4 py-2 shadow-xl active:scale-95 transition-transform">
        <button onClick={() => updateQuantity(item.id, -1)} className="text-[#DCC7AA] hover:text-white">
          <Minus size={14} strokeWidth={3}/>
        </button>
        <span className="font-black text-sm text-white min-w-4.5 text-center">{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, 1)} className="text-[#DCC7AA] hover:text-white">
          <Plus size={14} strokeWidth={3}/>
        </button>
      </div>
    </div>
  </div>
);