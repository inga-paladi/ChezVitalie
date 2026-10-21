import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
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
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1100),
      setTimeout(() => setPhase(3), 1700),
    ];

    return () => steps.forEach(clearTimeout);
  }, [lang]);

  const reveal = (show: boolean, delay = "0ms") => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(16px)",
    transition: `
      opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay},
      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}
    `,
  });

  const scrollToTherapies = () => {
    const section =
      document.getElementById("services") ??
      document.getElementById("therapies");

    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#FFF8F3]"
      style={{
        backgroundImage: `url("${heroBackground}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16 py-36 sm:py-40 text-center">
        <h1
          className="hero-text font-['Cormorant_Garamond'] font-medium italic text-[#3D0A0F] leading-[0.95]"
          style={{
            fontSize: "clamp(4.25rem, 8.5vw, 9rem)",
            letterSpacing: "-0.035em",
            ...reveal(phase >= 1),
          }}
        >
          Chez Vitalie
        </h1>

        <p
          className="hero-text max-w-xl mx-auto mt-7 sm:mt-9 text-base sm:text-lg lg:text-xl leading-relaxed font-light text-[#5C1A20]/80"
          style={reveal(phase >= 2)}
        >
          {tx.body}
        </p>

        {/* Single primary action */}
        <div
          className="mt-9 sm:mt-11 flex justify-center"
          style={reveal(phase >= 3)}
        >
          <Button
            size="lg"
            onClick={scrollToTherapies}
            className="min-h-14 rounded-full bg-[#77080E] hover:bg-[#5C070C] text-white border border-transparent px-8 sm:px-10 py-4 text-xs sm:text-sm tracking-[0.12em] font-normal uppercase transition-colors duration-300 shadow-none"
          >
            {tx.cta2}
            <ArrowRight className="ml-3 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{
          opacity: phase >= 3 ? 0.55 : 0,
          transition: "opacity 1.2s ease 0.4s",
        }}
      >
        <div className="h-10 w-px bg-gradient-to-b from-[#77080E]/60 to-transparent" />
      </div>
    </section>
  );
}