"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
      },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="card w-full max-w-sm p-8">
        <p className="font-display text-2xl tracking-[0.04em]">
          SIDE<span className="text-gold">STREET</span> CMS
        </p>
        {sent ? (
          <p className="mt-6 text-sm text-muted">
            Check your inbox — we’ve sent a magic sign-in link to{" "}
            <span className="font-semibold text-fg">{email}</span>. Open it on
            this device to continue.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-fg"
              >
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@sidestreetmalta.com"
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
              disabled={loading}
              className="press w-full rounded-full bg-gold py-3 text-sm font-bold uppercase tracking-wide text-black disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send magic link"}
            </button>
            <p className="text-center text-xs text-muted-2">
              Access is limited to approved SideStreet team members.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
