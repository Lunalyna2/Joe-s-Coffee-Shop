"use client";

type Order = {
  date: string;
  receiptNo: string;
  quantity: number;
  amount: number;
  paymentType: string;
  operator: string;
};

export default function ReceiptCard({ order }: { order: Order }) {
  return (
    <div className="w-full max-w-md bg-white rounded-t-md p-6 relative overflow-hidden">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-wide text-center">
          Joe’s Coffee Shop
        </h1>
        <div className="flex justify-start mt-2">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Date:</span> {order.date}
          </p>
        </div>
      </div>

      {/* Dashed separator */}
      <div className="w-full border-t border-dashed border-gray-300 my-6"></div>

      {/* Receipt Details */}
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-semibold">Receipt No:</span> {order.receiptNo}
        </p>
        <p>
          <span className="font-semibold">Quantity:</span> {order.quantity}
        </p>
        <p>
          <span className="font-semibold">Amount:</span> ₱{order.amount}
        </p>
        <p>
          <span className="font-semibold">Payment Type:</span>{" "}
          {order.paymentType}
        </p>
        <p>
          <span className="font-semibold">Operator:</span> {order.operator}
        </p>
      </div>

      {/* Dashed separator */}
      <div className="w-full border-t border-dashed border-gray-300 my-6"></div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-xs text-gray-400 mt-2 italic">
          Thank you for your purchase!
        </p>
        <h2 className="text-sm text-gray-400 font-bold mt-4">BrewFlow</h2>
      </div>

      {/* Zigzag receipt bottom */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-white">
        <div
          className="w-full h-full bg-yellow-400"
          style={{
            clipPath: `
              polygon(
              0% 100%, 5% 70%, 10% 100%, 15% 70%, 
              20% 100%, 25% 70%, 30% 100%, 35% 70%, 
              40% 100%, 45% 70%, 50% 100%, 55% 70%, 
              60% 100%, 65% 70%, 70% 100%, 75% 70%, 
              80% 100%, 85% 70%, 90% 100%, 95% 70%, 
              100% 100%
              )
            `,
          }}
        ></div>
      </div>
    </div>
  );
}
