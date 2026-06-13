import Image from "next/image";

export default function Loading() {
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

      <div className="relative flex flex-col items-center gap-8">

        {/* Animated logo */}
        <div className="relative">
          {/* Outer spinning ring */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin"
            style={{ animationDuration: "3s" }}
            aria-hidden="true"
          >
            <circle
              cx="40" cy="40" r="36"
              stroke="#2b8a8a"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
          </svg>

          {/* Static logo center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/images/logo.png" alt="FMT e.V. Logo" width={90} height={90} className="rounded-full" priority />
          </div>
        </div>

        {/* Pulsing dots */}
        <div className="flex items-center gap-2" role="status" aria-label="Chargement en cours">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-[#2b8a8a] animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>

        {/* Tagline */}
        <p className="text-xs text-gray-400 tracking-widest uppercase">
          Prévention · Éducation · Intégration
        </p>
      </div>
    </div>
  );
}