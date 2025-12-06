"use client";

import { useState } from "react";

export default function NewsletterSignup({
  endpoint = "/api/newsletter",
}: {
  endpoint?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.message || "Subscription failed. Try again later.");
      }
    } catch (err: any) {
      if (typeof window !== "undefined" && window.location.hostname === "localhost") {
        setStatus("success");
        setEmail("");
        return;
      }

      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto rounded-full border border-white/8 bg-black/20 p-2 md:p-1 flex items-center gap-3 shadow-sm"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 flex-1 px-3">

        <div
          className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-black/30 border border-white/6"
          aria-hidden
        >
          <svg className="w-5 h-5 text-emerald-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6.5L12 13L21 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>

        <input
          id="newsletter-email"
          name="email"
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
            setErrorMsg("");
          }}
          placeholder="Join the newsletter"
          className="
            w-full bg-transparent placeholder:text-neutral-400 text-white text-sm
            px-3 py-3 rounded-full focus:outline-none
            border border-transparent focus:border-blue-400/50
            focus:shadow-[0_8px_40px_rgba(10,102,255,0.08)]
            transition
          "
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "newsletter-error" : undefined}
        />
      </div>

      <div className="pr-2 pl-1">
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`
            inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm font-semibold
            ${status === "success" ? "bg-emerald-400 text-black" : "bg-gradient-to-r from-blue-600 to-emerald-400 text-black"}
            shadow-[0_10px_30px_rgba(10,102,255,0.12)]
            disabled:opacity-60 disabled:cursor-not-allowed transition-transform hover:scale-[1.02]
          `}
        >
          {status === "loading" ? (
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : status === "success" ? (
            <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : null}
          <span>
            {status === "success" ? "Subscribed" : status === "loading" ? "Signing up…" : "Subscribe"}
          </span>
        </button>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        {status === "success" ? "Subscription successful" : status === "error" ? errorMsg : ""}
      </div>

      {status === "error" && (
        <div id="newsletter-error" className="absolute left-4 bottom-[-48px] text-sm text-red-300">
          {errorMsg}
        </div>
      )}
    </form>
  );
}
