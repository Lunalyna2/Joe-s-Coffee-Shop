import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LoginForm } from "./login/LoginForm"; 

export default async function LoginPage() {
  const supabase = await createClient();
  
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/cashier"); 
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <LoginForm />
      </div>
  );
}