'use client';

import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { LogOut, Loader2, ArrowLeft } from 'lucide-react';
import { logoutAction } from './actions';
//logout page with confirmation prompt and logout action 
function LogoutButton() {
  const { pending } = useFormStatus();
  //logout button that triggers logout action and shows loading state while processing
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-16 bg-[#4B3832] text-white font-black rounded-xl transition-all shadow-md uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 group hover:shadow-lg ">
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin text-[#DCC7AA]" />
          Clearing Brews...
        </>
      ) : (
        <>
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          Log Out
        </>
      )}
    </button>
  );
}
//main logout page component with confirmation message and options to log out or go back to cashier dashboard
export default function LogoutPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[#F5E6CA] p-6 relative">
      <div className="bg-[#6F4E37] p-12 rounded-[2.5rem] shadow-3xl max-w-md w-full text-center border-4 border-[#DCC7AA]/20 animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-48 h-4 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-xl opacity-30" />
        <div className="relative z-10">

          <h1 className="text-4xl font-black tracking-tighter text-white mb-3 uppercase italic">
            Closing Up?
          </h1>

          <div className="space-y-1 mb-10 max-w-sm mx-auto">
            <p className="text-[#DCC7AA] font-black text-sm uppercase tracking-wide">
              Log out Confirmation
            </p>

            <p className="text-white/70 font-bold text-[13px] leading-snug">
              You are about to securely end your session on the BrewFlow Portal. Any unsaved cashier actions may be lost. Are you sure you wish to exit?
            </p>

          </div>
          <div className="flex flex-col gap-4">
            <form action={logoutAction}>
              <LogoutButton/>
            </form>
            
            <Link
              href="/cashier"
              className="w-full h-14 bg-[#DCC7AA] text-[#4B3832] font-black rounded-xl transition-all shadow hover:bg-[#DCC7AA]/60 uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Go Back to Cashier
            </Link>
          </div>
          <p className="mt-12 text-[10px] font-black tracking-widest text-[#DCC7AA]/40 uppercase italic">BrewFlow Admin Portal</p>
        </div>
      </div>
    </main>
  );
}