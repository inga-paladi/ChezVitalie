import logo from "../../imports/3.svg";
import footerBackground from "../../imports/background6.svg";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

export function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;

  return (
    <footer
      className="relative overflow-hidden py-14 sm:py-20 bg-[#FFF8F3]"
      style={{
        backgroundImage: `url("${footerBackground}")`,
        backgroundSize: "100% auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={logo}
                alt="Chez Vitalie"
                className="h-10 w-10 rounded-full object-cover flex-shrink-0"
              />

              <span className="font-['Cormorant_Garamond'] text-[#77080E] text-lg italic">
                Chez Vitalie
              </span>
            </div>

            <p className="text-[#5C1A20]/65 text-sm leading-relaxed font-light max-w-xs mb-4">
              {tx.tagline}
            </p>

            <a
              href="https://instagram.com/chezvitalie"
              className="text-[#77080E]/60 text-xs tracking-[0.2em] font-light hover:text-[#CF1028] transition-colors"
            >
              {tx.social}
            </a>
          </div>

          <div>
            <p className="text-[#77080E]/70 text-[10px] tracking-[0.25em] uppercase mb-5 font-light">
              {tx.therapies}
            </p>

            <ul className="space-y-3">
              {tx.therapyLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-[#5C1A20]/60 text-sm hover:text-[#CF1028] transition-colors font-light"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[#77080E]/70 text-[10px] tracking-[0.25em] uppercase mb-5 font-light">
              {tx.visit}
            </p>

            <ul className="space-y-3">
              {tx.visitLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[#5C1A20]/60 text-sm hover:text-[#CF1028] transition-colors font-light"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#77080E]/15 pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[#5C1A20]/50 text-xs font-light">
            {tx.copy}
          </p>

          <p className="text-[#5C1A20]/50 text-xs font-light">
            {tx.locations}
          </p>
        </div>
      </div>
    </footer>
  );
}