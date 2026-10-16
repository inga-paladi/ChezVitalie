import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";
import partnersBackground from "../../imports/background5.svg";

const partners = [
  {
    name: "Institute of Longevity Medicine",
    location: "London, UK",
    type: {
      en: "Research Partner",
      ro: "Partener de Cercetare",
    },
  },
  {
    name: "Harley Street Wellness",
    location: "London, UK",
    type: {
      en: "Wellness Partner",
      ro: "Partener Wellness",
    },
  },
];

export function Partners() {
  const { lang } = useLang();
  const tx = t[lang].partners;

  return (
    <section
      className="min-h-screen flex flex-col justify-center py-20 sm:py-28 bg-[#FFF8F3] relative overflow-hidden"
      style={{
        backgroundImage: `url("${partnersBackground}")`,
        backgroundSize: "100% auto",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <p className="text-[#77080E]/60 text-xs tracking-[0.35em] uppercase mb-4 font-light">
              {tx.eyebrow}
            </p>

            <h2 className="font-['Cormorant_Garamond'] font-light text-[#77080E]">
              {tx.headline1}
              <br />
              <em>{tx.headline2}</em>
            </h2>
          </div>

          <p className="text-[#5C1A20]/60 text-sm leading-relaxed max-w-xs lg:text-right font-light">
            {tx.sub}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mb-14">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white rounded-[2rem] px-7 py-8 border border-[#77080E]/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-[#CF1028] text-xs tracking-[0.2em] uppercase mb-3 font-light">
                {partner.type[lang]}
              </p>

              <p className="font-['Cormorant_Garamond'] text-[#77080E] text-xl font-light italic mb-1">
                {partner.name}
              </p>

              <p className="text-[#5C1A20]/60 text-xs font-light">
                {partner.location}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#FFF5F5] rounded-[2rem] border border-[#77080E]/10 p-8 sm:p-12 max-w-2xl">
          <div className="font-['Cormorant_Garamond'] text-[#CF1028]/50 text-5xl leading-none mb-4">
            &ldquo;
          </div>

          <p className="font-['Cormorant_Garamond'] text-[#77080E] text-xl sm:text-2xl italic font-light leading-relaxed mb-5">
            A clinic that thinks like a research institution.
          </p>

          <p className="text-[#5C1A20]/50 text-xs tracking-[0.2em] uppercase font-light">
            — Institute of Longevity Medicine, London
          </p>
        </div>
      </div>
    </section>
  );
}