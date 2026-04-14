import { WHATSAPP_NUMBER } from "@/landing-page/data";

const links = {
  Services: [
    "Web Applications",
    "SaaS Platforms",
    "E-Commerce",
    "MVP in a Week",
    "API Development",
  ],
  Company: ["About", "Our Work", "NGPage", "Portfolio", "Contact"],
  Connect: ["LinkedIn", "Twitter / X", "Instagram", "WhatsApp"],
};

export default function Footer() {
  return (
    <footer className="bg-[#080808] text-[#f7f4ef]/40 px-[6vw] pt-16 pb-10">
      <div className="flex flex-wrap justify-between gap-12 mb-12">
        {/* Brand */}
        <div>
          <p className="font-display text-2xl font-extrabold tracking-tight text-[#f7f4ef] mb-3">
            ofa<span className="text-[#9333ea]">.</span>
          </p>
          <p className="text-sm font-light max-w-[260px] leading-relaxed">
            Building world-class digital products for Nigerian and African
            businesses. Based in Nigeria, shipping globally.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([heading, items]) => (
          <div key={heading}>
            <h5 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#f7f4ef] mb-4">
              {heading}
            </h5>
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li key={item}>
                  <a
                    href={
                      item === "WhatsApp"
                        ? `https://wa.me/${WHATSAPP_NUMBER}`
                        : item === "Portfolio"
                          ? "https://besttosan.com"
                          : "#"
                    }
                    className="text-sm hover:text-[#f7f4ef] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/7 pt-6 flex flex-wrap justify-between items-center gap-3">
        <p className="text-xs">
          © {new Date().getFullYear()} Ofashi. All rights reserved. Built with ❤️ in Nigeria.
        </p>
        <p className="text-xs">
          <a href="https://ofashi.com" className="text-[#9333ea] hover:underline">
            ofashi.com
          </a>{" "}
          ·{" "}
          <a href="https://besttosan.com" className="text-[#9333ea] hover:underline">
            besttosan.com
          </a>
        </p>
      </div>
    </footer>
  );
}
