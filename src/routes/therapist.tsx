import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, WifiOff, Sparkles, Heart, Loader2 } from "lucide-react";
import { Section, Eyebrow, Card } from "../components/ui-bits";
import { getSession, getOnboarding, type OnboardingData } from "@/lib/veliora-auth";
import { chatWithTherapist } from "@/lib/therapist.functions";

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

function Therapist() {
  const [name, setName] = useState("there");
  const [onb, setOnb] = useState<OnboardingData | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = getSession();
    if (s) {
      const first = s.name.split(" ")[0] || "there";
      setName(first);
      const o = getOnboarding(s.userId);
      setOnb(o);
      setMessages([
        {
          role: "ai",
          text: `Hi ${first}. I'm Veli — your Pocket Therapist. ${
            o?.mood ? `You logged feeling ${o.mood.toLowerCase()} earlier. ` : ""
          }What's on your mind right now?`,
        },
      ]);
    } else {
      setMessages([
        { role: "ai", text: "Hi, I'm Veli — your Pocket Therapist. What's on your mind today?" },
      ]);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const { reply } = await chatWithTherapist({
        data: {
          messages: next,
          user: onb
            ? {
                name,
                mood: onb.mood,
                stress: onb.stress,
                energy: onb.energy,
                sleepHours: onb.sleepHours,
                goals: onb.goals,
                events: onb.events?.map((e) => ({
                  title: e.title,
                  date: e.date,
                  importance: e.importance,
                })),
              }
            : { name },
        },
      });
      setMessages((m) => [...m, { role: "ai", text: reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function quickTool(prompt: string) {
    setInput(prompt);
  }

  return (
    <Section className="py-12">
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-5">
          <div>
            <Eyebrow>AI Pocket Therapist™</Eyebrow>
            <h1 className="font-serif text-4xl mt-3">A calm <span className="text-gradient">in your pocket.</span></h1>
            <p className="mt-3 text-muted-foreground">CBT-inspired conversations tailored to your mood, sleep, and upcoming life events.</p>
          </div>

          <Card>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <WifiOff className="h-4 w-4 text-violet" />
              <span className="text-violet font-medium">Private session</span>
            </div>
            <div className="text-sm text-muted-foreground">Veli adapts to your Veliora profile — mood, sleep, stress and goals — to give responses that fit you.</div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3 text-sm font-medium"><Sparkles className="h-4 w-4 text-mint" /> Quick prompts</div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {[
                "Walk me through a box-breathing exercise.",
                "I feel anxious about something coming up.",
                "Help me reframe a negative thought.",
                "I can't sleep — what should I try?",
                "I'm overwhelmed with everything on my plate.",
              ].map((t) => (
                <button key={t} onClick={() => quickTool(t)} className="rounded-xl bg-white/5 hover:bg-white/10 p-3 text-left">{t}</button>
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
                <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" /> personalized for {name}
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-3 min-h-[420px] max-h-[520px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                  m.role === "user" ? "bg-aurora text-primary-foreground" : "glass"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass rounded-2xl px-4 py-2.5 text-sm inline-flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Veli is thinking…
                </div>
              </div>
            )}
            {error && (
              <div className="text-xs text-coral text-center">{error}</div>
            )}
          </div>

          <div className="border-t border-white/5 p-4">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Share whatever's on your mind…"
                disabled={loading}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm outline-none focus:border-primary/50 disabled:opacity-60"
              />
              <button onClick={send} disabled={loading || !input.trim()} className="h-10 w-10 rounded-full bg-aurora grid place-items-center shadow-glow hover:opacity-95 disabled:opacity-50">
                {loading ? <Loader2 className="h-4 w-4 text-primary-foreground animate-spin" /> : <Send className="h-4 w-4 text-primary-foreground" />}
              </button>
            </div>
            <div className="text-[11px] text-muted-foreground mt-2 text-center">Not a substitute for clinical care. If you're in crisis, open the SOS center.</div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
