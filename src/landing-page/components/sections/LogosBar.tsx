const logos = ["Konga", "PayStack", "Flutterwave", "SME Hub NG", "TechNext"];

export default function LogosBar() {
  return (
    <div className="bg-[#ede9e0] border-y border-[#0d0d0d]/10 px-[6vw] py-6 flex items-center gap-12 flex-wrap">
      <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#6b6560] whitespace-nowrap">
        Trusted by
      </p>
      <div className="flex items-center gap-10 flex-wrap">
        {logos.map((logo) => (
          <span
            key={logo}
            className="font-display text-base font-bold text-gray-600 tracking-tight hover:text-[#0d0d0d] transition-colors cursor-default"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
