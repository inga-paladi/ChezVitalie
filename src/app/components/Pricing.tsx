import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

const SILK = "https://images.unsplash.com/photo-1628973434123-3e956f203dd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

export function Pricing() {
  const { lang } = useLang();
  const tx = t[lang].pricing;
  const [annual, setAnnual] = useState(false);

  return (
    <section id="prices" className="min-h-screen flex flex-col justify-center py-20 sm:py-28 relative overflow-hidden"
      style={{ backgroundImage: `url('${SILK}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-[#3D0A0F]/55" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <p className="text-white/60 text-xs tracking-[0.35em] uppercase mb-4 font-light">{tx.eyebrow}</p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-white/90"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              {tx.headline1}<br /><em>{tx.headline2}</em>
            </h2>
          </div>
          {/* Monthly / Annual toggle */}
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`text-xs tracking-[0.15em] uppercase font-light px-4 py-2 rounded-full transition-all ${!annual ? "bg-white text-[#77080E]" : "text-white/60 hover:text-white"}`}>
              {tx.toggle.monthly}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`text-xs tracking-[0.15em] uppercase font-light px-4 py-2 rounded-full transition-all ${annual ? "bg-white text-[#77080E]" : "text-white/60 hover:text-white"}`}>
              {tx.toggle.annual}
            </button>
          </div>
        </div>

        <p className="text-white/40 text-sm font-light mb-10 max-w-sm">{tx.sub}</p>

        <div className="grid sm:grid-cols-3 gap-5">
          {tx.plans.map((plan, i) => (
            <div key={i}
              className={`rounded-[2rem] p-8 sm:p-10 border transition-all duration-500 flex flex-col ${
                plan.featured
                  ? "bg-white border-white shadow-2xl sm:-translate-y-2"
                  : "bg-white/10 backdrop-blur-sm border-white/15 hover:-translate-y-1"
              }`}>
              {plan.featured && (
                <span className="self-start bg-[#77080E] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-light mb-6 border-0">
                  Recommended
                </span>
              )}

              <p className={`text-xs tracking-[0.2em] uppercase font-light mb-3 ${plan.featured ? "text-[#CF1028]/80" : "text-white/50"}`}>
                {plan.name}
              </p>

              <div className="mb-1">
                <span className={`font-['Cormorant_Garamond'] font-light ${plan.featured ? "text-[#77080E]" : "text-white"}`}
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                  {annual ? plan.annualPrice : plan.monthlyPrice}
                </span>
              </div>
              <p className={`text-xs font-light mb-6 ${plan.featured ? "text-[#5C1A20]/50" : "text-white/35"}`}>
                {annual ? plan.annualNote : plan.period}
              </p>

              <p className={`text-sm leading-relaxed font-light mb-8 flex-1 ${plan.featured ? "text-[#5C1A20]" : "text-white/65"}`}>
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${plan.featured ? "text-[#CF1028]/60" : "text-white/40"}`} />
                    <span className={`text-xs font-light leading-snug ${plan.featured ? "text-[#5C1A20]/80" : "text-white/60"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full text-xs tracking-widest uppercase font-light py-3.5 border-0 transition-all ${
                  plan.featured
                    ? "bg-[#77080E] text-white hover:bg-[#CF1028] shadow-md shadow-[#77080E]/20"
                    : "bg-white/15 text-white hover:bg-white/25 border border-white/20"
                }`}>
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
