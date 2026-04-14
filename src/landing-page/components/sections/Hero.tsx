"use client";

interface HeroProps {
  onOpenModal: () => void;
}

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="min-h-screen pt-36 pb-20 px-[6vw] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-20%] right-[-10%] w-150 h-150 rounded-full bg-[radial-gradient(circle,rgba(232,93,47,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-100 h-100 rounded-full bg-[radial-gradient(circle,rgba(26,122,74,0.1)_0%,transparent_70%)] pointer-events-none" />

      {/* Left — copy */}
      <div>
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-[#ede9e0] border border-[#0d0d0d]/10 px-4 py-1.5 rounded-full text-xs font-medium text-[#6b6560] mb-7"
          style={{ animation: "fadeUp 0.6s ease both" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#22a362] animate-pulse_dot" />
          Available for new projects · Based in Nigeria
        </div>

        <h1
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.04em] mb-6"
          style={{ animation: "fadeUp 0.7s 0.1s ease both" }}
        >
          We Build Digital Products That{" "}
          <span className="text-purple-800 underline underline-offset-8">Grow</span>
          <br />
          Your Business
        </h1>

        <p
          className="text-[#6b6560] text-lg font-light leading-relaxed max-w-115 mb-10"
          style={{ animation: "fadeUp 0.7s 0.2s ease both" }}
        >
          Ofashi partners with Nigerian and African businesses to deliver
          world-class web applications, SaaS platforms, and digital experiences
          — fast, scalable, and built to convert.
        </p>

        <div
          className="flex flex-wrap gap-3.5"
          style={{ animation: "fadeUp 0.7s 0.3s ease both" }}
        >
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-2.5 bg-purple-800 text-white px-7 py-4 rounded-full font-semibold text-sm hover:bg-[#a855f7] hover:-translate-y-0.5 transition-all shadow-purple-500/20 group hover:cursor-pointer"
          >
            Start a Project
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <a
            href="#work"
            className="inline-flex items-center gap-2.5 bg-transparent text-[#0d0d0d] px-7 py-4 rounded-full font-medium text-sm border border-[#0d0d0d]/15 hover:border-[#0d0d0d] hover:bg-[#ede9e0] hover:-translate-y-0.5 transition-all"
          >
            See Our Work
          </a>
        </div>

        {/* Trust */}
        <div
          className="mt-12 flex items-center gap-3.5"
          style={{ animation: "fadeUp 0.7s 0.4s ease both" }}
        >
          <div className="flex">
            {["AC", "BT", "KO", "+"].map((init, i) => (
              <span
                key={i}
                className={`w-9 h-9 rounded-full border-2 border-[#f7f4ef] flex items-center justify-center text-xs font-bold text-white ${
                  i === 0
                    ? "bg-[#9333ea]"
                    : i === 1
                      ? "bg-[#1a7a4a]"
                      : i === 2
                        ? "bg-blue-600"
                        : "bg-purple-600"
                } ${i > 0 ? "-ml-2.5" : ""}`}
              >
                {init}
              </span>
            ))}
          </div>
          <p className="text-sm text-[#6b6560] leading-snug">
            <strong className="text-[#0d0d0d] font-semibold">
              30+ businesses
            </strong>{" "}
            across Nigeria & Africa
            <br />
            trust Ofashi to build their digital products
          </p>
        </div>
      </div>

      {/* Right — dashboard card */}
      <div
        className="hidden lg:block relative"
        style={{ animation: "fadeUp 0.8s 0.2s ease both" }}
      >
        <div className="bg-[#0d0d0d] rounded-2xl overflow-hidden">
          {/* Window chrome */}
          <div className="bg-[#1a1a1a] px-5 py-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28ca42]" />
            <span className="ml-auto text-xs text-[#555] font-mono">
              ofashi.com/dashboard
            </span>
          </div>

          <div className="p-7">
            <p className="text-xs text-[#666] uppercase tracking-wider mb-1.5">
              Monthly Revenue Growth
            </p>
            <p className="font-display text-5xl font-extrabold text-white leading-none mb-1">
              ₦4.2M
            </p>
            <span className="inline-flex items-center gap-1 bg-[#22a362]/15 text-[#22a362] text-xs font-semibold px-3 py-1 rounded-full mb-5">
              ▲ 34% vs last month
            </span>

            {/* Mini bar chart */}
            <div className="flex items-end gap-1.5 h-14 mb-5">
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <div key={n} className={`lp-mini-bar lp-bar-${n}`} />
              ))}
            </div>

            {/* Projects */}
            <div className="space-y-2">
              {[
                {
                  icon: "🛍️",
                  name: "E-Commerce Platform",
                  sub: "Lagos, NG · Django + Next.js",
                  status: "Live",
                  live: true,
                },
                {
                  icon: "📊",
                  name: "SaaS Dashboard",
                  sub: "Abuja, NG · FastAPI + React",
                  status: "Live",
                  live: true,
                },
                {
                  icon: "🏢",
                  name: "Business Directory",
                  sub: "Nigeria-wide · Django Tenants",
                  status: "Building",
                  live: false,
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5"
                >
                  <span className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center text-sm flex-shrink-0">
                    {p.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#ccc] font-medium truncate">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-[#555]">{p.sub}</p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                      p.live
                        ? "bg-[#22a362]/15 text-[#22a362]"
                        : "bg-[#9333ea]/15 text-[#9333ea]"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating badges */}
        <div
          className="absolute -top-5 -right-5 bg-white rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-2 text-sm font-semibold"
          style={{ animation: "float 4s ease-in-out infinite" }}
        >
          <span>🚀</span>
          <div>
            <p className="text-xs font-bold m-0 leading-none">
              Launched in 4 weeks
            </p>
            <p className="text-[10px] text-[#999] font-normal mt-0.5">
              Average delivery time
            </p>
          </div>
        </div>
        <div
          className="absolute -bottom-2 -left-7 bg-white rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-2 text-sm font-semibold"
          style={{ animation: "float 4s 2s ease-in-out infinite" }}
        >
          <span>⭐</span>
          <div>
            <p className="text-xs font-bold m-0 leading-none">
              5.0 Client Rating
            </p>
            <p className="text-[10px] text-[#999] font-normal mt-0.5">
              Across all projects
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
