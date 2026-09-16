import { useLang } from "../context/LanguageContext";

const stats = [
  { value: "150+", label: { en: "Active Members", ro: "Membri Activi" } },
  { value: "12", label: { en: "Core Protocols", ro: "Protocoale" } },
  { value: "3", label: { en: "Cities", ro: "Orașe" } },
  { value: "5", label: { en: "Years of Excellence", ro: "Ani de Excelență" } },
];

export function Stats() {
  const { lang } = useLang();

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#77080E]/10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center px-6 py-4 gap-1">
              <span
                className="font-['Cormorant_Garamond'] text-[#77080E] font-light"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                {stat.value}
              </span>
              <span className="text-[#5C1A20]/50 text-[10px] tracking-[0.25em] uppercase font-light">
                {stat.label[lang]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
