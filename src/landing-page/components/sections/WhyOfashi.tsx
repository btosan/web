import SectionLabel from "@/landing-page/components/ui/SectionLabel";
import { whyPoints, stats } from "@/landing-page/data";

export default function WhyOfashi() {
  return (
    <section className="py-24 px-[6vw] bg-[#0d0d0d] text-[#f7f4ef]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <SectionLabel text="Why Ofashi" />
          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold tracking-tight leading-[1.1] mb-4 text-[#f7f4ef]">
            We Understand the African Market
          </h2>
          <p className="text-[#f7f4ef]/50 font-light leading-relaxed max-w-lg mb-10">
            Building for Nigeria isn&apos;t the same as building for Europe. We
            know the constraints, the payment systems, the infrastructure gaps
            — and we design around them.
          </p>

          <div className="space-y-4">
            {whyPoints.map((p) => (
              <div
                key={p.title}
                className="lp-reveal flex gap-4 items-start p-5 rounded-2xl border border-white/7 hover:border-[#9333ea]/40 hover:bg-[#9333ea]/5 transition-all cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-[#9333ea]/15 text-[#9333ea] flex items-center justify-center text-lg flex-shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h4 className="font-display font-bold mb-1.5">{p.title}</h4>
                  <p className="text-sm text-[#f7f4ef]/50 font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — stats */}
        <div className="grid grid-cols-2 gap-[2px] bg-white/7 rounded-2xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#111] p-9 text-center">
              <p className="font-display text-5xl font-extrabold leading-none mb-2 text-[#f7f4ef]">
                <span className="text-[#9333ea]">{s.num}</span>
              </p>
              <p className="text-sm text-[#f7f4ef]/40 font-light">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
