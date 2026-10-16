import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";
import servicesBackground from "../../imports/background9.svg";

export function Services() {
  const { lang } = useLang();
  const tx = t[lang].services;

  return (
    <section
      id="services"
      className="min-h-screen flex flex-col justify-center py-20 sm:py-28 bg-[#FFF8F3] relative overflow-hidden"
      style={{
        backgroundImage: `url("${servicesBackground}")`,
        backgroundSize: "100% auto",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="mb-12 sm:mb-16">
          <p className="text-[#77080E]/60 text-xs tracking-[0.35em] uppercase mb-5 font-light">
            {tx.eyebrow}
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-['Cormorant_Garamond'] font-light text-[#77080E]">
              {tx.headline1}
              <br />
              <em>{tx.headline2}</em>
            </h2>

            <p className="text-[#5C1A20]/60 text-sm leading-relaxed max-w-xs font-light lg:text-right pb-2">
              {tx.sub}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {tx.items.map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-[2rem] p-7 sm:p-8 border border-[#77080E]/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer group flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[#CF1028] text-[10px] font-mono tracking-[0.3em]">
                  {service.number}
                </span>

                <span className="text-[#77080E]/60 text-[10px] tracking-[0.2em] uppercase bg-[#77080E]/8 px-3 py-1 rounded-full font-light border border-[#77080E]/15">
                  {service.tag}
                </span>
              </div>

              <h3 className="font-['Cormorant_Garamond'] text-[#77080E] text-xl sm:text-2xl font-light italic mb-1 leading-snug">
                {service.title}
              </h3>

              <p className="text-[#5C1A20]/50 text-xs font-light mb-4">
                {service.shortTitle}
              </p>

              <p className="text-[#5C1A20] text-sm leading-relaxed font-light mb-6 flex-1">
                {service.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[#77080E]/10">
                <span className="text-[#5C1A20]/50 text-xs font-light">
                  {service.duration}
                </span>

                <span className="font-['Cormorant_Garamond'] text-[#77080E] text-lg font-light">
                  {service.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}