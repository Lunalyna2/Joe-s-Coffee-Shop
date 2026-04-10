import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CashierDashboard from "./cashierDashboard"; 

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }
  
  return <CashierDashboard userEmail={data.user.email} />;
}