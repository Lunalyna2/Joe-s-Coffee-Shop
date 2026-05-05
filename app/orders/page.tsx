import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AllOrdersPage from "./AllOrdersPage";
import { OrdersProvider } from "../homepage/orderContext";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user?.email) {
    redirect("/login");
  }

  return (
    <OrdersProvider userEmail={data.user.email}>
      <AllOrdersPage />
    </OrdersProvider>
  );
}
