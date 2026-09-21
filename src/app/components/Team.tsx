import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

const SILK = "https://images.unsplash.com/photo-1628973434123-3e956f203dd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

const images = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&auto=format&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&auto=format&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80&auto=format&fit=crop&crop=face",
];

export function Team() {
  const { lang } = useLang();
  const tx = t[lang].team;

  return (
    <section id="team" className="min-h-screen flex flex-col justify-center py-20 sm:py-28 relative overflow-hidden"
      style={{ backgroundImage: `url('${SILK}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-[#3D0A0F]/55" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="mb-14 sm:mb-20">
          <p className="text-white/60 text-xs tracking-[0.35em] uppercase mb-5 font-light">{tx.eyebrow}</p>
          <h2 className="font-['Cormorant_Garamond'] font-light text-white/90">
            {tx.headline}
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
          {tx.members.map((member, i) => (
            <div key={member.name} className="bg-white rounded-[2rem] overflow-hidden border border-[#77080E]/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={images[i]}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D0A0F]/30 to-transparent" />
              </div>
              <div className="p-7">
                <p className="text-[#CF1028] text-[10px] tracking-[0.2em] uppercase mb-2 font-light">{member.role}</p>
                <h3 className="font-['Cormorant_Garamond'] text-[#77080E] text-xl font-light italic mb-1">{member.name}</h3>
                <p className="text-[#5C1A20]/50 text-xs mb-4 font-light">{member.credentials}</p>
                <div className="w-8 h-px bg-[#77080E]/25 mb-4" />
                <p className="text-[#5C1A20] text-sm leading-relaxed font-light">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
