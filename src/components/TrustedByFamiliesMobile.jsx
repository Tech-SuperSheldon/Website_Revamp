// Mobile-only "Trusted by families in ..." strip, shown right below the hero.
// Replicates the reference mockup using flag emoji + text (no source image).
export default function TrustedByFamiliesMobile() {
  return (
    <section className="md:hidden py-6 px-4">
      <p className="text-center text-[13px] font-bold tracking-[0.12em] text-slate-500 uppercase mb-4">
        Trusted by Families In
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 max-w-xs mx-auto">
        <span className="flex items-center gap-1.5 text-[15px] font-bold text-[#0b2545] whitespace-nowrap">
          <span className="text-lg leading-none">🇬🇧</span> UK
        </span>
        <span className="flex items-center gap-1.5 text-[15px] font-bold text-[#0b2545] whitespace-nowrap">
          <span className="text-lg leading-none">🇦🇺</span> Australia
        </span>
        <span className="flex items-center gap-1.5 text-[15px] font-bold text-[#0b2545] whitespace-nowrap">
          <span className="text-lg leading-none">🇺🇸</span> USA
        </span>
        <span className="flex items-center gap-1.5 text-[15px] font-bold text-[#0b2545] whitespace-nowrap">
          <span className="text-lg leading-none">🇪🇺</span> European Counties
        </span>
        <span className="flex items-center gap-1.5 text-[15px] font-bold text-[#0b2545] whitespace-nowrap">
          <span className="text-lg leading-none">🇳🇿</span> New Zealand
        </span>
      </div>
    </section>
  );
}
