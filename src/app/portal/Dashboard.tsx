import { useNavigate } from "react-router";
import { CalendarDays, ArrowRight, Leaf } from "lucide-react";
import { patient, appointments, biomarkers } from "./mockData";
import { useLang } from "../context/LanguageContext";

const copy = {
  en: {
    greeting: "Welcome back",
    sub: "Here is how your restoration is unfolding.",
    nextVisit: "Your Next Visit",
    noVisit: "Nothing planned yet — whenever you feel ready.",
    bookNow: "Plan a visit",
    feeling: "How You Are Feeling",
    vs: "since you began",
    quickActions: "Continue Your Journey",
    actions: [
      { label: "Plan a Visit", href: "/portal/appointments" },
      { label: "My Documents", href: "/portal/documents" },
    ],
    membership: "Your Membership",
    memberSince: "With us since",
    nextBilling: "Renews",
    active: "Active",
  },
  ro: {
    greeting: "Bun venit înapoi",
    sub: "Iată cum se desfășoară restaurarea ta.",
    nextVisit: "Următoarea Ta Vizită",
    noVisit: "Nimic planificat încă — când te simți pregătit/ă.",
    bookNow: "Planifică o vizită",
    feeling: "Cum Te Simți",
    vs: "de când ai început",
    quickActions: "Continuă Călătoria",
    actions: [
      { label: "Planifică o Vizită", href: "/portal/appointments" },
      { label: "Documentele Mele", href: "/portal/documents" },
    ],
    membership: "Abonamentul Tău",
    memberSince: "Cu noi din",
    nextBilling: "Se reînnoiește",
    active: "Activ",
  },
};

const wellbeingLabels: Record<string, { en: string; ro: string }> = {
  "Biological Age":    { en: "Biological Age",    ro: "Vârstă Biologică" },
  "HRV Score":         { en: "Heart Rhythm",       ro: "Ritm Cardiac" },
  "VO₂ Max":           { en: "Breath Capacity",    ro: "Capacitate Respiratorie" },
  "Visceral Fat":      { en: "Inner Balance",      ro: "Echilibru Interior" },
  "Cortisol (AM)":        { en: "Morning Calm",   ro: "Calm Matinal" },
  "Testosterone (Free)":  { en: "Vitality",       ro: "Vitalitate" },
};

export function Dashboard() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const tx = copy[lang];
  const upcoming = appointments.filter((a) => a.status === "upcoming");
  const next = upcoming[0];

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8">
        <p className="text-[#CF1028]/80 text-xs tracking-[0.25em] uppercase mb-1 font-light">{tx.greeting},</p>
        <h1 className="font-['Cormorant_Garamond'] text-[#1A1210] font-light text-3xl sm:text-4xl italic">
          {patient.firstName}.
        </h1>
        <p className="text-[#8A7A6A] text-sm mt-1 font-light">{tx.sub}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-7">
        {/* Next visit */}
        <div className="bg-[#1E190D] rounded-3xl p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-5">
            <CalendarDays className="h-4 w-4 text-[#CF1028]/60" />
            <p className="text-white/35 text-xs uppercase tracking-[0.2em] font-light">{tx.nextVisit}</p>
          </div>
          {next ? (
            <>
              <p className="text-white/90 font-['Cormorant_Garamond'] text-xl sm:text-2xl italic mb-2">{next.title}</p>
              <p className="text-white/45 text-sm font-light mb-1">
                {new Date(next.date).toLocaleDateString(lang === "ro" ? "ro-RO" : "en-CA", {
                  weekday: "long", month: "long", day: "numeric",
                })} · {next.time}
              </p>
              <p className="text-white/30 text-xs font-light">{next.clinician}</p>
              {next.notes && (
                <div className="mt-4 bg-white/5 rounded-2xl px-3.5 py-3 border-l-2 border-[#CF1028]/30">
                  <p className="text-white/40 text-xs font-light leading-relaxed italic">{next.notes}</p>
                </div>
              )}
            </>
          ) : (
            <div>
              <p className="text-white/35 text-sm mb-4 font-light italic">{tx.noVisit}</p>
              <button onClick={() => navigate("/portal/appointments")}
                className="text-[#CF1028]/80 text-xs flex items-center gap-1.5 hover:gap-2.5 transition-all hover:text-[#CF1028]">
                {tx.bookNow} <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Membership */}
        <div className="bg-[#F0E4D4] rounded-3xl border border-[#1A1210]/10 p-5 sm:p-6">
          <p className="text-[#8A7A6A] text-xs uppercase tracking-[0.2em] mb-4 font-light">{tx.membership}</p>
          <p className="font-['Cormorant_Garamond'] text-[#1A1210] text-xl sm:text-2xl italic mb-4">{patient.membership}</p>
          <div className="space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-[#8A7A6A] font-light">{tx.memberSince}</span>
              <span className="text-[#1A1210]">{patient.memberSince}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#8A7A6A] font-light">{tx.nextBilling}</span>
              <span className="text-[#1A1210]">{patient.nextBilling}</span>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-[#1A1210]/10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-[#8A7A6A] text-xs">{tx.active}</p>
          </div>
        </div>
      </div>

      {/* Wellbeing snapshot */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="h-3.5 w-3.5 text-[#CF1028]/50" />
          <p className="text-[#8A7A6A] text-xs uppercase tracking-[0.2em] font-light">{tx.feeling}</p>
        </div>
        <div className="bg-[#F6F0E6] rounded-3xl border border-[#1A1408]/5 divide-y divide-[#1A1408]/5">
          {biomarkers.slice(0, 4).map((b) => (
            <div key={b.label} className="flex items-center justify-between px-5 py-3.5">
              <span className="text-[#6E5F4A] text-xs font-light tracking-wide">
                {lang === "ro" ? b.labelRo : b.label}
              </span>
              <span className="font-['Cormorant_Garamond'] text-[#1A1408] text-lg italic">
                {lang === "ro" ? b.descriptorRo : b.descriptor}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <p className="text-[#1A1210] text-sm font-light mb-3">{tx.quickActions}</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          {tx.actions.map((action) => (
            <button key={action.label} onClick={() => navigate(action.href)}
              className="flex items-center justify-between sm:justify-start gap-2 bg-[#F0E4D4] border border-[#1A1210]/10/60 rounded-2xl px-4 py-3 text-sm text-[#1A1210] hover:border-[#CF1028]/60 hover:text-[#CF1028] transition-colors">
              {action.label}
              <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
