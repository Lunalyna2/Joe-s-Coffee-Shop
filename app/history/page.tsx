import OrderDetailsButton from "./OrderDetailsBtn";

// simulated server-side data fetch
async function getOrders() {
  return [
    {
      date: "03/30/26",
      receiptNo: "24759029",
      quantity: 5,
      amount: 547,
      paymentType: "Cash",
    },
    {
      date: "03/31/26",
      receiptNo: "24759030",
      quantity: 2,
      amount: 200,
      paymentType: "Card",
    },
  ];
}

export default async function HistoryPage() {
  const orders = await getOrders();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-300">
            <th className="py-3 px-4 text-center">Date</th>
            <th className="py-3 px-4 text-center">Receipt No.</th>
            <th className="py-3 px-4 text-center">Quantity</th>
            <th className="py-3 px-4 text-center">Amount</th>
            <th className="py-3 px-4 text-center">Payment Type</th>
            <th className="py-3 px-4 text-center">Order Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.receiptNo} className="border-b border-gray-300">
              <td className="py-3 px-4 text-center">{order.date}</td>
              <td className="py-3 px-4 text-center">{order.receiptNo}</td>
              <td className="py-3 px-4 text-center">{order.quantity}</td>
              <td className="py-3 px-4 text-center">{order.amount}</td>
              <td className="py-3 px-4 text-center">{order.paymentType}</td>
              <td className="py-3 px-4 text-center">
                <OrderDetailsButton receiptNo={order.receiptNo} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
