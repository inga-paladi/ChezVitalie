import { useState, useEffect } from "react";
import logo from "@/imports/3.svg";
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
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: tx.services, href: "#services" },
    { label: tx.about, href: "#about" },
    { label: tx.membership, href: "#membership" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 sm:px-6 pointer-events-none">
      <div
        className={`w-full max-w-5xl pointer-events-auto transition-all duration-500 ${
          scrolled
            ? "bg-[#120304]/90 backdrop-blur-xl border border-[#77080E]/25 shadow-2xl rounded-full px-6 py-3"
            : "bg-transparent px-2 py-2"
        }`}>
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <img src={logo} alt="Chez Vitalie" className="h-9 w-9 rounded-full object-cover flex-shrink-0" />
            <span className="font-['Cormorant_Garamond'] text-xl font-light italic tracking-wide text-white transition-colors">
              Chez Vitalie
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <a key={link.href} href={link.href}
                className="text-sm tracking-wide transition-colors hover:text-[#CF1028] font-light text-white">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setLang(lang === "en" ? "ro" : "en")}
              className="text-xs tracking-widest uppercase font-mono transition-colors hover:text-[#CF1028] text-white">
              {lang === "en" ? "RO" : "EN"}
            </button>
            <button onClick={() => navigate("/login")}
              className="text-sm font-light transition-colors hover:text-[#CF1028] text-white">
              {tx.login}
            </button>
            <Button size="sm" className="bg-[#CF1028] hover:bg-[#77080E] text-white text-sm px-5 rounded-full transition-colors font-light border-0">
              {tx.cta}
            </Button>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 transition-colors text-white">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-[#120304]/95 backdrop-blur-xl border border-[#77080E]/25 rounded-[1.5rem] px-6 py-6 flex flex-col gap-5 pointer-events-auto shadow-2xl">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}
              className="text-sm text-white/70 tracking-wide hover:text-[#CF1028] transition-colors font-light">
              {link.label}
            </a>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-[#77080E]/20">
            <button onClick={() => setLang(lang === "en" ? "ro" : "en")}
              className="text-xs tracking-widest uppercase font-mono text-white/40 hover:text-[#CF1028] transition-colors">
              {lang === "en" ? "Română" : "English"}
            </button>
            <Button size="sm" className="bg-[#CF1028] hover:bg-[#77080E] text-white rounded-full font-light">
              {tx.cta}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
