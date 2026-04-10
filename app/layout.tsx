'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar/navbar'; 
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const shouldHideNavbar = 
    pathname === "/" || 
    pathname === "/login" || 
    pathname === "/orders" || 
    pathname === "/logout" || 
    pathname.startsWith("/receipt/");

  return (
    <html lang="en">
      <body className="bg-[#F5E6CA] antialiased">
        {!shouldHideNavbar && <Navbar />}
        
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}