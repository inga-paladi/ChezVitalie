import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

export function Stats() {
  const { lang } = useLang();
  const stats = t[lang].stats;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#77080E]/10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center px-6 py-4 gap-1">
              <span className="font-['Cormorant_Garamond'] text-[#77080E] font-light"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                {stat.value}
              </span>
              <span className="text-[#5C1A20]/50 text-[10px] tracking-[0.2em] uppercase font-light leading-snug text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
