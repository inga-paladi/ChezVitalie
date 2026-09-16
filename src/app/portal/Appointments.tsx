import { useState } from "react";
import { CalendarDays, Clock, User, CheckCircle, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { appointments as allAppts, availableSlots, services } from "./mockData";
import { useLang } from "../context/LanguageContext";

const copy = {
  en: {
    eyebrow: "Your Retreat",
    title: "My Visits",
    upcoming: "Coming Up",
    past: "Past Visits",
    book: "Plan a Visit",
    noUpcoming: "Nothing planned yet — whenever you feel ready.",
    duration: "min",
    completed: "Completed",
    confirmed: "Confirmed",
    cancel: "Cancel",
    bookTitle: "Plan Your Next Visit",
    selectService: "What calls to you?",
    available: "Choose a moment",
    notes: "Anything you'd like us to know?",
    notesPlaceholder: "How have you been feeling? Any intentions for this visit?",
    submit: "Reserve My Visit",
    successTitle: "Your visit is reserved.",
    successBody: "We look forward to welcoming you. A confirmation will find its way to your inbox.",
    close: "Close",
  },
  ro: {
    eyebrow: "Retreatul Tău",
    title: "Vizitele Mele",
    upcoming: "Urmează",
    past: "Vizite Trecute",
    book: "Planifică o Vizită",
    noUpcoming: "Nimic planificat — când te simți pregătit/ă.",
    duration: "min",
    completed: "Finalizat",
    confirmed: "Confirmat",
    cancel: "Anulează",
    bookTitle: "Planifică Următoarea Vizită",
    selectService: "Ce te cheamă?",
    available: "Alege un moment",
    notes: "Ceva ce ai vrea să știm?",
    notesPlaceholder: "Cum te-ai simțit? Intenții pentru această vizită?",
    submit: "Rezervă Vizita",
    successTitle: "Vizita ta este rezervată.",
    successBody: "Așteptăm cu drag să te primim. O confirmare îți va ajunge în curând.",
    close: "Închide",
  },
};

const serviceLabels: Record<string, { en: string; ro: string }> = {
  "Vitality Reading":  { en: "Vitality Reading",  ro: "Lectură de Vitalitate" },
  "Light Immersion":   { en: "Light Immersion",   ro: "Imersie în Lumină" },
  "Oxygen Sanctuary":  { en: "Oxygen Sanctuary",  ro: "Sanctuarul Oxigenului" },
  "Body Harmony":      { en: "Body Harmony",      ro: "Armonia Corpului" },
  "Mind & Clarity":    { en: "Mind & Clarity",    ro: "Minte & Claritate" },
  "Deep Recovery":     { en: "Deep Recovery",     ro: "Recuperare Profundă" },
};

export function Appointments() {
  const { lang } = useLang();
  const tx = copy[lang];
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState("");

  const upcoming = allAppts.filter((a) => a.status === "upcoming");
  const past = allAppts.filter((a) => a.status === "completed");
  const list = tab === "upcoming" ? upcoming : past;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => { setSubmitted(false); setSelectedSlot(null); setSelectedService(""); }, 300);
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="flex items-end justify-between mb-7 gap-4">
        <div>
          <p className="text-[#CF1028] text-xs tracking-[0.25em] uppercase mb-1">{tx.eyebrow}</p>
          <h1 className="font-['Cormorant_Garamond'] text-[#1A1210] font-light text-2xl sm:text-3xl">{tx.title}</h1>
        </div>
        <Button onClick={() => setShowModal(true)}
          className="bg-[#CF1028] hover:bg-[#A30E28] text-white text-sm rounded-full flex-shrink-0">
          {tx.book}
        </Button>
      </div>

      <div className="flex border-b border-[#1A1210]/10 mb-5">
        {(["upcoming", "past"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 sm:px-5 py-2.5 text-sm transition-colors border-b-2 -mb-px ${
              tab === t
                ? "border-[#CF1028] text-[#1A1210] font-medium"
                : "border-transparent text-[#8A7A6A] hover:text-[#1A1210]"
            }`}>
            {t === "upcoming" ? tx.upcoming : tx.past}
            <span className="ml-1.5 text-xs bg-[#1A1210]/8 px-1.5 py-0.5 rounded-full">
              {t === "upcoming" ? upcoming.length : past.length}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.length === 0 && (
          <p className="text-[#8A7A6A] text-sm py-6 font-light italic">{tx.noUpcoming}</p>
        )}
        {list.map((appt) => (
          <div key={appt.id} className="bg-[#F0E4D4] rounded-3xl border border-[#1A1210]/10 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                    appt.status === "upcoming"
                      ? "bg-[#CF1028]/10 text-[#CF1028]"
                      : "bg-[#1A1210]/8 text-[#8A7A6A]"
                  }`}>
                    {appt.status === "upcoming" ? tx.confirmed : tx.completed}
                  </span>
                </div>
                <p className="font-['Cormorant_Garamond'] text-[#1A1210] text-lg font-medium mb-2">{appt.title}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#8A7A6A]">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 flex-shrink-0" />
                    {new Date(appt.date).toLocaleDateString(lang === "ro" ? "ro-RO" : "en-CA", {
                      weekday: "short", month: "long", day: "numeric", year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                    {appt.time} · {appt.duration} {tx.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 flex-shrink-0" />
                    {appt.clinician}
                  </span>
                </div>
                {appt.notes && (
                  <p className="text-[#8A7A6A] text-xs mt-3 border-l-2 border-[#CF1028]/25 pl-3 font-light italic">{appt.notes}</p>
                )}
              </div>
              {appt.status === "upcoming" && (
                <button className="text-xs text-[#8A7A6A] hover:text-[#CF1028] transition-colors flex-shrink-0 mt-1">
                  {tx.cancel}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-[#1E190D]/60 backdrop-blur-sm">
          <div className="bg-[#1A1210] w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-3xl">
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#1A1210]/10/60">
              <h2 className="font-['Cormorant_Garamond'] text-[#1A1210] text-xl">{tx.bookTitle}</h2>
              <button onClick={closeModal} className="text-[#8A7A6A] hover:text-[#1A1210] p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 sm:p-10 text-center">
                <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-4" />
                <h3 className="font-['Cormorant_Garamond'] text-[#1A1210] text-xl mb-2">{tx.successTitle}</h3>
                <p className="text-[#8A7A6A] text-sm mb-6 font-light">{tx.successBody}</p>
                <Button onClick={closeModal} className="bg-[#1A1210] hover:bg-black text-white rounded-full">{tx.close}</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
                <div>
                  <label className="text-[#8A7A6A] text-xs uppercase tracking-wide block mb-2">{tx.selectService}</label>
                  <select required value={selectedService} onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full border border-[#1A1210]/10 rounded-2xl text-[#1A1210] text-sm px-4 py-3 focus:outline-none focus:border-[#CF1028]/50 bg-[#F0E4D4] appearance-none">
                    <option value="">—</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{serviceLabels[s]?.[lang] ?? s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[#8A7A6A] text-xs uppercase tracking-wide block mb-2">{tx.available}</label>
                  <div className="space-y-2">
                    {availableSlots.map((slot, i) => (
                      <button type="button" key={i} onClick={() => setSelectedSlot(i)}
                        className={`w-full text-left px-4 py-3.5 border rounded-2xl transition-colors flex items-center justify-between ${
                          selectedSlot === i
                            ? "border-[#CF1028]/40 bg-[#CF1028]/5 text-[#CF1028]"
                            : "border-[#1A1408]/8 text-[#6E5F4A] hover:border-[#1A1408]/20 hover:text-[#1A1408]"
                        }`}>
                        <span className="font-['Cormorant_Garamond'] text-base italic">
                          {new Date(slot.date).toLocaleDateString(lang === "ro" ? "ro-RO" : "en-CA", { weekday: "short", month: "long", day: "numeric" })}
                        </span>
                        <span className="text-xs opacity-60">{slot.time} · {slot.clinician}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[#8A7A6A] text-xs uppercase tracking-wide block mb-2">{tx.notes}</label>
                  <textarea rows={3} placeholder={tx.notesPlaceholder}
                    className="w-full border border-[#1A1210]/10 rounded-2xl text-[#1A1210] text-sm px-4 py-3 focus:outline-none focus:border-[#CF1028]/50 resize-none placeholder-[#B7B7B7]/50 bg-[#F0E4D4]" />
                </div>
                <Button type="submit" disabled={!selectedService || selectedSlot === null}
                  className="w-full bg-[#CF1028] hover:bg-[#A30E28] text-white disabled:opacity-40 py-3 rounded-full">
                  {tx.submit}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
