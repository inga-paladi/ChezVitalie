import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { biomarkers, bioTrends } from "./mockData";
import { useLang } from "../context/LanguageContext";

const copy = {
  en: {
    eyebrow: "Your Restoration",
    title: "My Wellbeing",
    sub: "A quiet picture of how your body is responding — no numbers, just a sense of where you are.",
    snapshot: "Where You Are Now",
    journey: "How You Have Been Changing",
    note: "You are reading six years younger than your chronological age — and the distance is widening.",
    tabs: ["Biological Age", "Heart Rhythm", "Breath Capacity"],
  },
  ro: {
    eyebrow: "Restaurarea Ta",
    title: "Bunăstarea Mea",
    sub: "O imagine liniștită despre cum răspunde corpul tău — fără cifre, doar o senzație a locului în care ești.",
    snapshot: "Unde Ești Acum",
    journey: "Cum Te-ai Schimbat",
    note: "Citești cu șase ani mai tânăr decât vârsta ta cronologică — iar distanța continuă să crească.",
    tabs: ["Vârstă Biologică", "Ritm Cardiac", "Capacitate Respiratorie"],
  },
};

const trendData = [bioTrends.biologicalAge, bioTrends.hrv, bioTrends.vo2max];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#1E190D] px-3 py-2 text-xs rounded-xl shadow-lg">
        <p className="text-white/40 mb-0.5">{label}</p>
        <p className="text-white font-light">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export function HealthData() {
  const { lang } = useLang();
  const tx = copy[lang];
  const [activeChart, setActiveChart] = useState(0);

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8">
        <p className="text-[#C41230]/70 text-xs tracking-[0.3em] uppercase mb-2 font-light">{tx.eyebrow}</p>
        <h1 className="font-['Cormorant_Garamond'] text-[#231C0D] font-light text-3xl sm:text-4xl italic mb-2">{tx.title}</h1>
        <p className="text-[#7A6B56] text-sm font-light leading-relaxed max-w-md">{tx.sub}</p>
      </div>

      {/* Wellbeing markers — typographic only */}
      <div className="mb-8">
        <p className="text-[#6E5F4A] text-xs uppercase tracking-[0.25em] font-light mb-5">{tx.snapshot}</p>
        <div className="bg-[#F6F0E6] rounded-2xl border border-[#1A1408]/5 divide-y divide-[#1A1408]/5">
          {biomarkers.map((b) => (
            <div key={b.label} className="flex items-center justify-between px-6 py-4">
              <span className="text-[#6E5F4A] text-sm font-light">
                {lang === "ro" ? b.labelRo : b.label}
              </span>
              <span className="font-['Cormorant_Garamond'] text-[#1A1408] text-xl italic">
                {lang === "ro" ? b.descriptorRo : b.descriptor}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trend chart */}
      <div>
        <p className="text-[#7A6B56] text-xs uppercase tracking-[0.2em] font-light mb-5">{tx.journey}</p>
        <div className="bg-[#FAF6EF] rounded-2xl border border-[#231C0D]/6 overflow-hidden">
          <div className="flex border-b border-[#231C0D]/6 overflow-x-auto">
            {tx.tabs.map((label, i) => (
              <button key={i} onClick={() => setActiveChart(i)}
                className={`px-5 py-3.5 text-xs whitespace-nowrap transition-colors border-b-2 -mb-px font-light ${
                  activeChart === i
                    ? "border-[#C41230] text-[#231C0D]"
                    : "border-transparent text-[#7A6B56] hover:text-[#231C0D]"
                }`}>
                {label}
              </button>
            ))}
          </div>
          <div className="p-5 sm:p-7">
            {activeChart === 0 && (
              <p className="text-[#7A6B56] text-xs mb-5 font-light italic leading-relaxed">{tx.note}</p>
            )}
            <ResponsiveContainer key={activeChart} width="100%" height={200}>
              <LineChart data={trendData[activeChart]} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#7A6B56" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#7A6B56" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#C41230" strokeWidth={1.5}
                  dot={false} activeDot={{ r: 4, fill: "#C41230", strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
