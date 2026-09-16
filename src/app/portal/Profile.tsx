import { useState } from "react";
import { Button } from "../components/ui/button";
import { patient } from "./mockData";
import { useLang } from "../context/LanguageContext";

const copy = {
  en: {
    eyebrow: "Your Space",
    title: "My Profile",
    personal: "About You",
    membership: "My Membership",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    dob: "Date of Birth",
    save: "Save Changes",
    saved: "Saved",
    status: "Status",
    active: "Active",
    type: "Plan",
    since: "With us since",
    nextBilling: "Renews",
    manageBtn: "Manage Membership",
    notifications: "Stay in Touch",
    emailNotif: "Visit reminders by email",
    smsNotif: "SMS reminders",
    resultsNotif: "New documents available",
  },
  ro: {
    eyebrow: "Spațiul Tău",
    title: "Profilul Meu",
    personal: "Despre Tine",
    membership: "Abonamentul Meu",
    firstName: "Prenume",
    lastName: "Nume",
    email: "Email",
    phone: "Telefon",
    dob: "Data Nașterii",
    save: "Salvează",
    saved: "Salvat",
    status: "Status",
    active: "Activ",
    type: "Plan",
    since: "Cu noi din",
    nextBilling: "Se reînnoiește",
    manageBtn: "Gestionează Abonamentul",
    notifications: "Rămâi în Contact",
    emailNotif: "Remindere vizite pe email",
    smsNotif: "Remindere SMS",
    resultsNotif: "Documente noi disponibile",
  },
};

export function Profile() {
  const { lang } = useLang();
  const tx = copy[lang];
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, sms: false, results: true });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-7">
        <p className="text-[#CF1028] text-xs tracking-[0.25em] uppercase mb-1">{tx.eyebrow}</p>
        <h1 className="font-['Cormorant_Garamond'] text-[#1A1210] font-light text-2xl sm:text-3xl">{tx.title}</h1>
      </div>

      {/* Personal details */}
      <div className="bg-[#F0E4D4] rounded-3xl border border-[#1A1210]/10 p-5 sm:p-6 mb-4">
        <p className="text-[#1A1210] text-sm font-medium mb-5">{tx.personal}</p>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#8A7A6A] text-xs uppercase tracking-wide block mb-1.5">{tx.firstName}</label>
              <input defaultValue="Alexandra"
                className="w-full border border-[#1A1210]/10 rounded-2xl text-[#1A1210] text-sm px-4 py-3 focus:outline-none focus:border-[#CF1028]/50 bg-[#F0E4D4] min-h-[44px]" />
            </div>
            <div>
              <label className="text-[#8A7A6A] text-xs uppercase tracking-wide block mb-1.5">{tx.lastName}</label>
              <input defaultValue="Ionescu"
                className="w-full border border-[#1A1210]/10 rounded-2xl text-[#1A1210] text-sm px-4 py-3 focus:outline-none focus:border-[#CF1028]/50 bg-[#F0E4D4] min-h-[44px]" />
            </div>
          </div>
          <div>
            <label className="text-[#8A7A6A] text-xs uppercase tracking-wide block mb-1.5">{tx.email}</label>
            <input defaultValue={patient.email} type="email"
              className="w-full border border-[#1A1210]/10 rounded-2xl text-[#1A1210] text-sm px-4 py-3 focus:outline-none focus:border-[#CF1028]/50 bg-[#F0E4D4] min-h-[44px]" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#8A7A6A] text-xs uppercase tracking-wide block mb-1.5">{tx.phone}</label>
              <input defaultValue={patient.phone} type="tel"
                className="w-full border border-[#1A1210]/10 rounded-2xl text-[#1A1210] text-sm px-4 py-3 focus:outline-none focus:border-[#CF1028]/50 bg-[#F0E4D4] min-h-[44px]" />
            </div>
            <div>
              <label className="text-[#8A7A6A] text-xs uppercase tracking-wide block mb-1.5">{tx.dob}</label>
              <input defaultValue={patient.dob} type="date"
                className="w-full border border-[#1A1210]/10 rounded-2xl text-[#1A1210] text-sm px-4 py-3 focus:outline-none focus:border-[#CF1028]/50 bg-[#F0E4D4] min-h-[44px]" />
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <Button type="submit"
              className={`text-sm transition-all rounded-full ${saved ? "bg-emerald-600 hover:bg-emerald-600" : "bg-[#1A1210] hover:bg-black"} text-white min-h-[44px]`}>
              {saved ? tx.saved : tx.save}
            </Button>
          </div>
        </form>
      </div>

      {/* Membership */}
      <div className="bg-[#F0E4D4] rounded-3xl border border-[#1A1210]/10 p-5 sm:p-6 mb-4">
        <p className="text-[#1A1210] text-sm font-medium mb-5">{tx.membership}</p>
        <div className="space-y-3 mb-5">
          {[
            [tx.status, <span key="s" className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{tx.active}</span>],
            [tx.type, patient.membership],
            [tx.since, patient.memberSince],
            [tx.nextBilling, patient.nextBilling],
          ].map(([label, value], i) => (
            <div key={i} className="flex justify-between text-sm border-b border-[#1A1210]/10 pb-3 last:border-0 last:pb-0">
              <span className="text-[#8A7A6A] font-light">{label}</span>
              <span className="text-[#1A1210]">{value}</span>
            </div>
          ))}
        </div>
        <Button variant="outline"
          className="text-sm border-[#1A1210]/10 text-[#1A1210] hover:border-[#CF1028]/40 hover:text-[#CF1028] rounded-full min-h-[44px]">
          {tx.manageBtn}
        </Button>
      </div>

      {/* Notifications */}
      <div className="bg-[#F0E4D4] rounded-3xl border border-[#1A1210]/10 p-5 sm:p-6">
        <p className="text-[#1A1210] text-sm font-medium mb-5">{tx.notifications}</p>
        <div className="space-y-5">
          {(["email", "sms", "results"] as const).map((key) => {
            const labels = { email: tx.emailNotif, sms: tx.smsNotif, results: tx.resultsNotif };
            return (
              <label key={key} className="flex items-center justify-between gap-4 cursor-pointer">
                <span className="text-[#8A7A6A] text-sm font-light">{labels[key]}</span>
                <button type="button" role="switch" aria-checked={notifications[key]}
                  onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key] }))}
                  className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${notifications[key] ? "bg-[#CF1028]" : "bg-[#1A1210]/15"}`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${notifications[key] ? "translate-x-7" : "translate-x-1"}`} />
                </button>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
