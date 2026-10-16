import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

export function Nav() {
  const { lang, setLang } = useLang();
  const tx = t[lang].nav;
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: tx.therapies, href: "#services" },
    { label: tx.experience, href: "#about" },
    { label: tx.rituals, href: "#rituals" },
    { label: tx.prices, href: "#prices" },
    { label: tx.faq, href: "#faq" },
    { label: tx.contact, href: "#contact" },
  ];

  return (
    <>
      {/* Announcement bar */}


      <header className="fixed top-7 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-3 pointer-events-none">
        <div className={`w-full max-w-5xl pointer-events-auto transition-all duration-500 ${
          scrolled
            ? "bg-[#120304]/92 backdrop-blur-xl border border-[#77080E]/25 shadow-2xl rounded-full px-6 py-3"
            : "bg-transparent px-0 py-2"
        }`}>
          {/* Strict 3-column grid layout: [Left Spacer] [Centered Nav Links] [Right Edge Group] */}
          <div className="relative hidden lg:grid grid-cols-[1fr_auto_1fr] items-center min-h-10 w-full">
            
            {/* Left Column (Empty Spacer) */}
            <div />

            {/* Middle Column: Nav links perfectly centered */}
            <nav className="flex items-center justify-center gap-6">
              {links.map((link) => (
                <a key={link.href} href={link.href}
                  className={`text-xs tracking-wide transition-colors hover:text-[#CF1028] font-light ${scrolled ? "text-white/80" : "text-[#5C1A20]/80"}`}>
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Column: RO, My Account, and CTA button pushed all the way to the right */}
            <div className="flex items-center justify-end gap-5 w-full">
              <button onClick={() => setLang(lang === "en" ? "ro" : "en")}
                className={`text-xs tracking-widest uppercase font-mono transition-colors hover:text-[#CF1028] ${scrolled ? "text-white/60" : "text-[#5C1A20]/60"}`}>
                {lang === "en" ? "RO" : "EN"}
              </button>
              <button onClick={() => navigate("/login")}
                className={`text-xs font-light transition-colors hover:text-[#CF1028] ${scrolled ? "text-white/70" : "text-[#5C1A20]/70"}`}>
                {tx.login}
              </button>
              <Button size="sm" className="bg-[#CF1028] hover:bg-[#77080E] text-white text-xs px-5 rounded-full transition-colors font-light border-0 tracking-wide">
                {tx.cta}
              </Button>
            </div>

          </div>

          {/* Mobile header row */}
          <div className="flex lg:hidden items-center justify-between min-h-10 px-4">
            <button onClick={() => setOpen(!open)}
              className={`p-2 transition-colors ml-auto ${scrolled ? "text-white" : "text-[#3D0A0F]"}`}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-white border border-[#77080E]/15 rounded-[1.5rem] px-6 py-6 flex flex-col gap-1 pointer-events-auto shadow-2xl">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="text-sm text-[#5C1A20]/80 tracking-wide hover:text-[#CF1028] transition-colors font-light py-2.5 border-b border-[#77080E]/8 last:border-0">
                {link.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-3">
              <button onClick={() => setLang(lang === "en" ? "ro" : "en")}
                className="text-xs tracking-widest uppercase font-mono text-[#5C1A20]/50 hover:text-[#CF1028] transition-colors">
                {lang === "en" ? "Română" : "English"}
              </button>
              <Button size="sm" className="bg-[#CF1028] hover:bg-[#77080E] text-white rounded-full font-light border-0 text-xs tracking-wide">
                {tx.cta}
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}