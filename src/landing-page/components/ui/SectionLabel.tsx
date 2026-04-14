interface SectionLabelProps {
  text: string;
  center?: boolean;
}

export default function SectionLabel({ text, center }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-2 mb-4 ${center ? "justify-center" : ""}`}
    >
      <span className="w-5 h-0.5 bg-[#9333ea] rounded-full" />
      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#9333ea]">
        {text}
      </span>
    </div>
  );
}
