const testimonials = [
  {
    quote: "I came in skeptical. Six months later my cardiovascular age has dropped by twelve years according to my own cardiologist. The protocols are rigorous and the team treats you as a whole person.",
    name: "James A.",
    detail: "Member since 2024 · Executive, 51",
  },
  {
    quote: "Having tried every wellness clinic in Bucharest, Chez Vitalie is in a different category. The diagnostics are genuinely medical-grade, and nothing is invasive. I leave every session feeling clearer.",
    name: "Priya M.",
    detail: "Member since 2024 · Physician, 44",
  },
  {
    quote: "The protocols are current with the latest clinical evidence in a way I have not experienced anywhere else. Truly transformative.",
    name: "David L.",
    detail: "Member since 2024 · Athlete, 39",
  },
];

export function Testimonials() {
  return (
    <section className="min-h-screen flex flex-col justify-center py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-4 left-8 font-['Cormorant_Garamond'] text-[#77080E]/[0.05] font-light select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(10rem, 18vw, 16rem)" }}>
        "
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
          <div>
            <p className="text-[#77080E]/60 text-xs tracking-[0.35em] uppercase mb-4 font-light">Member Voices</p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-[#77080E]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Outcomes, <em>not promises</em>
            </h2>
          </div>
          <span className="self-start sm:self-end bg-[#FFF5F5] border border-[#77080E]/15 text-[#77080E]/70 text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full font-light">
            Verified Members
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((item, i) => (
            <div key={i}
              className="bg-[#FFF5F5] rounded-[2rem] p-8 border border-[#77080E]/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="font-['Cormorant_Garamond'] text-[#CF1028] text-5xl leading-none mb-5 font-light">&ldquo;</div>
                <p className="font-['Cormorant_Garamond'] text-[#3D0A0F] text-lg italic font-light leading-relaxed mb-6">
                  {item.quote}
                </p>
              </div>
              <div className="border-t border-[#77080E]/10 pt-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#77080E]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#77080E] text-xs font-['Cormorant_Garamond'] italic">{item.name[0]}</span>
                </div>
                <div>
                  <p className="text-[#77080E] text-sm font-light">{item.name}</p>
                  <p className="text-[#5C1A20]/50 text-xs mt-0.5 font-light">{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
