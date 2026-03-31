import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using a standard Google Font
import "./globals.css";
import Navbar from "./user interface/navbar/navbar"; // Path to your navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coffee & Bites | Order Online",
  description: "Delicious coffee, burgers, and pasta delivered to you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black antialiased`}>
        {/* Navbar stays here so it shows up on all pages */}
        <Navbar />

        {/* This "children" prop is where your page.tsx content will be injected */}
        {children}

        {/* You can add a Footer here later */}
      </body>
    </html>
  );
}