import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f9f7f5] flex flex-col items-center justify-center px-4">

      {/* Background decoration */}
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

        {/* Logo */}
        <Image src="/images/logo.png" alt="FMT e.V. Logo" width={90} height={90} className="rounded-full" priority />

        {/* 404 display */}
        <p className="mt-8 text-[7rem] font-bold leading-none tracking-tighter text-[#1a5c5c] select-none">
          404
        </p>

        {/* Divider with accent */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px w-12 bg-[#2b8a8a]/30" />
          <div className="w-2 h-2 rounded-full bg-[#f39237]" />
          <div className="h-px w-12 bg-[#2b8a8a]/30" />
        </div>

        <h1 className="text-xl font-semibold text-gray-900">
          Page introuvable
        </h1>
        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
          La page que vous cherchez n&rsquo;existe pas ou a été déplacée.
          Retournez à l&rsquo;accueil pour continuer.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#2b8a8a] text-white text-sm font-semibold rounded-xl hover:bg-[#1a5c5c] transition-colors duration-200"
        >
          Retour à l&rsquo;accueil
        </Link>

        {/* Foundation signature */}
        <p className="mt-12 text-xs text-gray-400 tracking-wide">
          Fondation Mefo Tuèbu · FMT e.V.
        </p>
      </div>
    </div>
  );
}