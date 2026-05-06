"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

// Move the logic into a separate component to wrap it in Suspense
function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const supabase = createClient();

    const handleConfirm = async () => {
      // getSession() automatically handles the code exchange from the URL
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        console.error("Auth error:", error);
        // Using a query param so your login page can show a nice error message
        router.push("/login?error=expired-link");
        return;
      }

      const nextPath = searchParams.get("next") || "/account/updatepass";

      // Session is valid, proceed to the next step
      router.push(nextPath);
    };

    handleConfirm();
  }, [router, searchParams]);

  return (
    <div className="text-center">
      <p className="text-[#4B3832] font-bold text-lg animate-pulse">
        Verifying your request...
      </p>
      <p className="text-[#4B3832]/60 text-sm mt-2">One moment, brewing your session.</p>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5E6CA]">
  
      <Suspense fallback={
        <div className="text-center">
          <p className="text-[#4B3832] font-bold text-lg opacity-50">Initializing...</p>
        </div>
      }>
        <ConfirmContent />
      </Suspense>
    </div>
  );
}