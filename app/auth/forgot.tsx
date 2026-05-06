"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // redirectTo points to the ConfirmPage logic we just wrapped in Suspense
      redirectTo: `${window.location.origin}/auth/confirm?next=/account/updatepass`,
    });

    setLoading(false);

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Success! Check your email for the reset link." });
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