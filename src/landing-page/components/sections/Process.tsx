import SectionLabel from "@/landing-page/components/ui/SectionLabel";
import { processSteps } from "@/landing-page/data";

export default function Process() {
  return (
    <section className="py-24 px-[6vw]">
      <div className="text-center mb-16">
        <SectionLabel text="How It Works" center />
        <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold tracking-tight leading-[1.1]">
          From Brief to Launch
          <br />
          in 4 Steps
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 relative">
        {/* Connecting line (desktop only) */}
        <div className="absolute top-9 left-[10%] right-[10%] h-px bg-[#0d0d0d]/10 hidden lg:block" />

        {processSteps.map((step) => (
          <div
            key={step.num}
            className="lp-reveal text-center px-6 group cursor-default"
          >
            <div className="w-[72px] h-[72px] rounded-full bg-[#f7f4ef] border-2 border-[#0d0d0d]/10 flex items-center justify-center mx-auto mb-5 relative z-10 font-display text-2xl font-extrabold group-hover:bg-[#9333ea] group-hover:border-[#9333ea] group-hover:text-white transition-all">
              {step.num}
            </div>
            <h4 className="font-display font-bold mb-2">{step.title}</h4>
            <p className="text-sm text-[#6b6560] font-light leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
