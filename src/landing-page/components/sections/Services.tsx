import SectionLabel from "@/landing-page/components/ui/SectionLabel";
import { services } from "@/landing-page/data";

export default function Services() {
  return (
    <section id="services" className="py-24 px-[6vw]">
      <SectionLabel text="What We Do" />
      <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold tracking-tight leading-[1.1] mb-4">
        End-to-End Digital
        <br />
        Development
      </h2>
      <p className="text-[#6b6560] font-light leading-relaxed max-w-lg mb-14">
        From idea to launch — we handle the full stack so you can focus on
        growing your business.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[#0d0d0d]/10 border border-[#0d0d0d]/10 rounded-2xl overflow-hidden">
        {services.map((s) => (
          <div
            key={s.title}
            className="lp-service-card lp-reveal bg-[#f7f4ef] p-10 relative overflow-hidden hover:bg-[#ede9e0] transition-colors group cursor-default"
          >
            <div
              className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center text-xl mb-5`}
            >
              {s.icon}
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight mb-2.5">
              {s.title}
            </h3>
            <p className="text-[#6b6560] text-sm font-light leading-relaxed mb-4">
              {s.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold text-[#9333ea] bg-[#9333ea]/8 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
