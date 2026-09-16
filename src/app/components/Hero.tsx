import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

export function Hero() {
  const { lang } = useLang();
  const tx = t[lang].hero;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setPhase(0);
    const steps = [
      setTimeout(() => setPhase(1), 300),   // eyebrow
      setTimeout(() => setPhase(2), 1000),  // title word 1
      setTimeout(() => setPhase(3), 1800),  // title word 2
      setTimeout(() => setPhase(4), 2800),  // hairline + tagline
      setTimeout(() => setPhase(5), 3800),  // body
      setTimeout(() => setPhase(6), 4600),  // buttons + badge
    ];
    return () => steps.forEach(clearTimeout);
  }, [lang]);

  const reveal = (show: boolean, delay = "0ms") => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0) scale(1)" : "translateY(18px) scale(0.98)",
    filter: show ? "blur(0px)" : "blur(3px)",
    transition: `opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, filter 1.2s ease ${delay}`,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1760224254258-ca38a5784f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=90&w=1920"
          alt="Chez Vitalie"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120304]/50 via-[#120304]/60 to-[#120304]/90" />
        <div className="absolute inset-0 bg-[#77080E]/10" />
      </div>

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-[8%] w-72 h-72 rounded-full bg-[#CF1028]/8 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[6%] w-96 h-96 rounded-full bg-[#77080E]/10 blur-[100px] pointer-events-none" />

      {/* Floating badge */}
      <div
        className="absolute top-28 right-8 sm:right-14 z-10 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-2"
        style={{ ...reveal(phase >= 6), transition: reveal(phase >= 6).transition }}>
        <div className="w-1.5 h-1.5 rounded-full bg-[#CF1028]" style={{ animation: phase >= 6 ? "softPulse 3s ease-in-out infinite" : "none" }} />
        <span className="text-white/70 text-[10px] tracking-[0.25em] uppercase font-light">Comming Soon</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full text-center px-6 sm:px-12">

        {/* Eyebrow */}
        <p
          className="text-[#CF1028]/70 text-[10px] tracking-[0.55em] uppercase mb-12 font-light"
          style={reveal(phase >= 1)}>
          {tx.eyebrow}
        </p>

        {/* Title — two words reveal independently */}
        <h1
          className="font-['Cormorant_Garamond'] font-light text-white leading-none mb-3"
          style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", letterSpacing: "-0.02em" }}>
          <span className="inline-block" style={reveal(phase >= 2)}>Chez</span>
          {" "}
          <span className="inline-block" style={reveal(phase >= 3, "80ms")}>Vitalie</span>
        </h1>

        {/* Hairline */}
        <div
          className="mx-auto mb-8"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #77080E, transparent)",
            width: phase >= 4 ? "120px" : "0px",
            opacity: phase >= 4 ? 1 : 0,
            transition: "width 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease",
          }} />

        {/* Tagline */}
        <p
          className="font-['Cormorant_Garamond'] italic font-light text-white/60 mb-8"
          style={{ fontSize: "clamp(1.25rem, 2.8vw, 2rem)", ...reveal(phase >= 4, "200ms") }}>
          {tx.headline1} {tx.headline2}
        </p>

        {/* Body */}
        <p
          className="text-white/40 text-sm sm:text-base leading-relaxed font-light max-w-md mx-auto mb-12"
          style={reveal(phase >= 5)}>
          {tx.body}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center" style={reveal(phase >= 6)}>
          <Button size="lg"
            className="bg-[#77080E]/40 hover:bg-[#77080E]/70 text-white border border-[#CF1028]/30 hover:border-[#CF1028]/60 px-9 py-4 text-sm tracking-widest rounded-full backdrop-blur-sm font-light uppercase transition-all">
            {tx.cta1}
            <ArrowRight className="ml-2.5 h-3.5 w-3.5" />
          </Button>
          <Button size="lg" variant="outline"
            className="border-white/15 text-white/60 hover:bg-white/5 hover:text-white px-9 py-4 text-sm tracking-widest bg-transparent rounded-full font-light uppercase">
            {tx.cta2}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: phase >= 6 ? 0.45 : 0, transition: "opacity 1.6s ease 0.4s" }}>
        <p className="text-white/50 text-[9px] tracking-[0.45em] uppercase font-light">{tx.est}</p>
        <div className="w-px h-8 bg-gradient-to-b from-[#77080E]/60 to-transparent" />
        <ArrowDown className="w-3.5 h-3.5 text-white/30" style={{ animation: phase >= 6 ? "floatDown 2.5s ease-in-out infinite" : "none" }} />
      </div>

      <style>{`
        @keyframes softPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
        @keyframes floatDown { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
      `}</style>
    </section>
  );
}
