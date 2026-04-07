"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "./actions";

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, { error: null });
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className="flex flex-col gap-3 w-80">
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit" disabled={pending}>
        {pending ? "Logging in..." : "Login"}
      </button>
      {state.error && <p className="text-red-600 mt-2">{state.error}</p>}
    </form>
  );
}
