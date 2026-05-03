"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
//confirmation page that handles the password reset link, verifies the token, and redirects to update password page
export default function ConfirmPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Function to handle the confirmation of the reset link
    const handleConfirm = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        alert("Invalid or expired reset link.");
        router.push("/auth/login");
        return;
      }

      // If session is valid, forward to update password page
      router.push("/account/updatepass");
    };

    handleConfirm();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5E6CA]">
      <p className="text-[#4B3832] font-bold text-lg">
        Verifying reset link...
      </p>
    </div>
  );
}
