import { useState } from "react";
import logo from "@/imports/ChezVitalieLogo.PNG";
import { NavLink, Outlet, useNavigate } from "react-router";
import { LayoutDashboard, CalendarDays, FileText, User, LogOut, Menu, X, Globe } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { patient } from "./mockData";
import { ChatSupport } from "./components/ChatSupport";

const navItems = {
  en: [
    { label: "My Sanctuary", href: "/portal", icon: LayoutDashboard, end: true },
    { label: "My Visits", href: "/portal/appointments", icon: CalendarDays, end: false },
    { label: "My Documents", href: "/portal/documents", icon: FileText, end: false },
    { label: "My Profile", href: "/portal/profile", icon: User, end: false },
  ],
  ro: [
    { label: "Sanctuarul Meu", href: "/portal", icon: LayoutDashboard, end: true },
    { label: "Vizitele Mele", href: "/portal/appointments", icon: CalendarDays, end: false },
    { label: "Documentele Mele", href: "/portal/documents", icon: FileText, end: false },
    { label: "Profilul Meu", href: "/portal/profile", icon: User, end: false },
  ],
};

export function PortalLayout() {
  const navigate = useNavigate();
  const { lang, setLang } = useLang();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const items = navItems[lang];

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-10">
        <a href="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Chez Vitalie" className="h-8 w-8 rounded-full object-cover flex-shrink-0" />
          <span className="font-['Cormorant_Garamond'] text-white/80 text-base font-light italic">
            Chez Vitalie
          </span>
        </a>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="text-white/40 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mb-8 px-4 py-4 bg-white/5 rounded-2xl border border-white/6">
        <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-1.5 font-light">
          {lang === "en" ? "Member" : "Membru"}
        </p>
        <p className="text-white/80 text-sm font-light">{patient.firstName}</p>
        <p className="text-[#CF1028]/70 text-xs mt-0.5 font-light">{patient.membership}</p>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map(({ label, href, icon: Icon, end }) => (
          <NavLink key={href} to={href} end={end} onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded-2xl ${
                isActive ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"
              }`
            }>
            <Icon className="h-4 w-4 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/6 pt-4 space-y-1 mt-4">
        <button onClick={() => setLang(lang === "en" ? "ro" : "en")}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/35 hover:text-white/70 transition-colors w-full rounded-2xl hover:bg-white/5 font-light">
          <Globe className="h-4 w-4" />
          {lang === "en" ? "Română" : "English"}
        </button>
        <button onClick={() => navigate("/")}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/35 hover:text-white/70 transition-colors w-full rounded-2xl hover:bg-white/5 font-light">
          <LogOut className="h-4 w-4" />
          {lang === "en" ? "Sign Out" : "Deconectare"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-[#120304] flex">
        <aside className="hidden md:flex flex-col w-56 bg-[#120304] flex-shrink-0 sticky top-0 h-screen">
          <Sidebar />
        </aside>

        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            <div className="w-64 bg-[#120304] h-full flex flex-col">
              <Sidebar mobile />
            </div>
            <div className="flex-1 bg-[#120304]/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0 bg-[#1E0508]">
          <div className="md:hidden flex items-center justify-between px-5 py-4 bg-[#120304]">
            <button onClick={() => setSidebarOpen(true)} className="text-white p-1">
              <Menu className="h-5 w-5" />
            </button>
            <span className="font-['Cormorant_Garamond'] text-white/80 text-base font-light italic">
              Chez Vitalie
            </span>
            <div className="w-7" />
          </div>
          <main className="flex-1 p-5 sm:p-7 lg:p-10">
            <Outlet />
          </main>
        </div>
      </div>
      <ChatSupport />
    </>
  );
}
