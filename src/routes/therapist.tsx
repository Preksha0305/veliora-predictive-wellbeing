import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, WifiOff, Sparkles, Heart } from "lucide-react";
import { Section, Eyebrow, Card } from "../components/ui-bits";

export const Route = createFileRoute("/therapist")({
  head: () => ({
    meta: [
      { title: "AI Pocket Therapist™ · Veliora AI" },
      { name: "description", content: "A lightweight, on-device AI companion offering CBT-inspired support — even offline." },
    ],
  }),
  component: Therapist,
});

type Msg = { role: "user" | "ai"; text: string };

const seed: Msg[] = [
  { role: "ai", text: "Hi Aarav. I'm here whenever you need a moment. What's been on your mind today?" },
  { role: "user", text: "I've been feeling really overwhelmed with everything coming up." },
  { role: "ai", text: "That sounds heavy. Overwhelm often shows up when there's a lot competing for the same energy. Want to try a quick exercise — name the three things weighing on you most? We can take them one at a time." },
];

function Therapist() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", text: input };
    const aiMsg: Msg = { role: "ai", text: "I hear you. Let's pause for a breath. Can we explore what's underneath that feeling — is it more about pressure, fear, or exhaustion?" };
    setMessages([...messages, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <Section className="py-12">
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-5">
          <div>
            <Eyebrow>AI Pocket Therapist™</Eyebrow>
            <h1 className="font-serif text-4xl mt-3">A calm <span className="text-gradient">in your pocket.</span></h1>
            <p className="mt-3 text-muted-foreground">CBT-inspired conversations, active listening, breathwork & reflection. Runs on-device — works offline.</p>
          </div>

          <Card>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <WifiOff className="h-4 w-4 text-violet" />
              <span className="text-violet font-medium">Offline mode active</span>
            </div>
            <div className="text-sm text-muted-foreground">Conversations are stored encrypted on your device and sync only when you're back online.</div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3 text-sm font-medium"><Sparkles className="h-4 w-4 text-mint" /> Quick tools</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {["Box breathing", "Grounding 5-4-3-2-1", "Body scan", "Thought reframe", "Worry journal", "Sleep wind-down"].map(t => (
                <button key={t} className="rounded-xl bg-white/5 hover:bg-white/10 p-3 text-left">{t}</button>
              ))}
            </div>
          </Card>
        </div>

        <Card className="lg:col-span-8 !p-0 overflow-hidden flex flex-col" >
          <div className="border-b border-white/5 p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-aurora grid place-items-center shadow-glow">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-medium text-sm">Veli · Pocket Therapist</div>
              <div className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" /> on-device · private
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3 min-h-[420px] max-h-[520px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user"
                    ? "bg-aurora text-primary-foreground"
                    : "glass"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 p-4">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Share whatever's on your mind…"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm outline-none focus:border-primary/50"
              />
              <button onClick={send} className="h-10 w-10 rounded-full bg-aurora grid place-items-center shadow-glow hover:opacity-95">
                <Send className="h-4 w-4 text-primary-foreground" />
              </button>
            </div>
            <div className="text-[11px] text-muted-foreground mt-2 text-center">Not a substitute for clinical care. If you're in crisis, open the SOS center.</div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
