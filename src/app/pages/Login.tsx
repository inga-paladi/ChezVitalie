import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import logo from "@/imports/3.svg";

const copy = {
  en: {
    eyebrow: "Member Portal",
    title: "Welcome back",
    subtitle: "Your sanctuary awaits.",
    email: "Email address",
    password: "Password",
    forgot: "Forgot password?",
    submit: "Enter your sanctuary",
    back: "Return to site",
    hint: "Demo: use any credentials",
  },
  ro: {
    eyebrow: "Portalul Membrilor",
    title: "Bun venit înapoi",
    subtitle: "Sanctuarul tău te așteaptă.",
    email: "Adresă de email",
    password: "Parolă",
    forgot: "Ai uitat parola?",
    submit: "Intră în sanctuar",
    back: "Înapoi la site",
    hint: "Demo: orice date",
  },
};

export function Login() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const tx = copy[lang];
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/portal"), 800);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      background: "#1A1210",
    }}>

      {/* Left — full-bleed image panel */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        display: "block",
      }}
        className="hidden md:block"
      >
        <img
          src="https://images.unsplash.com/photo-1763259406098-7d17c47b80ea?w=900&h=1200&fit=crop&auto=format"
          alt="Serene wellness retreat"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            filter: "brightness(0.72) saturate(0.85)",
          }}
        />
        {/* Dark gradient overlay bottom */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(12,11,9,0.75) 0%, transparent 55%)",
        }} />
        {/* Top subtle overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(12,11,9,0.35) 0%, transparent 30%)",
        }} />

        {/* Quote overlay */}
        <div style={{
          position: "absolute",
          bottom: "48px",
          left: "44px",
          right: "44px",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontSize: "22px",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(245,239,228,0.88)",
            lineHeight: 1.55,
            letterSpacing: "0.01em",
            margin: 0,
          }}>
            "Vitality is not a destination —<br />it is the way you inhabit every moment."
          </p>
          <div style={{
            width: "36px",
            height: "1px",
            background: "rgba(207,16,40,0.55)",
            marginTop: "16px",
          }} />
        </div>
      </div>

      {/* Right — login form */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "48px 40px",
        background: "#1A1210",
        position: "relative",
      }}>

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            top: "28px",
            left: "32px",
            background: "none",
            border: "none",
            color: "rgba(245,239,228,0.28)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 300,
            padding: "6px 4px",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(207,16,40,0.75)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,239,228,0.28)")}
        >
          <ChevronLeft style={{ width: 14, height: 14 }} />
          {tx.back}
        </button>

        <div style={{ width: "100%", maxWidth: "360px" }}>

          {/* Logo + wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "44px" }}>
            <img
              src={logo}
              alt="Chez Vitalie"
              style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(207,16,40,0.3)" }}
            />
            <span style={{
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              fontSize: "19px",
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(245,239,228,0.85)",
              letterSpacing: "0.02em",
            }}>
              Chez Vitalie
            </span>
          </div>

          {/* Eyebrow */}
          <p style={{
            fontSize: "9px",
            fontWeight: 400,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(207,16,40,0.6)",
            margin: "0 0 14px",
          }}>
            {tx.eyebrow}
          </p>

          {/* Heading */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontSize: "38px",
            fontWeight: 300,
            color: "#1A1210",
            margin: "0 0 6px",
            lineHeight: 1.15,
            letterSpacing: "0.01em",
          }}>
            {tx.title}
          </h1>
          <p style={{
            fontSize: "14px",
            fontWeight: 300,
            color: "rgba(245,239,228,0.38)",
            margin: "0 0 40px",
            letterSpacing: "0.02em",
          }}>
            {tx.subtitle}
          </p>

          {/* Gold hairline rule */}
          <div style={{
            width: "100%",
            height: "1px",
            background: "linear-gradient(90deg, rgba(207,16,40,0.35), transparent)",
            marginBottom: "36px",
          }} />

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Email field */}
            <div>
              <label style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: focusedField === "email" ? "rgba(207,16,40,0.7)" : "rgba(245,239,228,0.32)",
                marginBottom: "8px",
                transition: "color 0.2s",
                fontWeight: 400,
              }}>
                {tx.email}
              </label>
              <input
                required
                type="email"
                defaultValue="alexandra.ionescu@email.com"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={{
                  width: "100%",
                  background: "rgba(245,239,228,0.04)",
                  border: `1px solid ${focusedField === "email" ? "rgba(207,16,40,0.45)" : "rgba(245,239,228,0.1)"}`,
                  borderRadius: "14px",
                  padding: "13px 18px",
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "rgba(245,239,228,0.82)",
                  outline: "none",
                  transition: "border-color 0.2s, background 0.2s",
                  letterSpacing: "0.01em",
                  boxSizing: "border-box",
                  minHeight: "50px",
                }}
              />
            </div>

            {/* Password field */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: focusedField === "password" ? "rgba(207,16,40,0.7)" : "rgba(245,239,228,0.32)",
                  transition: "color 0.2s",
                  fontWeight: 400,
                }}>
                  {tx.password}
                </label>
                <button
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "10px",
                    color: "rgba(245,239,228,0.22)",
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(207,16,40,0.6)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,239,228,0.22)")}
                >
                  {tx.forgot}
                </button>
              </div>
              <input
                required
                type="password"
                defaultValue="password"
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                style={{
                  width: "100%",
                  background: "rgba(245,239,228,0.04)",
                  border: `1px solid ${focusedField === "password" ? "rgba(207,16,40,0.45)" : "rgba(245,239,228,0.1)"}`,
                  borderRadius: "14px",
                  padding: "13px 18px",
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "rgba(245,239,228,0.82)",
                  outline: "none",
                  transition: "border-color 0.2s, background 0.2s",
                  letterSpacing: "0.12em",
                  boxSizing: "border-box",
                  minHeight: "50px",
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "8px",
                background: loading
                  ? "rgba(207,16,40,0.15)"
                  : "linear-gradient(135deg, #CF1028 0%, #77080E 100%)",
                border: "1px solid rgba(207,16,40,0.3)",
                borderRadius: "14px",
                padding: "15px 24px",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: loading ? "rgba(248,246,244,0.35)" : "#F7F2EB",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                minHeight: "52px",
                transition: "all 0.25s",
              }}
              onMouseEnter={e => {
                if (!loading) e.currentTarget.style.background = "linear-gradient(135deg, #CF1028 0%, #77080E 100%)";
              }}
              onMouseLeave={e => {
                if (!loading) e.currentTarget.style.background = "linear-gradient(135deg, #CF1028 0%, #77080E 100%)";
              }}
            >
              {loading ? (
                <span style={{ opacity: 0.6, letterSpacing: "0.35em" }}>···</span>
              ) : (
                <>
                  {tx.submit}
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </>
              )}
            </button>
          </form>

          <p style={{
            textAlign: "center",
            fontSize: "10px",
            color: "rgba(245,239,228,0.18)",
            marginTop: "28px",
            letterSpacing: "0.08em",
          }}>
            {tx.hint}
          </p>
        </div>
      </div>
    </div>
  );
}
