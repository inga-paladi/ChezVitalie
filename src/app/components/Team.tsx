import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

const images = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&auto=format&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&auto=format&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80&auto=format&fit=crop&crop=face",
];

export function Team() {
  const { lang } = useLang();
  const tx = t[lang].team;

  return (
    <section id="team" className="py-16 sm:py-24 bg-[#F6F0E6]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <p className="text-[#C41230] text-xs tracking-[0.25em] uppercase mb-4">{tx.eyebrow}</p>
          <h2 className="font-['Cormorant_Garamond'] font-light text-[#231C0D] max-w-lg text-3xl sm:text-4xl lg:text-5xl">
            {tx.headline}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {tx.members.map((member, i) => (
            <div key={member.name} className="group">
              <div className="relative overflow-hidden mb-5 sm:mb-6 rounded-2xl aspect-[4/5]">
                <img src={images[i]} alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E190D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              </div>
              <p className="text-[#C41230] text-xs tracking-[0.15em] uppercase mb-1">{member.role}</p>
              <h3 className="font-['Cormorant_Garamond'] text-[#231C0D] text-xl font-medium mb-1">{member.name}</h3>
              <p className="text-[#7A6B56] text-xs mb-3">{member.credentials}</p>
              <p className="text-[#7A6B56] text-sm leading-relaxed font-light">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
