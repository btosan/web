import SectionLabel from "@/landing-page/components/ui/SectionLabel";
import { portfolioItems } from "@/landing-page/data";

export default function Portfolio() {
  return (
    <section id="work" className="py-24 px-[6vw] bg-[#ede9e0]">
      <SectionLabel text="Our Work" />

      <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold tracking-tight leading-[1.1] mb-4">
        Products We&apos;ve Shipped
      </h2>

      <p className="text-[#6b6560] font-light leading-relaxed max-w-lg mb-14">
        Real projects. Real businesses. Real results across Nigeria and Africa.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {portfolioItems.map((item) => (
          <div
            key={item.title}
            className="bg-white border border-[#0d0d0d]/8 rounded-2xl overflow-hidden hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="h-44 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9333ea]">
                {item.tag}
              </p>

              <h4 className="font-display font-bold tracking-tight text-[#0d0d0d]">
                {item.title}
              </h4>

              <p className="text-sm text-[#6b6560] font-light leading-relaxed">
                {item.description}
              </p>

              <div className="h-px bg-[#0d0d0d]/10 my-2" />

              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#0d0d0d] inline-flex items-center gap-1 hover:underline"
              >
                View Live Demo →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}