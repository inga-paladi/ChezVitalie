import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

export function Differentiators() {
  const { lang } = useLang();
  const tx = t[lang].differentiators;

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 font-['Cormorant_Garamond'] text-[#77080E]/[0.04] font-light select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(12rem, 22vw, 20rem)" }}>
        I
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
          <div>
            <p className="text-[#77080E]/60 text-xs tracking-[0.35em] uppercase mb-4 font-light">{tx.eyebrow}</p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-[#77080E]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              {tx.headline}
            </h2>
          </div>
          <p className="text-[#5C1A20]/45 text-sm leading-relaxed max-w-xs sm:text-right font-light">{tx.sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tx.pillars.map((pillar, i) => (
            <div key={i} className="bg-[#FFF5F5] rounded-[2rem] p-8 border border-[#77080E]/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group">
              <div className="w-6 h-px bg-[#77080E]/40 mb-7 group-hover:w-10 transition-all duration-500" />
              <p className="font-['Cormorant_Garamond'] text-[#77080E] text-2xl sm:text-3xl font-light mb-4 leading-snug italic">
                {pillar.label}
              </p>
              <p className="text-[#5C1A20] text-sm leading-relaxed font-light">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
