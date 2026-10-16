import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";
import heroBackground from "../../imports/background1.png";

export function Hero() {
  const { lang } = useLang();
  const tx = t[lang].hero;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setPhase(0);

    const steps = [
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(4), 2800),
      setTimeout(() => setPhase(5), 3800),
      setTimeout(() => setPhase(6), 4600),
    ];

    return () => steps.forEach(clearTimeout);
  }, [lang]);

  const reveal = (show: boolean, delay = "0ms") => ({
    opacity: show ? 1 : 0,
    transform: show
      ? "translateY(0) scale(1)"
      : "translateY(18px) scale(0.98)",
    transition: `
      opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay},
      transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}
    `,
  });

  return (
    <section
      id="hero"
      className="relative isolate min-h-screen flex items-center justify-center overflow-hidden bg-[#FFF8F3]"
      style={{
        backgroundImage: `url("${heroBackground}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Main content */}
      <div
        className="relative z-10 w-full text-center px-6 sm:px-12 py-40"
        style={{
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <h1
          className="hero-text font-['Cormorant_Garamond'] font-medium italic text-[#3D0A0F] leading-none mb-3"
          style={{
            fontSize: "clamp(4rem, 8vw, 10rem)",
            letterSpacing: "-0.02em",
            ...reveal(phase >= 2),
          }}
        >
          Chez Vitalie
        </h1>

        {/* Animated divider */}
        <div
          aria-hidden="true"
          className="mx-auto mb-8"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #77080E, transparent)",
            width: phase >= 4 ? "120px" : "0px",
            opacity: phase >= 4 ? 1 : 0,
            transition:
              "width 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease",
          }}
        />

        {/* Description */}
        <p
          className="hero-text text-[#5C1A20]/80 text-sm sm:text-base leading-relaxed font-light max-w-md mx-auto mb-12"
          style={reveal(phase >= 5)}
        >
          {tx.body}
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          style={{
            ...reveal(phase >= 6),
            background: "transparent",
          }}
        >
          <Button
            size="lg"
            className="bg-[#77080E] hover:bg-[#CF1028] text-white border-0 px-9 py-4 text-sm tracking-widest rounded-full font-light uppercase transition-all shadow-lg shadow-[#77080E]/20"
          >
            {tx.cta1}
            <ArrowRight className="ml-2.5 h-3.5 w-3.5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-[#77080E]/25 text-[#77080E] hover:bg-[#77080E]/10 px-9 py-4 text-sm tracking-widest bg-transparent rounded-full font-light uppercase"
          >
            {tx.cta2}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{
          background: "transparent",
          opacity: phase >= 6 ? 0.5 : 0,
          transition: "opacity 1.6s ease 0.4s",
        }}
      >
        <p className="hero-text text-[#77080E]/70 text-[9px] tracking-[0.45em] uppercase font-light">
          {tx.est}
        </p>

        <div className="w-px h-8 bg-gradient-to-b from-[#77080E]/40 to-transparent" />

        <ArrowDown
          className="w-3.5 h-3.5 text-[#77080E]/50"
          style={{
            animation:
              phase >= 6 ? "floatDown 2.5s ease-in-out infinite" : "none",
          }}
        />
      </div>

      <style>{`
        #hero .hero-text {
          background: transparent !important;
          box-shadow: none !important;
        }

        @keyframes floatDown {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(5px);
          }
        }
      `}</style>
    </section>
  );
}