import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CashierDashboard from "./cashierDashboard";
import { OrdersProvider } from "../homepage/orderContext"; // import provider

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user?.email) {
    redirect("/login");
  }

  return (
    <OrdersProvider userEmail={data.user.email}>
      <CashierDashboard />
    </OrdersProvider>
  );
}
