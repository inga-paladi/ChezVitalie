import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";
import pricingBackground from "../../imports/background7.webp";

export function Pricing() {
  const { lang } = useLang();
  const tx = t[lang].pricing;
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="prices"
      className="min-h-screen flex flex-col justify-center py-20 sm:py-28 bg-[#FFF8F3] relative overflow-hidden"
      style={{
        backgroundImage: `url("${pricingBackground}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
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

          {/* Monthly / Annual toggle */}
          <div className="self-start sm:self-auto flex items-center gap-1 bg-[#77080E]/5 border border-[#77080E]/15 rounded-full p-1">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
              className={`text-xs tracking-[0.15em] uppercase font-light px-4 py-2 rounded-full transition-all ${
                !annual
                  ? "bg-[#77080E] text-white"
                  : "text-[#77080E]/60 hover:text-[#77080E]"
              }`}
            >
              {tx.toggle.monthly}
            </button>

            <button
              type="button"
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
              className={`text-xs tracking-[0.15em] uppercase font-light px-4 py-2 rounded-full transition-all ${
                annual
                  ? "bg-[#77080E] text-white"
                  : "text-[#77080E]/60 hover:text-[#77080E]"
              }`}
            >
              {tx.toggle.annual}
            </button>
          </div>
        </div>

        <p className="text-[#5C1A20]/60 text-sm font-light mb-10 max-w-sm">
          {tx.sub}
        </p>

        <div className="grid sm:grid-cols-3 gap-5">
          {tx.plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-[2rem] p-8 sm:p-10 border transition-all duration-500 flex flex-col ${
                plan.featured
                  ? "bg-white border-[#77080E]/25 shadow-2xl shadow-[#77080E]/10 sm:-translate-y-2"
                  : "bg-[#FFF5F5] border-[#77080E]/10 hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              {plan.featured && (
                <span className="self-start bg-[#77080E] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-light mb-6">
                  Recommended
                </span>
              )}

              <p className="text-[#CF1028]/80 text-xs tracking-[0.2em] uppercase font-light mb-3">
                {plan.name}
              </p>

              <div className="mb-1">
                <span
                  className="font-['Cormorant_Garamond'] font-light text-[#77080E]"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  {annual ? plan.annualPrice : plan.monthlyPrice}
                </span>
              </div>

              <p className="text-[#5C1A20]/50 text-xs font-light mb-6">
                {annual ? plan.annualNote : plan.period}
              </p>

              <p className="text-[#5C1A20] text-sm leading-relaxed font-light mb-8 flex-1">
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#CF1028]/60" />

                    <span className="text-[#5C1A20]/80 text-xs font-light leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full text-xs tracking-widest uppercase font-light py-3.5 transition-all ${
                  plan.featured
                    ? "bg-[#77080E] text-white hover:bg-[#CF1028] shadow-md shadow-[#77080E]/20 border-0"
                    : "bg-transparent text-[#77080E] hover:bg-[#77080E]/10 border border-[#77080E]/25"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}