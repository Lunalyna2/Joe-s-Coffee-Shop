//lets user set a new password
import { useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";

export default function ResetPassword() {
  //local state to hold the new password input
  const [password, setPassword] = useState("");

  //handles form submission for updating the password
  const handleResetPassword = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    //calls Supabase to update the user's password
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      alert(error.message); 
    } else {
      alert("Password updated successfully!");
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
