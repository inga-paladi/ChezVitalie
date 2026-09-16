import logo from "@/imports/3.svg";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

const SILK = "https://images.unsplash.com/photo-1628973434123-3e956f203dd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

export function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;

  return (
    <footer className="relative overflow-hidden py-14 sm:py-20"
      style={{ backgroundImage: `url('${SILK}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-[#3D0A0F]/75" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Chez Vitalie" className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
              <span className="font-['Cormorant_Garamond'] text-white/80 text-lg italic">Chez Vitalie</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed font-light max-w-xs">{tx.tagline}</p>
          </div>

          <div>
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-5 font-light">{tx.experiences}</p>
            <ul className="space-y-3">
              {tx.experienceLinks.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-white/35 text-sm hover:text-white/70 transition-colors font-light">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-5 font-light">{tx.visit}</p>
            <ul className="space-y-3">
              {tx.visitLinks.map((s) => (
                <li key={s}>
                  <a href="#" className="text-white/35 text-sm hover:text-white/70 transition-colors font-light">{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/20 text-xs font-light">{tx.copy}</p>
          <p className="text-white/20 text-xs font-light">{tx.locations}</p>
        </div>
      </div>
    </footer>
  );
}
