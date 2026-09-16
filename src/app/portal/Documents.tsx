import { FileText, Download } from "lucide-react";
import { documents } from "./mockData";
import { useLang } from "../context/LanguageContext";

const copy = {
  en: {
    eyebrow: "Your Journey",
    title: "My Documents",
    sub: "Everything from your visits — readings, notes, and your personal path — kept in one quiet place.",
    download: "Save",
    typeColors: {
      "Lab Report": "text-amber-700 bg-amber-50",
      "Assessment": "text-emerald-700 bg-emerald-50",
      "Summary":    "text-sky-700 bg-sky-50",
      "Protocol":   "text-violet-700 bg-violet-50",
    } as Record<string, string>,
  },
  ro: {
    eyebrow: "Călătoria Ta",
    title: "Documentele Mele",
    sub: "Tot ce a rămas din vizitele tale — lecturi, note și calea ta personală — păstrat într-un loc liniștit.",
    download: "Salvează",
    typeColors: {
      "Lab Report": "text-amber-700 bg-amber-50",
      "Assessment": "text-emerald-700 bg-emerald-50",
      "Summary":    "text-sky-700 bg-sky-50",
      "Protocol":   "text-violet-700 bg-violet-50",
    } as Record<string, string>,
  },
};

const typeLabels: Record<string, { en: string; ro: string }> = {
  "Lab Report":  { en: "Reading",      ro: "Lectură" },
  "Assessment":  { en: "Observation",  ro: "Observație" },
  "Summary":     { en: "Conversation", ro: "Conversație" },
  "Protocol":    { en: "Your Path",    ro: "Calea Ta" },
};

export function Documents() {
  const { lang } = useLang();
  const tx = copy[lang];

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-7">
        <p className="text-[#CF1028] text-xs tracking-[0.25em] uppercase mb-1">{tx.eyebrow}</p>
        <h1 className="font-['Cormorant_Garamond'] text-[#1A1210] font-light text-2xl sm:text-3xl">{tx.title}</h1>
        <p className="text-[#8A7A6A] text-sm mt-1 font-light">{tx.sub}</p>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id}
            className="bg-[#F0E4D4] rounded-2xl border border-[#1A1210]/10 px-4 sm:px-5 py-4 flex items-center gap-3 sm:gap-4 hover:border-[#1A1210]/10 transition-colors">
            <div className="w-9 h-9 bg-[#F0E4D4] rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="h-4 w-4 text-[#8A7A6A]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#1A1210] text-sm font-medium truncate">{doc.title}</p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${tx.typeColors[doc.type] ?? "text-[#8A7A6A] bg-[#F0E4D4]"}`}>
                  {typeLabels[doc.type]?.[lang] ?? doc.type}
                </span>
                <span className="text-[#8A7A6A] text-xs font-light">
                  {new Date(doc.date).toLocaleDateString(lang === "ro" ? "ro-RO" : "en-CA", {
                    month: "short", day: "numeric", year: "numeric",
                  })}
                </span>
                <span className="text-[#8A7A6A] text-xs hidden sm:inline font-light">{doc.size}</span>
              </div>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-[#8A7A6A] hover:text-[#CF1028] transition-colors flex-shrink-0 p-1">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{tx.download}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
