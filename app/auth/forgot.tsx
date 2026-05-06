"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // window.location.origin handles localhost vs production automatically
      redirectTo: `${window.location.origin}/auth/confirm?next=/account/updatepass`,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Success! Check your email for the reset link.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border rounded text-black"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-[#4B3832] text-white p-2 rounded"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}