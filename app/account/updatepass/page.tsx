"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [strength, setStrength] = useState(""); 
  const router = useRouter();

  const checkStrength = (value: string) => {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[@$!%*?&]/.test(value)) score++;

    if (score <= 2) return "Weak";
    if (score === 3 || score === 4) return "Medium";
    return "Strong";
  };

  const handleUpdatePassword = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setErrorMsg("");

    if (password !== confirm) {
      return setErrorMsg("Passwords do not match.");
    }

    setLoading(true);
    const supabase = createClient();

    const { error: updateError } = await supabase.auth.updateUser({ password });
    
    if (updateError) {
      setLoading(false);
      return setErrorMsg("Failed to update password. Please try again.");
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      setLoading(false);
      return setErrorMsg("Could not retrieve user email.");
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setErrorMsg("Updated, but auto-login failed.");
      router.push("/login");
    } else {
      setSuccess("Password updated! Redirecting...");
      setTimeout(() => router.push("/"), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F5E6CA] via-[#EAD7BB] to-[#DCC7AA] px-6">
      <form
        onSubmit={handleUpdatePassword}
        className="w-full max-w-xl backdrop-blur-lg bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-12 space-y-8 transition-all duration-300"
      >
        {/*header*/}
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-extrabold text-[#4B3832]">Update Password</h2>
          <p className="text-base text-[#4B3832]/60">Enter your new secure password</p>
        </div>

        {/* Password Input */}
        <div className="space-y-3">
          <label className="text-base font-medium text-[#4B3832]/70">New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              setStrength(checkStrength(value)); 
            }}
            required
            className="w-full px-5 py-4 text-lg rounded-xl border text-[#4B3832] border-[#DCC7AA] bg-white/80 focus:ring-2 focus:ring-[#4B3832] focus:outline-none transition"
          />

          {password && (
            <p
              className={`text-sm font-semibold ${
                strength === "Weak"
                  ? "text-red-600"
                  : strength === "Medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              Password strength: {strength}
            </p>
          )}
        </div>
        
        <div className="space-y-3">
          <label className="text-base font-medium text-[#4B3832]/70">Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full px-5 py-4 text-lg text-[#4B3832] rounded-xl border border-[#DCC7AA] bg-white/80 focus:ring-2 focus:ring-[#4B3832] focus:outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 text-lg rounded-xl font-bold text-white bg-linear-to-r from-[#4B3832] to-[#2D1F1B] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update & Login"}
        </button>

        {/*alerts*/}
        {success && (
          <div className="bg-green-100/80 border border-green-300 text-green-800 text-base font-semibold p-4 rounded-xl text-center">
            {success}
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-100/80 border border-red-300 text-red-800 text-base font-semibold p-4 rounded-xl text-center">
            {errorMsg}
          </div>
        )}
      </form>
    </div>
  );
}