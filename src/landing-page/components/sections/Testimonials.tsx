import SectionLabel from "@/landing-page/components/ui/SectionLabel";
import { testimonials } from "@/landing-page/data";

export default function Testimonials() {
  return (
    <section className="py-24 px-[6vw]">
      <SectionLabel text="Client Love" />
      <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold tracking-tight leading-[1.1] mb-4">
        What Our Clients Say
      </h2>
      <p className="text-[#6b6560] font-light leading-relaxed max-w-lg mb-14">
        We don&apos;t just ship code — we build relationships with businesses
        that grow.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="lp-reveal bg-[#ede9e0] rounded-2xl p-7 border border-[#0d0d0d]/8 hover:-translate-y-1 transition-transform"
          >
            <div className="text-[#9333ea] tracking-widest text-sm mb-4">
              ★★★★★
            </div>
            <blockquote className="text-sm leading-relaxed font-light italic mb-5 text-[#0d0d0d]">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-2.5">
              <div
                className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-[#6b6560]">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
