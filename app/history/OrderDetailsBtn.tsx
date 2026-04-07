"use client";

import Link from "next/link";

export default function OrderDetailsButton({
  receiptNo,
}: {
  receiptNo: string;
}) {
  return (
    <Link
      href={`/receipt/${receiptNo}`}
      className="inline-block px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
    >
      View Details
    </Link>
  );
}
