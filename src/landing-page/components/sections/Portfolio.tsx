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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolioItems.map((item, i) => (
          <div
            key={item.title}
            className={`reveal bg-white border border-[#0d0d0d]/8 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer ${
              item.featured ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""
            }`}
          >
            <div
              className={`flex items-center justify-center bg-linear-to-br ${item.bg} ${
                item.featured ? "h-56 lg:h-80" : "h-44"
              } text-5xl`}
            >
              {item.emoji}
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9333ea] mb-1.5">
                {item.tag}
              </p>
              <h4 className="font-display font-bold mb-1.5 tracking-tight">
                {item.title}
              </h4>
              <p className="text-sm text-[#6b6560] font-light">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
