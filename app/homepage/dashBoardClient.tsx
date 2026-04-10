'use client';

import React, { useState } from 'react';
import { Search, Minus, Plus, GlassWater, Coffee, Utensils, CakeSlice, Layers3, Tag, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function DashboardClient({ 
  menuItems, 
  updateQuantity, 
  orders, 
  updateOrderStatus, 
  orderFilter, 
  setOrderFilter 
}: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ["ALL", "NON-COFFEE", "COFFEE-BASED", "PASTA & BURGERS", "DESSERTS & PASTRIES"];
  
  const categoryIcons: any = {
    "ALL": <Layers3 size={14} />,
    "NON-COFFEE": <GlassWater size={14} />,
    "COFFEE-BASED": <Coffee size={14} />,
    "PASTA & BURGERS": <Utensils size={14} />, 
    "DESSERTS & PASTRIES": <CakeSlice size={14} />
  };

  const statusOptions = ["IN PROGRESS", "READY TO SERVE", "COMPLETED", "CANCELED"];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "IN PROGRESS":
        return "bg-amber-100 text-amber-900 border-amber-300 shadow-amber-900/5";
      case "READY TO SERVE":
        return "bg-emerald-100 text-emerald-900 border-emerald-400 shadow-emerald-900/10 animate-pulse-subtle";
      case "COMPLETED":
        return "bg-[#4B3832] text-[#DCC7AA] border-[#4B3832] opacity-80";
      case "CANCELED":
        return "bg-red-100 text-red-900 border-red-300 opacity-60";
      default:
        return "bg-[#F5E6CA]/50 border-[#DCC7AA] text-[#4B3832]";
    }
  };

  const filteredOrders = orders.filter((o: any) => o.type === orderFilter);
  const filteredMenu = menuItems.filter((item: any) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "ALL" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F5E6CA] min-h-screen pb-16 relative overflow-x-hidden font-sans">
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#4B3832]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-48 w-96 h-96 bg-[#DCC7AA]/20 rounded-full blur-3xl pointer-events-none" />
      
      {/*orders section*/}
      <section className="p-4 md:p-6 border-b border-[#4B3832]/10 bg-white/20 backdrop-blur-md sticky top-0 z-30 shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center gap-4 mb-6">
          <h2 className="font-black text-xl tracking-[0.2em] text-[#4B3832] uppercase italic">
            Order Line
          </h2>
          
          <div className="flex bg-[#4B3832] rounded-full p-1 shrink-0 overflow-x-auto no-scrollbar shadow-lg border border-[#DCC7AA]/20">
            {["DINE IN", "TAKE OUT"].map((type) => (
              <button
                key={type}
                onClick={() => setOrderFilter(type)}
                className={`px-6 py-2 rounded-full text-[9px] font-black transition-all whitespace-nowrap ${
                  orderFilter === type ? 'bg-[#DCC7AA] text-[#4B3832]' : 'text-white/40'
                }`}>
                {type}
              </button>
            ))}
          </div>

          <div className="xl:ml-auto">
            <Link href="/orders">
              <button className="w-full h-12 lg:w-auto text-[9px] font-black bg-[#6F4E37] text-white px-6 rounded-full uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 group">
                All Orders
                <span className="w-4 h-4 bg-[#DCC7AA] rounded-full text-[#4B3832] flex items-center justify-center font-black">{orders.length}</span>
              </button>
            </Link>
          </div>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar px-1">
          {filteredOrders.length === 0 ? (
            <p className="text-[9px] font-bold text-[#4B3832]/40 italic uppercase py-4">No active orders</p>
          ) : (
            filteredOrders.map((order: any) => (
              <div 
                key={order.id} 
                className={`bg-white p-4 rounded-3xl min-w-45 shadow-sm border-2 transition-all relative
                  ${order.status === "READY TO SERVE" ? "border-emerald-500 shadow-emerald-500/10" : "border-[#DCC7AA]"}
                `}>
                <div className="flex justify-between text-[10px] font-black text-[#4B3832] mb-3 uppercase italic">
                  <span className="truncate pr-2">{order.name || "GUEST"}</span>
                  <span className="opacity-40">#{order.id.toString().slice(-4)}</span>
                </div>
                
                <div className="relative">
                  <select 
                    value={order.status} 
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)} 
                    className={`w-full text-center py-2 px-3 rounded-full text-[8px] font-black appearance-none outline-none border-2 cursor-pointer transition-colors relative z-10
                      ${getStatusStyles(order.status)}
                    `}>
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt} className="bg-white text-[#4B3832]">{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={10} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-20 opacity-40" />
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/*menu section*/}
      <section className="p-4 md:p-8 relative z-10">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h2 className="font-black text-2xl italic tracking-tighter text-[#4B3832] uppercase">
              Brew & Bites
            </h2>
            
            <div className="flex bg-[#DCC7AA]/30 rounded-full p-1 overflow-x-auto no-scrollbar border-2 border-[#DCC7AA]">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)} 
                  className={`px-4 py-2.5 rounded-full text-[8px] font-black transition-all whitespace-nowrap uppercase tracking-widest flex items-center gap-2 ${
                    activeCategory === cat ? 'bg-[#4B3832] text-white' : 'text-[#4B3832]/60'
                  }`}>
                  {categoryIcons[cat]}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative text-[#4B3832] flex items-center w-full max-w-xl group">
            <input 
              type="text" 
              placeholder="Search Menu" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="bg-white border-2 border-[#DCC7AA] rounded-2xl px-6 py-4 text-xs font-bold outline-none w-full pr-12 shadow-md focus:border-[#6F4E37] transition-all" />
            <Search size={18} className="absolute right-5 opacity-30" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 min-[1600px]:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredMenu.map((item: any) => (
            <div key={item.id} className="bg-white p-6 rounded-[2.5rem] flex flex-col min-h-40 shadow-sm border border-[#DCC7AA] relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#F5E6CA] rounded-bl-[2.5rem] -mr-8 -mt-8 group-hover:bg-[#DCC7AA] transition-colors" />
              <Tag size={32} className="absolute top-4 right-4 text-[#DCC7AA]/20 z-0" />
              
              <div className="relative z-10 mb-4 pr-10">
                <h3 className="font-black text-lg text-[#4B3832] leading-tight uppercase italic mb-1">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-black text-md text-[#6F4E37]">₱{item.price.toFixed(2)}</span>
                  <span className="text-[10px] font-black text-[#DCC7AA] uppercase tracking-widest border-l border-[#DCC7AA] pl-2">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="mt-auto flex justify-end relative z-10">
                <div className="flex items-center gap-4 bg-[#4B3832] rounded-full px-4 py-2 shadow-xl active:scale-95 transition-transform">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)} 
                    className="text-[#DCC7AA] hover:text-white">
                    <Minus size={14} strokeWidth={3}/>
                  </button>
                  <span className="font-black text-sm text-white min-w-4.5 text-center">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)} 
                    className="text-[#DCC7AA] hover:text-white">
                    <Plus size={14} strokeWidth={3}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-12 text-center text-[10px] font-black tracking-widest text-[#4B3832]/50 uppercase italic">BrewFlow Admin Dashboard</p>
    </div>
  );
}