import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";
import ritualsBackground from "../../imports/background6.svg";

export function Rituals() {
  const { lang } = useLang();
  const tx = t[lang].rituals;

  return (
    <section
      id="rituals"
      className="min-h-screen flex flex-col justify-center py-20 sm:py-28 bg-[#FFF8F3] relative overflow-hidden"
      style={{
        backgroundImage: `url("${ritualsBackground}")`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute top-0 right-0 font-['Cormorant_Garamond'] text-[#77080E]/[0.04] font-light select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(12rem, 20vw, 18rem)" }}
      >
        II
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 sm:mb-20 gap-4">
          <div>
            <p className="text-[#77080E]/60 text-xs tracking-[0.35em] uppercase mb-4 font-light">
              {tx.eyebrow}
            </p>

            <h2
              className="font-['Cormorant_Garamond'] font-light text-[#77080E]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              {tx.headline1}
              <br />
              <em>{tx.headline2}</em>
            </h2>
          </div>

          <p className="text-[#5C1A20]/50 text-sm leading-relaxed max-w-xs sm:text-right font-light">
            {tx.sub}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {tx.items.map((ritual, i) => (
            <div
              key={i}
              className={`rounded-[2rem] p-8 sm:p-10 border flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                ritual.featured
                  ? "bg-[#77080E] border-[#77080E] shadow-2xl shadow-[#77080E]/20 sm:-translate-y-2"
                  : "bg-[#FFF5F5] border-[#77080E]/10 hover:shadow-lg"
              }`}
            >
              {ritual.featured && (
                <span className="self-start bg-white/15 border border-white/25 text-white/80 text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-light mb-6">
                  Most Complete
                </span>
              )}

              <p
                className={`text-[10px] tracking-[0.2em] uppercase font-light mb-3 ${
                  ritual.featured ? "text-white/50" : "text-[#CF1028]/70"
                }`}
              >
                {ritual.combo}
              </p>

              <h3
                className={`font-['Cormorant_Garamond'] text-2xl font-light italic mb-4 leading-snug ${
                  ritual.featured ? "text-white" : "text-[#77080E]"
                }`}
              >
                {ritual.name}
              </h3>

              <p
                className={`text-sm leading-relaxed font-light mb-8 flex-1 ${
                  ritual.featured ? "text-white/65" : "text-[#5C1A20]"
                }`}
              >
                {ritual.description}
              </p>

              <div
                className={`border-t pt-5 flex items-end justify-between ${
                  ritual.featured ? "border-white/15" : "border-[#77080E]/10"
                }`}
              >
                <div>
                  <p
                    className={`text-xs font-light mb-1 ${
                      ritual.featured ? "text-white/40" : "text-[#5C1A20]/40"
                    }`}
                  >
                    {ritual.duration}
                  </p>

                  <p
                    className={`text-xs line-through font-light ${
                      ritual.featured ? "text-white/30" : "text-[#5C1A20]/30"
                    }`}
                  >
                    {ritual.regularPrice}
                  </p>
                </div>

                <span
                  className={`font-['Cormorant_Garamond'] text-3xl font-light ${
                    ritual.featured ? "text-white" : "text-[#77080E]"
                  }`}
                >
                  {ritual.ritualPrice}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}