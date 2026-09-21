import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

export function FAQ() {
  const { lang } = useLang();
  const tx = t[lang].faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="min-h-screen flex flex-col justify-center py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 font-['Cormorant_Garamond'] text-[#77080E]/[0.04] font-light select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(12rem, 20vw, 18rem)" }}>
        ?
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="mb-14 sm:mb-20">
          <p className="text-[#77080E]/60 text-xs tracking-[0.35em] uppercase mb-4 font-light">{tx.eyebrow}</p>
          <h2 className="font-['Cormorant_Garamond'] font-light text-[#77080E]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
            {tx.headline1}<br /><em>{tx.headline2}</em>
          </h2>
        </div>

        <div className="space-y-3">
          {tx.items.map((item, i) => (
            <div key={i}
              className={`rounded-[1.5rem] border transition-all duration-300 overflow-hidden ${
                open === i ? "bg-[#FFF5F5] border-[#77080E]/20" : "bg-[#FFF5F5] border-[#77080E]/8 hover:border-[#77080E]/20"
              }`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-7 py-5 text-left">
                <span className="font-['Cormorant_Garamond'] text-[#77080E] text-lg font-light italic pr-6">{item.q}</span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full border border-[#77080E]/20 flex items-center justify-center">
                  {open === i
                    ? <Minus className="w-3 h-3 text-[#77080E]/60" />
                    : <Plus className="w-3 h-3 text-[#77080E]/60" />}
                </span>
              </button>
              {open === i && (
                <div className="px-7 pb-6">
                  <div className="w-8 h-px bg-[#77080E]/20 mb-4" />
                  <p className="text-[#5C1A20] text-sm leading-relaxed font-light">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
