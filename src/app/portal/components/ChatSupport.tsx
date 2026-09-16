import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, RotateCcw } from "lucide-react";
import { useLang } from "../../context/LanguageContext";
import { CHAT_SYSTEM_PROMPT, CHAT_WELCOME_MESSAGE, CHAT_PLACEHOLDER, CHAT_TITLE } from "../chatConfig";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;

async function streamChatResponse(
  messages: Message[],
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (err: string) => void,
) {
  if (!API_KEY) {
    onError("No API key configured. Add VITE_ANTHROPIC_API_KEY to your .env file.");
    return;
  }
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        system: CHAT_SYSTEM_PROMPT,
        stream: true,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      onError((body as { error?: { message?: string } }).error?.message ?? `Error ${res.status}`);
      return;
    }
    const reader = res.body?.getReader();
    if (!reader) { onError("No response stream"); return; }
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") continue;
        try {
          const parsed = JSON.parse(data) as { type: string; delta?: { type: string; text?: string } };
          if (parsed.type === "content_block_delta" && parsed.delta?.type === "text_delta") {
            onChunk(parsed.delta.text ?? "");
          }
        } catch { /* ignore */ }
      }
    }
    onDone();
  } catch (err) {
    onError(err instanceof Error ? err.message : "Connection error");
  }
}

const styles = `
  @keyframes cv-rise {
    from { opacity: 0; transform: translateY(16px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1); }
  }
  @keyframes cv-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes cv-pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(207,16,40,0.45); }
    70%  { box-shadow: 0 0 0 10px rgba(207,16,40,0); }
    100% { box-shadow: 0 0 0 0 rgba(207,16,40,0); }
  }
  @keyframes cv-dot {
    0%, 80%, 100% { opacity: 0.25; transform: scale(0.7); }
    40%           { opacity: 1;    transform: scale(1); }
  }
  .cv-panel { animation: cv-rise 0.28s cubic-bezier(0.22,1,0.36,1) both; }
  .cv-spin  { animation: cv-spin 1s linear infinite; }
  .cv-pulse { animation: cv-pulse-ring 2.4s ease-out infinite; }
  .cv-dot-1 { animation: cv-dot 1.2s ease-in-out 0s   infinite; }
  .cv-dot-2 { animation: cv-dot 1.2s ease-in-out 0.2s infinite; }
  .cv-dot-3 { animation: cv-dot 1.2s ease-in-out 0.4s infinite; }
  .cv-scroll::-webkit-scrollbar { width: 3px; }
  .cv-scroll::-webkit-scrollbar-track { background: transparent; }
  .cv-scroll::-webkit-scrollbar-thumb { background: rgba(207,16,40,0.2); border-radius: 99px; }
`;

