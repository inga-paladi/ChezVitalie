import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";
import aboutBackground from "../../imports/background4.webp";

export function Differentiators() {
  const { lang } = useLang();
  const tx = t[lang].differentiators;

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center py-24 sm:py-32 bg-[#FFF8F3] relative overflow-hidden"
      style={{
        backgroundImage: `url("${aboutBackground}")`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute top-0 right-0 font-['Cormorant_Garamond'] text-[#77080E]/[0.03] font-light select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(12rem, 22vw, 20rem)" }}
      >
        I
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-2xl mb-16 sm:mb-20">
          <p className="text-[#77080E]/70 text-xs tracking-[0.35em] uppercase mb-3 font-light">
            {tx.eyebrow}
          </p>

          <h2
            className="font-['Cormorant_Garamond'] font-light text-[#77080E]"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}
          >
            {tx.headline}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {tx.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-[#FFF5F5]/80 backdrop-blur-sm rounded-[2rem] p-8 sm:p-10 border border-[#77080E]/10 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 group flex flex-col justify-between"
            >
              <div>
                {/* Number is larger than the title, aligned on the same line */}
                <div className="flex items-baseline gap-3.5 mb-5">
                  <span className="font-['Cormorant_Garamond'] text-[#77080E] text-4xl sm:text-5xl font-light leading-none shrink-0">
                    {pillar.id}
                  </span>

                  <p className="font-['Cormorant_Garamond'] text-[#77080E] text-xl sm:text-2xl font-light leading-snug">
                    {pillar.label}
                  </p>
                </div>

                <div className="w-full h-[1px] bg-[#77080E]/15 mb-6"></div>
              </div>

              <p className="text-[#5C1A20]/80 text-sm sm:text-[0.95rem] leading-relaxed font-light">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <p className="text-[#5C1A20]/60 text-sm sm:text-base font-light tracking-wide text-right max-w-md">
            {tx.sub}
          </p>
        </div>

      </div>
    </section>
  );
}