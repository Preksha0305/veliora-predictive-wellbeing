import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Brain, Heart, Moon, Activity, Users, BookOpen, AlertTriangle, ArrowRight, Smile, Frown, Meh, Sparkles } from "lucide-react";
import { Section, Eyebrow, Card, GradientRing, Sparkline, RiskBar, StatPill } from "../components/ui-bits";
import { getSession, getOnboarding, type OnboardingData } from "@/lib/veliora-auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · Veliora AI" },
      { name: "description", content: "Your live AI Wellness Score, mood, sleep, and risk forecasts in one view." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [name, setName] = useState("there");
  const [onb, setOnb] = useState<OnboardingData | null>(null);
  useEffect(() => {
    const s = getSession();
    if (s) {
      setName(s.name.split(" ")[0] || "there");
      setOnb(getOnboarding(s.userId));
    }
  }, []);

  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const moodLabel = onb?.mood ?? "Calm";
  const sleepLabel = onb ? `${onb.sleepHours}h` : "6.8h";

  return (
    <Section className="py-12">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <Eyebrow>Today · {today}</Eyebrow>
          <h1 className="font-serif text-4xl md:text-5xl mt-2">Good to see you, <span className="text-gradient">{name}</span>.</h1>
          <p className="text-muted-foreground mt-1">Your Digital Twin updated 4 minutes ago · feeling {moodLabel.toLowerCase()}.</p>
        </div>
        <Link to="/therapist" className="inline-flex items-center gap-2 rounded-full bg-aurora text-primary-foreground px-5 py-2.5 font-medium shadow-glow text-sm">
          Talk to Pocket Therapist <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Hero row */}
      <div className="grid lg:grid-cols-3 gap-5 mt-8">
        <Card className="lg:col-span-1 flex flex-col items-center text-center">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">AI Wellness Score™</div>
          <div className="my-4"><GradientRing value={82} size={220} label="Flourishing" /></div>
          <div className="text-sm text-mint">+6 this week · stable trend</div>
          <div className="mt-4 grid grid-cols-3 gap-2 w-full text-xs">
            <div className="rounded-lg bg-white/5 py-2">Mood<br/><span className="text-foreground font-medium">{moodLabel}</span></div>
            <div className="rounded-lg bg-white/5 py-2">Sleep<br/><span className="text-foreground font-medium">{sleepLabel}</span></div>
            <div className="rounded-lg bg-white/5 py-2">Focus<br/><span className="text-foreground font-medium">82%</span></div>
          </div>
        </Card>


        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">14-day forecast</div>
              <div className="mt-1 font-medium">Wellness trending upward</div>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-mint/20 text-mint">Actual</span>
              <span className="px-2 py-1 rounded-full bg-violet/20 text-violet">Forecast</span>
            </div>
          </div>
          <div className="mt-4">
            <Sparkline data={[58, 60, 62, 64, 65, 70, 72, 75, 78, 80, 82, 83, 84, 85]} height={140} />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <StatPill label="7-day risk" value="Low" tone="mint" />
            <StatPill label="Burnout signal" value="−12%" tone="violet" />
            <StatPill label="Confidence" value="91%" tone="amber" />
          </div>
        </Card>
      </div>

      {/* Risk + Mood */}
      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-amber" />
            <div className="font-medium">Burnout Prediction Engine™</div>
          </div>
          <div className="space-y-4">
            <RiskBar label="Burnout" level="Low" value={22} />
            <RiskBar label="Anxiety" level="Medium" value={54} />
            <RiskBar label="Depression" level="Low" value={18} />
            <RiskBar label="Social withdrawal" level="Medium" value={48} />
            <RiskBar label="Emotional exhaustion" level="Low" value={28} />
          </div>
          <div className="mt-5 p-3 rounded-xl bg-violet/10 border border-violet/20 text-sm">
            <div className="text-violet text-xs uppercase tracking-widest mb-1">Explainable AI</div>
            Anxiety is elevated due to <strong>3 late-night journal entries</strong>, <strong>sleep under 6h</strong>, and an upcoming logged event.
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-coral" />
              <div className="font-medium">Mood today</div>
            </div>
            <span className="text-xs text-muted-foreground">tap to log</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[
              { I: Frown, l: "Awful", c: "from-coral/30 to-coral/10" },
              { I: Frown, l: "Low", c: "from-amber/30 to-amber/10" },
              { I: Meh, l: "OK", c: "from-white/10 to-white/5" },
              { I: Smile, l: "Good", c: "from-mint/30 to-mint/10" },
              { I: Smile, l: "Great", c: "from-violet/30 to-violet/10" },
            ].map((m, i) => (
              <button key={i} className={`aspect-square rounded-2xl bg-gradient-to-br ${m.c} grid place-items-center hover:scale-105 transition-transform`}>
                <div className="text-center">
                  <m.I className="h-5 w-5 mx-auto" />
                  <div className="text-[10px] mt-1 text-muted-foreground">{m.l}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Last 30 days</div>
            <Sparkline data={[5, 4, 6, 5, 7, 6, 5, 4, 3, 5, 6, 7, 7, 6, 5, 6, 7, 8, 7, 6, 7, 8, 7, 6, 7, 8, 7, 7, 8, 7]} color="oklch(0.72 0.19 25)" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-mint" />
            <div className="font-medium">Today's recovery mission</div>
          </div>
          <div className="text-sm text-muted-foreground mb-3">Auto-generated by the Adaptive Intervention Engine™</div>
          <div className="space-y-2">
            {[
              { t: "5-minute box breathing", d: "Reduce anxiety spike" },
              { t: "Walk outdoors · 20 min", d: "Boost mood + circadian sync" },
              { t: "Journal one wins entry", d: "Reinforce positive recall" },
              { t: "Lights out by 11:00pm", d: "Sleep debt repayment" },
            ].map((m, i) => (
              <label key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
                <input type="checkbox" className="mt-1 accent-primary" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{m.t}</div>
                  <div className="text-xs text-muted-foreground">{m.d}</div>
                </div>
              </label>
            ))}
          </div>
        </Card>
      </div>

      {/* Signals */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {[
          { I: Moon, l: "Sleep", v: "6h 48m", t: "−24m vs avg", c: "amber" },
          { I: Activity, l: "Productivity", v: "82%", t: "+9% week", c: "mint" },
          { I: Users, l: "Social", v: "3 contacts", t: "stable", c: "violet" },
          { I: BookOpen, l: "Journal", v: "5 entries", t: "this week", c: "mint" },
        ].map((s, i) => (
          <Card key={i} className="!p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
              <s.I className={`h-4 w-4 text-${s.c}`} />
            </div>
            <div className="text-2xl font-semibold mt-2">{s.v}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.t}</div>
          </Card>
        ))}
      </div>

      {/* Life events */}
      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-4 w-4 text-violet" />
            <div className="font-medium">Life Event Impact Engine™</div>
          </div>
          <div className="space-y-3">
            {[
              { e: "Final exams · in 9 days", impact: "High", color: "coral" },
              { e: "Job interview · in 4 days", impact: "Medium", color: "amber" },
              { e: "Family visit · this weekend", impact: "Positive", color: "mint" },
            ].map((e, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <div className="text-sm">{e.e}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">AI suggested: pre-emptive sleep, journaling, breathing</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full bg-${e.color}/20 text-${e.color}`}>{e.impact}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-mint" />
            <div className="font-medium">Weekly insights</div>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><span className="h-2 w-2 rounded-full bg-mint mt-2" /> Mood improved on days you walked &gt;5,000 steps.</li>
            <li className="flex gap-3"><span className="h-2 w-2 rounded-full bg-violet mt-2" /> Anxiety spikes correlate strongly with screen time after 10pm.</li>
            <li className="flex gap-3"><span className="h-2 w-2 rounded-full bg-amber mt-2" /> 2 missed journal days reduced score by ~4 pts.</li>
            <li className="flex gap-3"><span className="h-2 w-2 rounded-full bg-coral mt-2" /> Social isolation flag cleared after Sunday call.</li>
          </ul>
        </Card>
      </div>
    </Section>
  );
}
