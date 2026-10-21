import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { label: tx.therapies, href: "#services" },
    { label: tx.experience, href: "#about" },
    { label: tx.rituals, href: "#rituals" },
    { label: tx.prices, href: "#prices" },
    { label: tx.contact, href: "#contact" },
  ];

  const scrollToContact = () => {
    setOpen(false);
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const switchLanguage = () => {
    setLang(lang === "en" ? "ro" : "en");
  };

  const linkStyle = "text-[#5C1A20]/80 hover:text-[#77080E]";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 pointer-events-none">
      <div className={`relative mx-auto max-w-[1200px] pointer-events-auto
          transition-all duration-500 ease-out rounded-2xl
          ${
            scrolled
              ? "border border-[#77080E]/10 bg-white/95 shadow-[0_10px_30px_rgba(61,10,15,0.04)] px-4 sm:px-6 py-2"
              : "bg-transparent px-4 sm:px-6 py-2"
          }`}
      >
        {/* Main navigation */}
        <div className="relative flex items-center justify-between min-h-[52px] w-full">

          {/* Desktop links - Absolutely centered across the bar */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative py-1 text-[13px] xl:text-[14px]
                  font-normal tracking-[-0.01em] whitespace-nowrap
                  transition-colors duration-300
                  after:absolute after:bottom-0 after:left-0 after:h-px
                  after:w-0 after:bg-[#77080E]
                  after:transition-all after:duration-300
                  hover:after:w-full ${linkStyle}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Empty left placeholder to balance the right-side actions in flex layout */}
          <div className="hidden lg:block" />

          {/* Desktop actions (Right side) */}
          <div className="hidden lg:flex shrink-0 items-center gap-4 xl:gap-5 ml-auto">
            <button
              onClick={switchLanguage}
              aria-label="Change language"
              className="text-[11px] font-medium tracking-[0.12em]
                transition-colors duration-300 hover:text-[#77080E] text-[#5C1A20]/75"
            >
              {lang === "en" ? "RO" : "EN"}
            </button>

            <button
              onClick={() => navigate("/login")}
              className="text-[13px] whitespace-nowrap
                transition-colors duration-300 hover:text-[#77080E] text-[#5C1A20]/80"
            >
              {tx.login}
            </button>

            <Button
              onClick={scrollToContact}
              className="h-9 rounded-full bg-[#77080E]
                hover:bg-[#5C070C] text-white px-4
                text-[11px] font-medium tracking-[0.06em]
                border border-transparent shadow-none
                transition-all duration-300 whitespace-nowrap"
            >
              {tx.cta}
              <ArrowUpRight className="ml-1.5 h-3 w-3" />
            </Button>
          </div>

          {/* Mobile brand text */}
          <div className="flex lg:hidden items-center">
            <span className="font-['Cormorant_Garamond'] italic text-[20px] text-[#3D0A0F]">
              Chez Vitalie
            </span>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={switchLanguage}
              aria-label="Change language"
              className="text-[11px] font-medium tracking-[0.1em]
                text-[#5C1A20]/75 hover:text-[#77080E] transition-colors"
            >
              {lang === "en" ? "RO" : "EN"}
            </button>

            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="flex h-9 w-9 items-center justify-center
                rounded-full border border-[#77080E]/15
                bg-white/80 shadow-sm
                text-[#3D0A0F] transition-colors duration-300
                hover:bg-[#77080E]/5"
            >
              {open ? (
                <X className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown with crisp background */}
        <div
          id="mobile-navigation"
          aria-hidden={!open}
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out bg-white rounded-2xl
            ${
              open
                ? "max-h-[85vh] opacity-100 border border-[#77080E]/10 mt-3 p-4 shadow-xl"
                : "max-h-0 opacity-0 pointer-events-none p-0"
            }`}
        >
          <nav
            aria-label="Mobile navigation"
            className="max-h-[75vh] overflow-y-auto pb-2"
          >
            {[
              ...links.slice(0, 4),
              { label: tx.faq, href: "#faq" },
              links[4],
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between
                  border-b border-[#77080E]/10 py-3
                  text-[15px] font-normal
                  tracking-[-0.01em] text-[#4B1018]
                  transition-colors duration-300 hover:text-[#77080E]"
              >
                <span>{link.label}</span>
                <ArrowUpRight
                  className="h-4 w-4 text-[#946B6A]/65"
                  strokeWidth={1.4}
                />
              </a>
            ))}

            <button
              onClick={() => {
                setOpen(false);
                navigate("/login");
              }}
              className="w-full border-b border-[#77080E]/10 py-3
                text-left text-[14px] text-[#5C1A20]/80
                transition-colors hover:text-[#77080E]"
            >
              {tx.login}
            </button>

            <Button
              onClick={scrollToContact}
              className="mt-4 h-10 w-full rounded-full
                bg-[#77080E] hover:bg-[#5C070C]
                text-white text-[11px] font-medium
                tracking-[0.1em] shadow-none"
            >
              {tx.cta}
              <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}