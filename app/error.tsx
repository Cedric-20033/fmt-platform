"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to monitoring service in production
    console.error("[FMT Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f9f7f5] flex flex-col items-center justify-center px-4">

      <div
        aria-hidden
        className="pointer-events-none fixed top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #2b8a8a 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-0 left-0 w-[350px] h-[350px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #f39237 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="relative flex flex-col items-center text-center max-w-md">

        <Image src="/images/logo.png" alt="FMT e.V. Logo" width={90} height={90} className="rounded-full" priority />

        {/* Error icon */}
        <div className="mt-8 w-20 h-20 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f39237" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px w-12 bg-[#2b8a8a]/30" />
          <div className="w-2 h-2 rounded-full bg-[#f39237]" />
          <div className="h-px w-12 bg-[#2b8a8a]/30" />
        </div>

        <h1 className="text-xl font-semibold text-gray-900">
          Une erreur est survenue
        </h1>
        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
          Un problème inattendu s&rsquo;est produit. Vous pouvez réessayer
          ou retourner à l&rsquo;accueil.
        </p>

        {/* Error digest for support reference */}
        {error.digest && (
          <p className="mt-4 px-3 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-400 font-mono">
            Référence : {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2b8a8a] text-white text-sm font-semibold rounded-xl hover:bg-[#1a5c5c] transition-colors duration-200"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-[#2b8a8a] hover:text-[#2b8a8a] transition-colors duration-200"
          >
            Retour à l&rsquo;accueil
          </Link>
        </div>

        <p className="mt-12 text-xs text-gray-400 tracking-wide">
          Fondation Mefo Tuèbu · FMT e.V.
        </p>
      </div>
    </div>
  );
}