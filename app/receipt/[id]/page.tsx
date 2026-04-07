import ReceiptCard from "./ReceiptCard";
// import { getOrderById } from "@/app/lib/orders"; {/* real data*/}

{
  /* mock data source*/
}
async function getOrders() {
  return [
    {
      date: "03/30/26",
      receiptNo: "24759029",
      quantity: 5,
      amount: 547,
      paymentType: "Cash",
      operator: "Cashier A",
    },
    {
      date: "03/31/26",
      receiptNo: "24759030",
      quantity: 2,
      amount: 200,
      paymentType: "Card",
      operator: "Cashier B",
    },
  ];
}
{
  /* real data*/
}
// export default function ReceiptPage({ params }: { params: { id: string } }) {
//   const order = await  getOrderById(params.id);
// }

{
  /*function for mock data*/
}
export default async function ReceiptPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params; // extract id from url
  const orders = await getOrders(); // get mock data
  const order = orders.find((o) => o.receiptNo === id); //find  matching receipt

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg">Receipt not found</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/*  yellow background wrapper */}
      <div className="bg-yellow-400 p-8 rounded-sm shadow-sm">
        <ReceiptCard order={order} />
      </div>
    </div>
  );
}
