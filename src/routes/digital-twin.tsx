import { createFileRoute } from "@tanstack/react-router";
import { Brain, TrendingUp, Sparkles, ShieldCheck } from "lucide-react";
import { Section, Eyebrow, Card, Sparkline, StatPill } from "../components/ui-bits";
import twin from "../assets/digital-twin.jpg";

export const Route = createFileRoute("/digital-twin")({
  head: () => ({
    meta: [
      { title: "Mental Health Digital Twin™ · Veliora AI" },
      { name: "description", content: "A behavioral clone that learns you and forecasts wellness 7, 14, and 30 days ahead." },
    ],
  }),
  component: Twin,
});

function Twin() {
  return (
    <Section className="py-12">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <Eyebrow>Mental Health Digital Twin™</Eyebrow>
          <h1 className="font-serif text-5xl md:text-6xl mt-3">
            Meet the <span className="text-gradient">you</span> that hasn't happened yet.
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl">
            Your Twin continuously learns mood, sleep, productivity, journal sentiment, social signals, and habits — then simulates your future to flag emotional decline weeks in advance.
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <StatPill label="Confidence" value="91%" tone="mint" />
            <StatPill label="Signals fused" value="14" tone="violet" />
            <StatPill label="Forecast horizon" value="30d" tone="amber" />
          </div>
        </div>
        <div className="lg:col-span-5">
          <Card className="relative overflow-hidden !p-3">
            <img src={twin} alt="Digital twin visualization" width={800} height={800} loading="lazy" className="rounded-2xl w-full h-auto" />
          </Card>
        </div>
      </div>

      {/* Forecasts */}
      <div className="mt-12 grid lg:grid-cols-3 gap-5">
        {[
          { h: "7-day forecast", v: 84, trend: "+2", data: [78,80,79,82,81,83,84], conf: 94 },
          { h: "14-day forecast", v: 81, trend: "−1", data: [78,80,79,82,81,83,84,82,81,80,82,83,82,81], conf: 88 },
          { h: "30-day forecast", v: 76, trend: "−6", data: [78,80,79,82,81,83,84,82,81,80,82,83,82,81,79,78,77,76,75,74,73,75,76,77,76,75,76,77,76,76], conf: 79 },
        ].map((f) => (
          <Card key={f.h}>
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{f.h}</div>
              <div className="text-xs text-muted-foreground">conf. {f.conf}%</div>
            </div>
            <div className="mt-3 flex items-end gap-3">
              <div className="text-5xl font-semibold text-gradient">{f.v}</div>
              <div className={`text-sm mb-2 ${f.trend.startsWith("+") ? "text-mint" : "text-coral"}`}>{f.trend}</div>
            </div>
            <div className="mt-3"><Sparkline data={f.data} /></div>
          </Card>
        ))}
      </div>

      {/* Contributing factors */}
      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-4 w-4 text-primary" />
            <div className="font-medium">Why this forecast? (Explainable AI)</div>
          </div>
          <div className="space-y-3 text-sm">
            {[
              { f: "Sleep drift", w: 28, dir: "−", desc: "Average sleep dropped 42m over 10 days" },
              { f: "Journal sentiment", w: 22, dir: "−", desc: "Increased frequency of 'tired', 'overwhelmed', 'can't'" },
              { f: "Calendar load", w: 18, dir: "−", desc: "3 high-stakes events in next 2 weeks" },
              { f: "Social check-ins", w: 14, dir: "−", desc: "Outbound messages down 31%" },
              { f: "Movement", w: 10, dir: "+", desc: "Step count trending up" },
              { f: "Routine stability", w: 8, dir: "+", desc: "Wake time within ±20m" },
            ].map((r) => (
              <div key={r.f} className="flex items-center gap-3">
                <div className={`h-6 w-6 rounded-md grid place-items-center text-xs font-bold ${r.dir === "−" ? "bg-coral/20 text-coral" : "bg-mint/20 text-mint"}`}>{r.dir}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span>{r.f}</span>
                    <span className="text-xs text-muted-foreground">{r.w}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 mt-1.5 overflow-hidden">
                    <div className={`h-full rounded-full ${r.dir === "−" ? "bg-coral/70" : "bg-mint/70"}`} style={{ width: `${r.w * 3}%` }} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-mint" />
            <div className="font-medium">Recommended interventions</div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Generated by the Adaptive Intervention Engine™ based on forecast deltas.</p>
          <div className="space-y-3">
            {[
              { t: "Sleep recovery protocol", d: "Shift bedtime −20m/night for 5 nights", impact: "+4 pts" },
              { t: "Pre-event anxiety taper", d: "10m breathwork on event-day mornings", impact: "+3 pts" },
              { t: "Social anchor", d: "Schedule one 15m call this week", impact: "+2 pts" },
              { t: "Journal prompts", d: "Switch to gratitude format for 7 days", impact: "+2 pts" },
            ].map((m, i) => (
              <div key={i} className="flex items-start justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <div className="text-sm font-medium">{m.t}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{m.d}</div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-mint/20 text-mint">{m.impact}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Trust */}
      <Card className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-mint" />
          <div className="text-sm">All forecasts run on-device. Your data never leaves your phone unless you choose to sync.</div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <TrendingUp className="h-4 w-4" /> Model updated 3h ago · v2.4
        </div>
      </Card>
    </Section>
  );
}
