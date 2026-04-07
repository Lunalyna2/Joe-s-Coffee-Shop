import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function CashierPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold">Welcome {data.user.email}</h1>
      <p className="mt-2 text-gray-600">
        You are authenticated as cashier/manager.
      </p>
      <a href="/logout" className="text-blue-600 underline mt-4">
        Logout
      </a>
    </div>
  );
}
