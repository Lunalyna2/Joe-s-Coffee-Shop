//lets user request a reset email
import { useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";

//forgot password page with email input, validation, and Supabase integration
export default function ForgotPassword() {
  //local state to hold the email input
  const [email, setEmail] = useState("");

  //handles form submission for requesting a password reset link
  const handleForgotPassword = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    //calls Supabase to send a reset password email
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/auth/reset", 
    });
    if (error) {
      alert(error.message); 
    } else {
      alert("Password reset email sent!"); 
    }
  };

  return (
    //form for entering email and requesting reset link
    <form onSubmit={handleForgotPassword}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        //update local state when user types
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
}
