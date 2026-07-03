import { useState, useEffect, useRef } from "react";
import logo1 from "../assets/vietworldgate1.png"
const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "llama3"; // apna model naam yahan likho

export default function hat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // data.json load karo aur system prompt banao
  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then((items) => {
        // Array of {id, text} → ek badi knowledge string
        const knowledge = items
          .map((item) => `[${item.id}] ${item.text}`)
          .join("\n");

        const prompt = `You are a helpful assistant. Answer questions ONLY using the knowledge base below.
If the answer is not in the knowledge base, say: "I don't have information about that. Please contact our team directly. "
Do not use any outside knowledge. Be concise and helpful.

=== KNOWLEDGE BASE ===
${knowledge}
=== END ===`; 

        setSystemPrompt(prompt);
        setDataLoaded(true);
      })
      .catch(() => {
        console.error("data.json load nahi hua!");
        setSystemPrompt("You are a helpful assistant.");
        setDataLoaded(true);
      });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || !dataLoaded) return;

    const userMsg = { role: "user", content: text };
    const updatedHistory = [...messages, userMsg];

    setMessages(updatedHistory);
    setInput("");
    setLoading(true);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const ollamaMessages = [
      { role: "system", content: systemPrompt },
      ...updatedHistory,
    ];

    let fullResponse = "";

    try {
      const res = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: MODEL, messages: ollamaMessages, stream: true }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      setMessages((prev) => [...prev, { role: "assistant", content: "", streaming: true }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value).split("\n").filter(Boolean);
        for (const line of lines) {
          try {
            const json = JSON.parse(line);
            if (json.message?.content) {
              fullResponse += json.message.content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: fullResponse, streaming: true };
                return updated;
              });
            }
          } catch {}
        }
      }

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: fullResponse };
        return updated;
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Ollama se connect nahi ho paya. Check karo ki `ollama serve` chal raha hai.", error: true },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div style={styles.logo}><img src = {logo1} /></div>
        <div>
          <div style={styles.headerTitle}>Company Assistant</div>
          <div style={styles.headerSub}>{dataLoaded ? "Ready" : "Loading data..."}</div>
        </div>
        <div style={styles.onlineDot} />
      </div>

      <div style={styles.chatArea}>
        {messages.length === 0 && (
          <div style={styles.welcome}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>
              <img src={logo1} style={{ width: 43, height: 43, display: "block", margin: "0 auto" }} />
            </div>
            <div style={styles.welcomeTitle}>you can talk about visa related information!</div>
            <div style={styles.welcomeSub}>I will give you answer visa related information.</div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{ ...styles.msgRow, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "assistant" && <div style={styles.avatarBot}><img src = "logo1" /></div>}
            <div style={{ ...styles.bubble, ...(msg.role === "user" ? styles.bubbleUser : styles.bubbleBot), ...(msg.error ? styles.bubbleError : {}) }}>
              {msg.content || <TypingDots />}
            </div>
            {msg.role === "user" && <div style={styles.avatarUser}>YOU</div>}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div style={styles.inputArea}>
        <div style={styles.inputRow}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Write your question ..."
            rows={1}
            disabled={loading || !dataLoaded}
            style={styles.textarea}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading || !dataLoaded}
            style={{ ...styles.sendBtn, opacity: !input.trim() || loading || !dataLoaded ? 0.35 : 1 }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <div style={styles.hint}>Enter to send · Shift+Enter for new line</div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span style={{ display: "flex", gap: 4, alignItems: "center", padding: "2px 0" }}>
      {[0, 0.2, 0.4].map((delay, i) => (
        <span key={i} style={{
          display: "inline-block", width: 7, height: 7,
          background: "#FFD900", borderRadius: "50%",
          animation: `bounce 1.2s ease ${delay}s infinite`,
        }} />
      ))}
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.3}40%{transform:translateY(-6px);opacity:1}}`}</style>
    </span>
  );
}

const styles = {
  app: { display: "flex", flexDirection: "column", height: "100vh", background: "#FFFFFF", color: "#111827", fontFamily: "'Inter',-apple-system,sans-serif" },
  header: { display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", background: "#FFFFFF", borderBottom: "1px solid #E5E7EB" },
  logo: { width: 36, height: 36, background: "#0F4C81", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#FFFFFF" },
  headerTitle: { fontSize: 15, fontWeight: 600, color: "#111827" },
  headerSub: { fontSize: 11, color: "#6B7280", marginTop: 1 },
  onlineDot: { width: 7, height: 7, background: "#0F4C81", borderRadius: "50%", marginLeft: "auto" },
  chatArea: { flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14, background: "#F9FAFB" },
  welcome: { textAlign: "center", padding: "40px 20px" },
  welcomeTitle: { fontSize: 18, fontWeight: 600, color: "#0F4C81", marginBottom: 6 },
  welcomeSub: { fontSize: 13, color: "#6B7280" },
  msgRow: { display: "flex", gap: 8, alignItems: "flex-end" },
  avatarBot: { width: 28, height: 28, background: "#0F4C81", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#FFFFFF", flexShrink: 0 },
  avatarUser: { width: 28, height: 28, background: "#E5E7EB", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#6B7280", flexShrink: 0 },
  bubble: { padding: "10px 14px", borderRadius: 16, fontSize: 14, lineHeight: 1.6, maxWidth: "75%", whiteSpace: "pre-wrap", wordBreak: "break-word" },
  bubbleUser: { background: "#0F4C81", color: "#FFFFFF", fontWeight: 500, borderBottomRightRadius: 4 },
  bubbleBot: { background: "#FFFFFF", color: "#111827", border: "1px solid #E5E7EB", borderBottomLeftRadius: 4 },
  bubbleError: { background: "#FEF2F2", border: "1px solid #FECACA", color: "#B91C1C" },
  inputArea: { padding: "12px 16px 10px", background: "#FFFFFF", borderTop: "1px solid #E5E7EB" },
  inputRow: { display: "flex", gap: 10, alignItems: "flex-end", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 14, padding: "10px 12px" },
  textarea: { flex: 1, background: "transparent", border: "none", outline: "none", color: "#111827", fontSize: 14, fontFamily: "inherit", resize: "none", lineHeight: 1.5, maxHeight: 120, minHeight: 22 },
  sendBtn: { width: 34, height: 34, background: "#0F4C81", border: "none", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" },
  hint: { textAlign: "center", fontSize: 11, color: "#6B7280", marginTop: 6 },
};