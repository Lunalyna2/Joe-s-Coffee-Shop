'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar/navbar';
import "./globals.css";
//root layout component that wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //determine current path and conditionally render navbar based on the page
  const pathname = usePathname();
  const shouldHideNavbar =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/orders" ||
    pathname === "/logout" ||
    pathname === "/acount" ||
    pathname === "/account/updatepass" ||
    pathname === "/auth/confirm" ||
    pathname.startsWith("/receipt/");

  return (
    <html lang="en">
      <body className="bg-[#F5E6CA] antialiased">
        {!shouldHideNavbar && <Navbar />}
        {/*main content area where page components will be rendered*/}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}