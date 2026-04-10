"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function OrderDetailsButton({
  receiptNo,
}: {
  receiptNo: string;
}) {
  return (
    <Link
      href={`/receipt/${receiptNo}`}
      className="inline-flex items-center gap-2 px-5 py-2 bg-[#6F4E37] text-[#F5E6CA] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#4B3832] transition-all active:scale-95 shadow-sm">
      View Details
      <ChevronRight size={14}/>
    </Link>
  );
}