import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

const SILK = "https://images.unsplash.com/photo-1628973434123-3e956f203dd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

const partners = [
  { name: "Institute of Longevity Medicine", location: "London, UK", type: { en: "Research Partner", ro: "Partener de Cercetare" } },
  { name: "Harley Street Wellness", location: "London, UK", type: { en: "Wellness Partner", ro: "Partener Wellness" } },
];

export function Partners() {
  const { lang } = useLang();
  const tx = t[lang].partners;

  return (
    <section className="min-h-screen flex flex-col justify-center py-20 sm:py-28 relative overflow-hidden"
      style={{ backgroundImage: `url('${SILK}')`, backgroundSize: "cover", backgroundPosition: "center 40%" }}>
      <div className="absolute inset-0 bg-[#3D0A0F]/55" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <p className="text-white/60 text-xs tracking-[0.35em] uppercase mb-4 font-light">{tx.eyebrow}</p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-white/90">
              {tx.headline1}<br /><em>{tx.headline2}</em>
            </h2>
          </div>
          <p className="text-white/45 text-sm leading-relaxed max-w-xs lg:text-right font-light">{tx.sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mb-14">
          {partners.map((partner) => (
            <div key={partner.name}
              className="bg-white rounded-[2rem] px-7 py-8 border border-[#77080E]/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <p className="text-[#CF1028] text-xs tracking-[0.2em] uppercase mb-3 font-light">{partner.type[lang]}</p>
              <p className="font-['Cormorant_Garamond'] text-[#77080E] text-xl font-light italic mb-1">{partner.name}</p>
              <p className="text-[#5C1A20]/60 text-xs font-light">{partner.location}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-[2rem] border border-white/15 p-8 sm:p-12 max-w-2xl">
          <div className="font-['Cormorant_Garamond'] text-white/30 text-5xl leading-none mb-4">&ldquo;</div>
          <p className="font-['Cormorant_Garamond'] text-white/80 text-xl sm:text-2xl italic font-light leading-relaxed mb-5">
            A clinic that thinks like a research institution.
          </p>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-light">— Institute of Longevity Medicine, London</p>
        </div>
      </div>
    </section>
  );
}
