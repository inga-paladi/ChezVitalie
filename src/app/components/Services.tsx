import { ArrowUpRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

const SILK = "https://images.unsplash.com/photo-1628973434123-3e956f203dd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

export function Services() {
  const { lang } = useLang();
  const tx = t[lang].services;

  const [featured, ...rest] = tx.items;

  return (
    <section id="services" className="min-h-screen flex flex-col justify-center py-20 sm:py-28 relative overflow-hidden"
      style={{ backgroundImage: `url('${SILK}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-[#3D0A0F]/55" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="mb-12 sm:mb-16">
          <p className="text-white/60 text-xs tracking-[0.35em] uppercase mb-5 font-light">{tx.eyebrow}</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-['Cormorant_Garamond'] font-light text-white/90">
              {tx.headline1}<br /><em>{tx.headline2}</em>
            </h2>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs font-light lg:text-right pb-2">{tx.sub}</p>
          </div>
        </div>

        {featured && (
          <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-[#77080E]/10 mb-5 group cursor-pointer hover:shadow-2xl transition-all duration-500">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[#CF1028] text-[10px] font-mono tracking-[0.3em]">01</span>
                  <span className="w-8 h-px bg-[#77080E]/30" />
                  <span className="text-[#77080E]/60 text-[10px] tracking-[0.2em] uppercase bg-[#77080E]/8 px-3 py-1 rounded-full font-light border border-[#77080E]/15">{featured.tag}</span>
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-[#77080E] font-light leading-tight mb-4"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
                  {featured.title}
                </h3>
                <p className="text-[#5C1A20] text-sm leading-relaxed font-light max-w-lg">{featured.description}</p>
              </div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#77080E]/8 border border-[#77080E]/15 flex items-center justify-center group-hover:bg-[#77080E] group-hover:border-[#77080E] transition-all duration-300 self-start">
                <ArrowUpRight className="w-4 h-4 text-[#77080E] group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {rest.map((service, i) => (
            <div key={i}
              className="bg-white rounded-[2rem] p-8 sm:p-10 border border-[#77080E]/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer group">
              <div className="flex items-start justify-between mb-8">
                <span className="text-[#CF1028] text-[10px] font-mono tracking-[0.3em]">{String(i + 2).padStart(2, "0")}</span>
                <span className="text-[#77080E]/70 text-[10px] tracking-[0.2em] uppercase bg-[#77080E]/8 px-3 py-1 rounded-full font-light border border-[#77080E]/15">{service.tag}</span>
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-[#77080E] mb-4 font-light leading-tight"
                style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)" }}>
                {service.title}
              </h3>
              <p className="text-[#5C1A20] text-sm leading-relaxed font-light mb-6">{service.description}</p>
              <div className="flex items-center gap-2 text-[#77080E]/50 text-xs tracking-[0.15em] uppercase font-light group-hover:text-[#CF1028] transition-colors">
                <span>Learn more</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