export function ChatSupport() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef(false);

  const welcome = CHAT_WELCOME_MESSAGE[lang];
  const placeholder = CHAT_PLACEHOLDER[lang];
  const title = CHAT_TITLE[lang];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, streaming]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 150); }, [open]);

  function handleOpen() {
    setOpen(true);
    if (messages.length === 0) setMessages([{ role: "assistant", content: welcome }]);
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");
    setError(null);
    abortRef.current = false;
    const userMsg: Message = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages([...history, { role: "assistant", content: "" }]);
    setStreaming(true);
    streamChatResponse(
      history,
      (chunk) => {
        if (abortRef.current) return;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: updated[updated.length - 1].content + chunk };
          return updated;
        });
      },
      () => setStreaming(false),
      (err) => { setStreaming(false); setError(err); setMessages((prev) => prev.slice(0, -1)); },
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  function handleClose() { abortRef.current = true; setStreaming(false); setOpen(false); }
  function handleReset() { abortRef.current = true; setStreaming(false); setMessages([{ role: "assistant", content: welcome }]); setError(null); }

  return (
    <>
      <style>{styles}</style>

      {/* Trigger button */}
      {!open && (
        <button
          onClick={handleOpen}
          aria-label="Open concierge"
          className="cv-pulse"
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            zIndex: 9999,
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            background: "linear-gradient(145deg, #000000 0%, #1A1A1A 100%)",
            border: "1px solid rgba(207,16,40,0.45)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1px",
          }}
        >
          {/* Monogram "CV" mark */}
          <span style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontSize: "13px",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#CF1028",
            letterSpacing: "0.03em",
            lineHeight: 1,
            userSelect: "none",
          }}>CV</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="cv-panel"
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            zIndex: 9999,
            width: "380px",
            maxWidth: "calc(100vw - 2.5rem)",
            height: "clamp(440px, 72vh, 620px)",
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(207,16,40,0.18)",
            background: "#F0E8DA",
          }}
        >
          {/* Header */}
          <div style={{
            background: "#F0E8DA",
            padding: "20px 22px 18px",
            borderBottom: "1px solid rgba(207,16,40,0.12)",
            flexShrink: 0,
            position: "relative",
          }}>
            {/* Gold rule accent */}
            <div style={{
              position: "absolute",
              top: 0, left: "22px", right: "22px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(207,16,40,0.6), transparent)",
            }} />
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                  fontSize: "22px",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#1A1210",
                  margin: 0,
                  lineHeight: 1.2,
                  letterSpacing: "0.01em",
                }}>
                  {title}
                </p>
                <p style={{
                  fontSize: "9px",
                  fontWeight: 400,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(207,16,40,0.55)",
                  margin: "5px 0 0",
                }}>
                  Chez Vitalie · Personal Concierge
                </p>
              </div>
              <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                <button
                  onClick={handleReset}
                  title="New conversation"
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(245,239,228,0.2)",
                    cursor: "pointer",
                    padding: "6px",
                    display: "flex",
                    borderRadius: "8px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(207,16,40,0.7)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,239,228,0.2)")}
                >
                  <RotateCcw style={{ width: 13, height: 13 }} />
                </button>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(245,239,228,0.2)",
                    cursor: "pointer",
                    padding: "6px",
                    display: "flex",
                    borderRadius: "8px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,239,228,0.6)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,239,228,0.2)")}
                >
                  <X style={{ width: 15, height: 15 }} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            className="cv-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              background: "#0A0A0A",
              padding: "24px 18px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                {msg.role === "assistant" && (
                  <div style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "#F0E8DA",
                    border: "1px solid rgba(207,16,40,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginRight: "8px",
                    marginTop: "4px",
                  }}>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "8px",
                      fontStyle: "italic",
                      color: "#CF1028",
                      lineHeight: 1,
                    }}>CV</span>
                  </div>
                )}
                <div style={{
                  maxWidth: "78%",
                  padding: msg.role === "user" ? "10px 15px" : "11px 15px",
                  fontSize: "13.5px",
                  lineHeight: "1.65",
                  fontWeight: 300,
                  borderRadius: msg.role === "user" ? "18px 18px 6px 18px" : "6px 18px 18px 18px",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #0C0608, #0C0608)"
                    : "#FFFDF9",
                  color: msg.role === "user" ? "rgba(245,239,228,0.9)" : "rgba(28,26,20,0.82)",
                  border: msg.role === "assistant" ? "1px solid rgba(28,26,20,0.07)" : "none",
                  boxShadow: msg.role === "user"
                    ? "0 2px 12px rgba(0,0,0,0.18)"
                    : "0 1px 6px rgba(0,0,0,0.06)",
                  letterSpacing: "0.01em",
                }}>
                  {msg.content || (streaming && i === messages.length - 1 ? (
                    <span style={{ display: "flex", gap: "5px", alignItems: "center", padding: "2px 0" }}>
                      <span className="cv-dot-1" style={{ width: 5, height: 5, borderRadius: "50%", background: "#CF1028", display: "inline-block" }} />
                      <span className="cv-dot-2" style={{ width: 5, height: 5, borderRadius: "50%", background: "#CF1028", display: "inline-block" }} />
                      <span className="cv-dot-3" style={{ width: 5, height: 5, borderRadius: "50%", background: "#CF1028", display: "inline-block" }} />
                    </span>
                  ) : null)}
                </div>
              </div>
            ))}

            {error && (
              <div style={{ textAlign: "center" }}>
                <span style={{
                  fontSize: "11.5px",
                  color: "rgba(180,50,50,0.75)",
                  background: "rgba(180,50,50,0.06)",
                  border: "1px solid rgba(180,50,50,0.12)",
                  borderRadius: "20px",
                  padding: "6px 12px",
                  display: "inline-block",
                }}>{error}</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div style={{
            background: "#F0E8DA",
            borderTop: "1px solid rgba(207,16,40,0.1)",
            padding: "14px 18px 16px",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={streaming}
                rows={1}
                style={{
                  flex: 1,
                  background: "rgba(245,239,228,0.05)",
                  border: "1px solid rgba(207,16,40,0.18)",
                  borderRadius: "14px",
                  padding: "10px 14px",
                  fontSize: "13px",
                  color: "rgba(245,239,228,0.82)",
                  resize: "none",
                  outline: "none",
                  fontWeight: 300,
                  lineHeight: "1.5",
                  minHeight: "40px",
                  maxHeight: "110px",
                  fontFamily: "inherit",
                  opacity: streaming ? 0.5 : 1,
                  letterSpacing: "0.01em",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(207,16,40,0.45)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(207,16,40,0.18)")}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || streaming}
                style={{
                  flexShrink: 0,
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: input.trim() && !streaming
                    ? "linear-gradient(135deg, #CF1028, #77080E)"
                    : "rgba(207,16,40,0.1)",
                  border: "1px solid rgba(207,16,40,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: !input.trim() || streaming ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
              >
                {streaming
                  ? <Loader2 className="cv-spin" style={{ width: 15, height: 15, color: "rgba(207,16,40,0.5)" }} />
                  : <Send style={{ width: 14, height: 14, color: input.trim() ? "#1A1210" : "rgba(207,16,40,0.35)" }} />
                }
              </button>
            </div>
            <p style={{
              color: "rgba(207,16,40,0.22)",
              fontSize: "9px",
              textAlign: "center",
              marginTop: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 300,
            }}>
              {lang === "en" ? "Shift ↵ for new line" : "Shift ↵ linie nouă"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
