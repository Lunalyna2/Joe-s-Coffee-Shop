'use client';

import React, { useState } from 'react';
import { Search, Layers, GlassWater, Coffee, Utensils, CakeSlice } from 'lucide-react';
import { MenuItem } from './menuItem';
import { OrderCard } from './orderCard';  
import Link from 'next/link'; 
import { AddMenuModal } from '../add menu/addMenuModal';

export default function DashboardClient({ 
  menuItems, 
  updateQuantity, 
  orders, 
  updateOrderStatus, 
  orderFilter, 
  setOrderFilter,
  onMenuUpdate 
}: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const categories = ["ALL", "NON-COFFEE", "COFFEE-BASED", "PASTA & BURGERS", "DESSERTS & PASTRIES"];
  
  const categoryIcons: any = {
    "ALL": <Layers size={14} />,
    "NON-COFFEE": <GlassWater size={14} />,
    "COFFEE-BASED": <Coffee size={14} />,
    "PASTA & BURGERS": <Utensils size={14} />, 
    "DESSERTS & PASTRIES": <CakeSlice size={14} />
  };

  const statusOptions = ["IN PROGRESS", "READY TO SERVE", "COMPLETED", "CANCELED"];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "IN PROGRESS": return "bg-amber-100 text-amber-900 border-amber-300 shadow-amber-900/5";
      case "READY TO SERVE": return "bg-emerald-100 text-emerald-900 border-emerald-400 shadow-emerald-900/10 animate-pulse-subtle";
      case "COMPLETED": return "bg-[#4B3832] text-[#DCC7AA] border-[#4B3832] opacity-80";
      case "CANCELED": return "bg-red-100 text-red-900 border-red-300 opacity-60";
      default: return "bg-[#F5E6CA]/50 border-[#DCC7AA] text-[#4B3832]";
    }
  };

  const filteredOrders = orders.filter((o: any) => o.type === orderFilter);
  
  const filteredMenu = menuItems.filter((item: any) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "ALL" || item.category === activeCategory;
    const isAvailable = item.available !== false; 
    return matchesSearch && matchesCategory && isAvailable;
  });

  return (
    <div className="bg-[#F5E6CA] min-h-screen pb-16 relative overflow-x-hidden font-sans">
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#4B3832]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-48 w-96 h-96 bg-[#DCC7AA]/20 rounded-full blur-3xl pointer-events-none" />
      {/*orders section*/}
      <section className="p-4 md:p-6 border-b border-[#4B3832]/10 bg-white/20 backdrop-blur-md sticky top-0 z-30 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-6">
              <h2 className="font-black text-xl tracking-[0.2em] text-[#4B3832] uppercase italic shrink-0">
                Order Line
              </h2>
              {/*ordertype*/}
              <div className="flex bg-[#4B3832] rounded-full p-1 shadow-lg border border-[#DCC7AA]/20">
                {["DINE IN", "TAKE OUT"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderFilter(type)}
                    className={`px-6 py-2 rounded-full text-[8px] font-black transition-all tracking-widest uppercase whitespace-nowrap ${
                      orderFilter === type 
                      ? 'bg-[#DCC7AA] text-[#4B3832]' 
                      : 'text-white/40 hover:text-white/70'
                    }`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>
            {/*allorders section*/}
            <Link 
              href="/orders" 
              className="flex items-center gap-3 px-5 py-2.5 bg-[#6F4E37] text-white rounded-full text-[8px] font-black tracking-widest uppercase hover:bg-[#4B3832] transition-all shadow-md active:scale-95 group w-fit">
              All Orders
              <div className="flex items-center gap-1.5 border-l border-white/20 pl-3">
                <span className="w-4 h-4 bg-[#DCC7AA] rounded-full text-[#4B3832] flex items-center justify-center text-[7px] font-black">
                    {orders.length}
                </span>
              </div>
            </Link>
          </div>
          {/*ordercards section*/}
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar px-1">
            {filteredOrders.length === 0 ? (
               <div className="py-6 px-4 border-2 border-dashed border-[#4B3832]/10 rounded-3xl w-full text-center">
                <p className="text-[9px] font-bold text-[#4B3832]/30 italic uppercase tracking-[0.2em]">No {orderFilter.toLowerCase()} active</p>
               </div>
            ) : (
              filteredOrders.map((order: any) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  updateOrderStatus={updateOrderStatus}
                  statusOptions={statusOptions}
                  getStatusStyles={getStatusStyles}
                />
              ))
            )}
          </div>
      </section>
      {/*addmenumodal section */}
      <section className="p-4 md:p-8 relative z-10">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h2 className="font-black text-2xl italic tracking-tighter text-[#4B3832] uppercase text-shadow-sm">Brew & Bites</h2>
              <div className="flex bg-[#DCC7AA]/30 rounded-full p-1 overflow-x-auto no-scrollbar border-2 border-[#DCC7AA] backdrop-blur-sm">
                {categories.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)} 
                    className={`px-4 py-2 rounded-full text-[8px] font-black transition-all uppercase flex items-center gap-2 whitespace-nowrap tracking-widest ${
                      activeCategory === cat ? 'bg-[#4B3832] text-white' : 'text-[#4B3832]/60'
                    }`}>
                     {categoryIcons[cat]}
                     {cat}
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setIsMenuModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#4B3832] text-[#DCC7AA] rounded-2xl text-[10px] font-black tracking-widest uppercase hover:bg-[#6F4E37] transition-all shadow-lg active:scale-95 border border-[#DCC7AA]/20">
              Manage Menu
            </button>
          </div>
          {/*searchbar section*/}
          <div className="relative text-[#4B3832] flex items-center w-full max-w-xl group">
            <input 
              type="text" 
              placeholder="Search Menu" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="bg-white border-2 border-[#DCC7AA] rounded-2xl px-6 py-4 text-xs font-bold outline-none w-full shadow-md focus:border-[#6F4E37] transition-all placeholder:opacity-20 pr-12" />
            <Search size={18} className="absolute right-5 opacity-30 group-focus-within:opacity-100 group-focus-within:text-[#6F4E37] transition-all" />
          </div>
        </div>
        {/*menu grid*/}
        <div className="grid grid-cols-1 md:grid-cols-2 min-[1600px]:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item: any) => (
              <MenuItem key={item.id} item={item} updateQuantity={updateQuantity} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center opacity-30">
              <p className="font-black uppercase tracking-[0.3em]">No items found</p>
            </div>
          )}
        </div>
      </section>
      {isMenuModalOpen && (
        <AddMenuModal
          menuItems={menuItems} 
          onClose={() => setIsMenuModalOpen(false)} 
          onMenuUpdate={onMenuUpdate} 
        />
      )}
      <p className="mt-12 text-center text-[10px] font-black tracking-[0.3em] text-[#4B3832]/30 uppercase italic">
        BrewFlow Admin Dashboard
      </p>
    </div>
  );
}