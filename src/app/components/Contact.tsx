import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

const SILK = "https://images.unsplash.com/photo-1628973434123-3e956f203dd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

export function Contact() {
  const { lang } = useLang();
  const tx = t[lang].contact;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center py-20 sm:py-28 relative overflow-hidden"
      style={{ backgroundImage: `url('${SILK}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-[#3D0A0F]/55" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-14 sm:gap-20 items-start">
          <div>
            <p className="text-white/60 text-xs tracking-[0.35em] uppercase mb-6 font-light">{tx.eyebrow}</p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-white/90 mb-6">
              {tx.headline1}<br /><em>{tx.headline2}</em>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed font-light mb-10 max-w-sm">{tx.body}</p>

            <div className="space-y-5">
              {tx.details.map((d) => (
                <div key={d.label} className="flex items-start gap-4">
                  <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-light w-20 flex-shrink-0 mt-0.5">{d.label}</span>
                  <span className="text-white/70 text-sm font-light">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="bg-white rounded-[2rem] p-10 text-center border border-[#77080E]/10 shadow-xl">
                <div className="w-12 h-12 rounded-full bg-[#77080E]/10 flex items-center justify-center mx-auto mb-5">
                  <div className="w-4 h-4 rounded-full bg-[#77080E]" />
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-[#77080E] text-2xl mb-2 italic">{tx.form.successTitle}</h3>
                <p className="text-[#5C1A20] text-sm font-light">{tx.form.successBody}</p>
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-[#77080E]/10 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#77080E]/70 text-xs uppercase tracking-[0.2em] block mb-2 font-light">{tx.form.firstName}</label>
                      <input required type="text" className="w-full bg-[#FFF5F5] border border-[#77080E]/15 rounded-2xl text-[#3D0A0F] text-sm px-4 py-3.5 focus:outline-none focus:border-[#77080E]/50 transition-colors" />
                    </div>
                    <div>
                      <label className="text-[#77080E]/70 text-xs uppercase tracking-[0.2em] block mb-2 font-light">{tx.form.lastName}</label>
                      <input required type="text" className="w-full bg-[#FFF5F5] border border-[#77080E]/15 rounded-2xl text-[#3D0A0F] text-sm px-4 py-3.5 focus:outline-none focus:border-[#77080E]/50 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[#77080E]/70 text-xs uppercase tracking-[0.2em] block mb-2 font-light">{tx.form.email}</label>
                    <input required type="email" className="w-full bg-[#FFF5F5] border border-[#77080E]/15 rounded-2xl text-[#3D0A0F] text-sm px-4 py-3.5 focus:outline-none focus:border-[#77080E]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[#77080E]/70 text-xs uppercase tracking-[0.2em] block mb-2 font-light">{tx.form.phone}</label>
                    <input type="tel" className="w-full bg-[#FFF5F5] border border-[#77080E]/15 rounded-2xl text-[#3D0A0F] text-sm px-4 py-3.5 focus:outline-none focus:border-[#77080E]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[#77080E]/70 text-xs uppercase tracking-[0.2em] block mb-2 font-light">{tx.form.interest}</label>
                    <select className="w-full bg-[#FFF5F5] border border-[#77080E]/15 rounded-2xl text-[#3D0A0F]/70 text-sm px-4 py-3.5 focus:outline-none focus:border-[#77080E]/50 transition-colors appearance-none">
                      <option value="">{tx.form.interestPlaceholder}</option>
                      {t[lang].services.items.map((s) => <option key={s.title}>{s.title}</option>)}
                      {t[lang].pricing.plans.map((p) => <option key={p.name}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[#77080E]/70 text-xs uppercase tracking-[0.2em] block mb-2 font-light">{tx.form.message}</label>
                    <textarea rows={3} className="w-full bg-[#FFF5F5] border border-[#77080E]/15 rounded-2xl text-[#3D0A0F] text-sm px-4 py-3.5 focus:outline-none focus:border-[#77080E]/50 transition-colors resize-none" placeholder={tx.form.messagePlaceholder} />
                  </div>
                  <Button type="submit" className="w-full bg-[#77080E] hover:bg-[#CF1028] text-white border-0 py-3.5 text-xs rounded-full font-light tracking-widest uppercase transition-all">
                    {tx.form.submit}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
