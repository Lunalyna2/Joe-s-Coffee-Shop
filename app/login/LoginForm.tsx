"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "./actions";
import { Mail, Lock, Coffee, Eye, EyeOff, LoaderCircle, ArrowRight } from "lucide-react"
import { createClient } from "@/utils/supabase/client";

//login form component for admin access, with email and password inputs, and error handling
export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, { error: null });
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // State to capture email for reset

  //for reset password 
const handleForgotPassword = async (): Promise<void> => {
  if (!email) {
    return alert("Please enter your email address in the identification field first.");
  }
//initialize supabase client and get site URL for redirect after password reset
  const supabase = createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/confirm?next=/account/updatepass`,
  });

  if (error) {
    console.error("error:", error);
  }

  //generic message
  alert("If this email is registered, you’ll receive a reset link.");
};
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2 overflow-x-hidden">
      
      {/*left side*/}
      <div className="hidden lg:flex bg-[#4B3832] relative flex-col justify-between p-12 xl:p-20 overflow-hidden">
        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%]" />

        <div className="relative z-0">
          <h1 className="text-white mt-10 xl:mt-20 text-[clamp(5rem,8vw,10rem)] font-black italic tracking-tighter uppercase leading-[0.75]">Brew<br/>
            <span className="text-[#DCC7AA]">Flow</span>
          </h1>
        </div>
        {/*message section*/}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-0.5 w-12 bg-[#DCC7AA]" />
            <p className="text-[#DCC7AA] text-[clamp(0.6rem,1vw,0.75rem)] font-black tracking-[0.6em] uppercase italic">
              Admin Access
            </p>
          </div>
          <p className="text-white/40 text-sm font-medium max-w-xs leading-relaxed">
            Authorized personnel only. All access attempts are logged under security protocol.
          </p>
        </div>
      </div>

      {/*right side*/}
      <div className="w-full bg-white flex flex-col justify-center items-center p-6 md:p-16 lg:p-24 relative">
        
        {/*mobile header*/}
        <div className="lg:hidden absolute top-8 sm:top-10 left-8 sm:left-10 flex items-center gap-2">
            <Coffee className="text-[#4B3832]" size={24} />
            <h2 className="text-[#4B3832] font-black text-xl italic tracking-tighter uppercase">BrewFlow.</h2>
        </div>

        <div className="w-full max-w-md mx-auto">
          <header className="mb-10 sm:mb-14">
            <h2 className="text-[#4B3832] text-[clamp(3.5rem,10vw,4rem)] xl:text-6xl font-black tracking-tighter uppercase italic mb-3 leading-none">
              Login
            </h2>
            <p className="text-[#DCC7AA] font-black text-[10px] tracking-[0.4em] uppercase">
              Admin Portal Entry
            </p>
          </header>

          {/*email input*/}
          <form action={formAction} className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#4B3832]/50 tracking-[0.2em] uppercase ml-6">User Identification</label>
              <div className="relative group">
                <Mail className="absolute left-6 sm:left-7 top-1/2 -translate-y-1/2 text-[#4B3832]/20 group-focus-within:text-[#4B3832] transition-all" size={18} />
                <input 
                  type="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@brewflow.com" 
                  required 
                  className="w-full pl-14 sm:pl-16 pr-8 py-5 sm:py-6 rounded-2xl sm:rounded-4xl bg-[#F5E6CA]/40 border-2 border-transparent outline-none font-bold text-base text-[#4B3832] placeholder:text-[#4B3832]/20 focus:border-[#4B3832] focus:bg-white transition-all"/>
              </div>
            </div>

            {/*pass input*/}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#4B3832]/40 tracking-[0.2em] uppercase ml-6">Security Token</label>
              <div className="relative group">
                <Lock className="absolute left-6 sm:left-7 top-1/2 -translate-y-1/2 text-[#4B3832]/20 group-focus-within:text-[#4B3832] transition-all" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  className="w-full pl-14 sm:pl-16 pr-14 sm:pr-16 py-5 sm:py-6 rounded-2xl sm:rounded-4xl bg-[#F5E6CA]/40 border-2 border-transparent outline-none font-bold text-base text-[#4B3832] placeholder:text-[#4B3832]/20 focus:border-[#4B3832] focus:bg-white transition-all"/>
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 sm:right-7 top-1/2 -translate-y-1/2 text-[#4B3832]/20 hover:text-[#4B3832] transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          
            <div className="pt-4 sm:pt-1 m-2">
              <SubmitButton />
            {/*forgot password link*/}
            </div>
               <div className="space-y-2">
             <button 
              type="button" 
              onClick={handleForgotPassword}
              className="text-[10px] text-amber-950/60 font-bold ml-4 hover:text-red-500">
              FORGOT PASSWORD
              </button>
              </div> 

            {/*error message*/}
            {state?.error && (
              <div className="mt-6 sm:mt-8 flex gap-4 items-center bg-red-50 border border-red-100 p-4 sm:p-5 rounded-2xl sm:rounded-3xl animate-in fade-in zoom-in-95">
                <div>
                    <p className="text-1000 font-black text-red-500 uppercase tracking-widest">Entry Denied</p>
                    <p className="text-red-900 font-bold text-xs">{state.error}</p>
                </div>
              </div>
            )}
          </form>

          <footer className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-[#F5E6CA]/80 flex justify-between items-center opacity-50">
             <p className="text-[9px] font-black text-[#4B3832] uppercase tracking-[0.4em]">
               BrewFlow © 2026
             </p> 
          </footer>
        </div>
      </div>
    </div>
  );
}
//submit button component with loading state for form submission
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full h-16 sm:h-20 bg-[#4B3832] hover:bg-[#2D1F1B] active:scale-[0.98] text-white flex items-center justify-between px-6 sm:px-10 rounded-2xl sm:rounded-4xl transition-all shadow-xl shadow-[#4B3832]/10 disabled:opacity-50 group">
      <span className="text-base sm:text-lg font-black uppercase italic tracking-tighter">
        {pending ? "Validating..." : "Authorize Entry"}
      </span>
      <div className="p-2 sm:p-2.5 bg-white/10 rounded-full group-hover:translate-x-1.5 transition-transform shrink-0">
        {pending ? (
          <LoaderCircle className="w-5 h-5 animate-spin text-[#DCC7AA]" />
        ) : (
          <ArrowRight 
            className="text-[#DCC7AA] w-5.5 h-5.5 sm:w-6 sm:h-6" 
            strokeWidth={3} />
        )}
      </div>
    </button>
  );
}