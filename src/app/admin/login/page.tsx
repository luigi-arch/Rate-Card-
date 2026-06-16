"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { login } from "../actions";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await login(password);
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        setError(res.error ?? "Login failed.");
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="card w-full max-w-sm p-8">
        <p className="font-display text-2xl tracking-[0.04em]">
          SIDE<span className="text-gold">STREET</span> CMS
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-fg"
            >
              Admin password
            </label>
            <input
              id="password"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-fg outline-none focus:border-gold"
            />
          </div>
          {error && (
            <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="press w-full rounded-full bg-gold py-3 text-sm font-bold uppercase tracking-wide text-black disabled:opacity-60"
          >
            {pending ? "Checking…" : "Enter CMS"}
          </button>
        </form>
      </div>
    </div>
  );
}
