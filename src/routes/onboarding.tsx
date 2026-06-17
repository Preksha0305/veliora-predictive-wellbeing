import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, Check, Plus, Trash2, Sparkles, Moon, CalendarDays, Activity, Target, Smile,
} from "lucide-react";
import { getSession, getOnboarding, saveOnboarding, type OnboardingData, type OnboardingEvent } from "@/lib/veliora-auth";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding — Veliora AI" },
      { name: "description", content: "Help Veliora AI understand your emotional state, sleep, goals, and upcoming life events." },
    ],
  }),
  component: OnboardingPage,
});

const MOODS = ["Happy", "Calm", "Motivated", "Neutral", "Tired", "Anxious", "Stressed", "Overwhelmed", "Sad"];
const EVENT_TYPES = ["Exam", "Interview", "Deadline", "Presentation", "Travel", "Family Event", "Medical Appointment", "Personal Event", "Other"];
const GOALS = ["Better Sleep", "Reduce Stress", "Improve Focus", "Manage Anxiety", "Increase Productivity", "Emotional Balance", "Build Healthy Habits"];

const STEPS = [
  { key: "mood", title: "Today's Emotional State", icon: Smile },
  { key: "sleep", title: "Sleep Schedule", icon: Moon },
  { key: "events", title: "Upcoming Events", icon: CalendarDays },
  { key: "snapshot", title: "Wellness Snapshot", icon: Activity },
  { key: "goals", title: "Wellness Goals", icon: Target },
  { key: "summary", title: "All Set", icon: Sparkles },
] as const;

function OnboardingPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState<ReturnType<typeof getSession>>(null);
  const [step, setStep] = useState(0);

  const [mood, setMood] = useState("Calm");
  const [moodIntensity, setMoodIntensity] = useState(6);
  const [moodNote, setMoodNote] = useState("");
  const [sleepHours, setSleepHours] = useState(7);
  const [bedtime, setBedtime] = useState("23:30");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [sleepQuality, setSleepQuality] = useState(7);
  const [events, setEvents] = useState<OnboardingEvent[]>([]);
  const [stress, setStress] = useState(5);
  const [energy, setEnergy] = useState(6);
  const [motivation, setMotivation] = useState(6);
  const [goals, setGoals] = useState<string[]>([]);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      navigate({ to: "/login" });
      return;
    }
    setSession(s);
    const existing = getOnboarding(s.userId);
    if (existing) navigate({ to: "/dashboard" });
  }, [navigate]);

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  function next() { setStep((s) => Math.min(STEPS.length - 1, s + 1)); }
  function back() { setStep((s) => Math.max(0, s - 1)); }

  function addEvent() {
    setEvents((e) => [...e, {
      id: crypto.randomUUID(), title: "", date: new Date().toISOString().slice(0, 10),
      importance: "Medium", type: "Deadline",
    }]);
  }
  function updateEvent(id: string, patch: Partial<OnboardingEvent>) {
    setEvents((e) => e.map((ev) => ev.id === id ? { ...ev, ...patch } : ev));
  }
  function removeEvent(id: string) { setEvents((e) => e.filter((ev) => ev.id !== id)); }

  function toggleGoal(g: string) {
    setGoals((cur) => cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g]);
  }

  function finish() {
    if (!session) return;
    const data: OnboardingData = {
      mood, moodIntensity, moodNote, sleepHours, bedtime, wakeTime, sleepQuality,
      events, stress, energy, motivation, goals,
      completedAt: new Date().toISOString(),
    };
    saveOnboarding(session.userId, data);
    navigate({ to: "/dashboard" });
  }

  if (!session) return null;
  const StepIcon = STEPS[step].icon;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] px-4 py-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute top-0 left-1/3 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Hi {session.name.split(" ")[0]} — let's calibrate Veliora AI</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{STEPS[step].title}</h1>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Step {step + 1} of {STEPS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full bg-aurora transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 hidden sm:flex justify-between">
            {STEPS.map((s, i) => (
              <div key={s.key} className={`flex items-center gap-1.5 text-[11px] ${i <= step ? "text-foreground" : "text-muted-foreground/50"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${i < step ? "bg-primary" : i === step ? "bg-aurora animate-pulse" : "bg-white/10"}`} />
                {s.title.split(" ")[0]}
              </div>
            ))}
          </div>
        </div>

        {/* Step card */}
        <div key={step} className="glass-strong rounded-2xl border border-white/10 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-xl bg-aurora grid place-items-center shadow-glow">
              <StepIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Step {step + 1}</div>
              <div className="font-medium">{STEPS[step].title}</div>
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-5">
              <p className="text-sm text-muted-foreground">How are you feeling today?</p>
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                {MOODS.map((m) => (
                  <button key={m} type="button" onClick={() => setMood(m)}
                    className={`rounded-xl border px-3 py-3 text-sm transition-all ${mood === m ? "border-primary bg-primary/10 text-foreground shadow-glow" : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:border-white/20"}`}>
                    {m}
                  </button>
                ))}
              </div>
              <SliderRow label="Mood intensity" value={moodIntensity} onChange={setMoodIntensity} />
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">What's contributing most to this feeling? (optional)</label>
                <textarea value={moodNote} onChange={(e) => setMoodNote(e.target.value)} rows={3}
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-primary/60" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <p className="text-sm text-muted-foreground">Sleep is one of the strongest predictors of mood — share your typical pattern.</p>
              <div className="grid grid-cols-2 gap-4">
                <NumberField label="Average sleep (hours)" value={sleepHours} onChange={setSleepHours} min={0} max={14} step={0.5} />
                <div />
                <TimeField label="Typical bedtime" value={bedtime} onChange={setBedtime} />
                <TimeField label="Typical wake-up" value={wakeTime} onChange={setWakeTime} />
              </div>
              <SliderRow label="Sleep quality" value={sleepQuality} onChange={setSleepQuality} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">These events help Veliora AI anticipate periods of stress, anxiety, or emotional changes.</p>
              {events.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/15 p-6 text-center text-sm text-muted-foreground">
                  No events yet. Add anything important coming up in the next 10 days.
                </div>
              )}
              <div className="space-y-3">
                {events.map((ev) => (
                  <div key={ev.id} className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
                    <div className="flex gap-2">
                      <input value={ev.title} onChange={(e) => updateEvent(ev.id, { title: e.target.value })} placeholder="Event title"
                        className="flex-1 bg-transparent border border-white/10 rounded-md px-3 py-2 text-sm outline-none focus:border-primary/60" />
                      <button type="button" onClick={() => removeEvent(ev.id)} className="p-2 rounded-md hover:bg-white/10 text-muted-foreground hover:text-[hsl(var(--coral))]">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input type="date" value={ev.date} onChange={(e) => updateEvent(ev.id, { date: e.target.value })}
                        className="bg-transparent border border-white/10 rounded-md px-3 py-2 text-sm outline-none focus:border-primary/60" />
                      <select value={ev.importance} onChange={(e) => updateEvent(ev.id, { importance: e.target.value as OnboardingEvent["importance"] })}
                        className="bg-background border border-white/10 rounded-md px-3 py-2 text-sm outline-none focus:border-primary/60">
                        {(["Low", "Medium", "High"] as const).map((i) => <option key={i} value={i}>{i} importance</option>)}
                      </select>
                      <select value={ev.type} onChange={(e) => updateEvent(ev.id, { type: e.target.value })}
                        className="bg-background border border-white/10 rounded-md px-3 py-2 text-sm outline-none focus:border-primary/60">
                        {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addEvent}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 py-2.5 text-sm">
                <Plus className="h-4 w-4" /> Add event
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <p className="text-sm text-muted-foreground">A quick read on how you're doing right now.</p>
              <SliderRow label="Stress level" value={stress} onChange={setStress} tone="coral" />
              <SliderRow label="Energy level" value={energy} onChange={setEnergy} tone="mint" />
              <SliderRow label="Motivation level" value={motivation} onChange={setMotivation} tone="violet" />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Pick the goals Veliora AI should prioritize for you.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GOALS.map((g) => {
                  const on = goals.includes(g);
                  return (
                    <button key={g} type="button" onClick={() => toggleGoal(g)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-all ${on ? "border-primary bg-primary/10 shadow-glow" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
                      <span>{g}</span>
                      {on && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <div className="rounded-xl bg-aurora/10 border border-primary/20 p-5">
                <p className="text-sm text-foreground">
                  Veliora AI now understands your current emotional state, sleep patterns, wellness goals, and upcoming life events to provide more personalized support and predictions.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <SummaryRow label="Mood" value={`${mood} · ${moodIntensity}/10`} />
                <SummaryRow label="Sleep" value={`${sleepHours}h · ${bedtime}→${wakeTime}`} />
                <SummaryRow label="Sleep quality" value={`${sleepQuality}/10`} />
                <SummaryRow label="Events tracked" value={`${events.length}`} />
                <SummaryRow label="Stress / Energy / Motivation" value={`${stress} · ${energy} · ${motivation}`} />
                <SummaryRow label="Goals" value={goals.length ? `${goals.length} selected` : "None"} />
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between">
            <button type="button" onClick={back} disabled={step === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button type="button" onClick={next}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-aurora text-primary-foreground text-sm font-medium shadow-glow hover:opacity-95">
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button type="button" onClick={finish}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-aurora text-primary-foreground text-sm font-medium shadow-glow hover:opacity-95">
                Enter dashboard <Sparkles className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Prefer to do this later? <Link to="/dashboard" className="underline hover:text-foreground">Skip for now</Link>
        </p>
      </div>
    </div>
  );
}

function SliderRow({ label, value, onChange, tone = "primary" }: { label: string; value: number; onChange: (v: number) => void; tone?: "primary" | "mint" | "coral" | "violet" }) {
  const toneClass = tone === "mint" ? "accent-[hsl(var(--mint))]" : tone === "coral" ? "accent-[hsl(var(--coral))]" : tone === "violet" ? "accent-[hsl(var(--violet))]" : "accent-[hsl(var(--primary))]";
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className="text-sm font-medium tabular-nums">{value}/10</span>
      </div>
      <input type="range" min={1} max={10} value={value} onChange={(e) => onChange(Number(e.target.value))} className={`w-full ${toneClass}`} />
    </div>
  );
}

function NumberField({ label, value, onChange, min, max, step }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input type="number" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-primary/60" />
    </label>
  );
}

function TimeField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input type="time" value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-primary/60" />
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-medium">{value}</div>
    </div>
  );
}
