'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { usePathname } from 'next/navigation';
//navbar component with active link highlighting for navigation
const Navbar: React.FC = () => {
  const pathname = usePathname();
  //navigation links with respective paths
  const navLinks = [
    { name: 'MENU', href: '/cashier' },
    { name: 'HISTORY', href: '/history' },
    { name: 'LOG OUT', href: '/logout' },
  ];

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-[#4B3832] text-white shadow-xl border-b border-[#DCC7AA]/10 sticky top-0 z-40">
      <Link href="/cashier" className="flex items-center gap-3 group">
        
        <div className="w-10 h-10 bg-[#DCC7AA] rounded-full flex items-center justify-center overflow-hidden shadow-lg group-hover:rotate-6 transition-transform relative">
          <Image 
            src="/BF logo.png" 
            alt="BrewFlow Logo"
            fill
            className="object-cover" 
            priority
          />
          <span className="sr-only">BrewFlow</span> 
        </div>

        <div className="hidden sm:block">
          <p className="font-black text-[12px] tracking-tighter leading-none italic uppercase">BREWFLOW</p>
          <p className="text-[9px] font-bold text-[#DCC7AA] tracking-[0.2em] leading-none uppercase">Admin</p>
        </div>
      </Link>

      <ul className="flex gap-8 md:gap-12 text-[10px] font-black tracking-[0.2em] uppercase items-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const isLogout = link.name === 'LOG OUT';
          //conditionally apply styles based on active link and logout link
          return (
            <li key={link.name}>
              <Link 
                href={link.href} 
                className={`transition-colors duration-300 relative py-1 ${
                  isActive 
                    ? 'text-[#DCC7AA]' 
                    : isLogout 
                      ? 'hover:text-red-400' 
                      : 'hover:text-[#DCC7AA]/80'
                }`}>
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#DCC7AA] rounded-full animate-in fade-in slide-in-from-left-1" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;