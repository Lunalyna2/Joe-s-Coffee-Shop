import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// server action for logout
export async function logoutAction() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default function LogoutPage() {
  return (
    <form
      action={logoutAction}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <h1 className="text-2xl font-semibold mb-4">Logout</h1>
      <button type="submit">Confirm Logout</button>
    </form>
  );
}
