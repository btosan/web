import SectionLabel from "@/landing-page/components/ui/SectionLabel";
import { WHATSAPP_NUMBER } from "@/landing-page/data";

interface CtaSectionProps {
  onOpenModal: () => void;
}

export default function CtaSection({ onOpenModal }: CtaSectionProps) {
  return (
    <section className="py-28 px-[6vw] bg-[#0d0d0d] text-center relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-[radial-gradient(ellipse,rgba(232,93,47,0.2)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        <SectionLabel text="Ready to Build?" center />
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-tight leading-[1.1] text-[#f7f4ef] max-w-2xl mx-auto mb-5">
          Let&apos;s Turn Your Idea Into a Product That Works
        </h2>
        <p className="text-[#f7f4ef]/50 font-light max-w-md mx-auto mb-10">
          Book a free 30-minute discovery call. No commitment, no hard sell —
          just an honest conversation about your project.
        </p>

        <div className="flex flex-wrap gap-3.5 justify-center">
          <button
            onClick={onOpenModal}
            className="bg-[#f7f4ef] text-[#0d0d0d] px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#ede9e0] hover:-translate-y-0.5 transition-all"
          >
            Book Free Discovery Call →
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 text-[#f7f4ef]/70 px-8 py-4 rounded-full font-medium text-sm hover:border-white/50 hover:text-white hover:-translate-y-0.5 transition-all"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
