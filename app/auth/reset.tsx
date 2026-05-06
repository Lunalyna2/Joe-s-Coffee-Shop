//lets user set a new password
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ResetPassword() {
  // Local state to hold the new password input
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handles form submission for updating the password
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();

    // Calls Supabase to update the user's password
    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully!");
      // Redirect to login so they can sign in with the new credentials
      router.push("/login");
    }
  };
  
  return (
    //form for entering and submitting a new password
    <form onSubmit={handleResetPassword}>
      <input
        type="password"
        placeholder="New password"
        value={password}
        //update local state when user types
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Update Password</button>
    </form>
  );
}
