import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Shield, Wifi, WifiOff, Sparkles, Activity, Heart, Users, BookOpen, Zap, ArrowRight, Check } from "lucide-react";
import { Section, Eyebrow, Card, Sparkline } from "../components/ui-bits";
import hero from "../assets/hero-aurora.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Veliora AI — Predict mental wellness before it declines" },
      { name: "description", content: "The world's first predictive, offline-first mental wellness co-pilot. Detect burnout, anxiety, and emotional decline 7–30 days early." },
      { property: "og:title", content: "Veliora AI — Predictive Mental Wellness" },
      { property: "og:description", content: "Prevention, not reaction. A venture-grade wellness platform that works anywhere — even offline." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <Section className="pt-20 pb-28 relative">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Series-grade predictive wellness · v1.0
            </span>
            <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight">
              Mental wellness,<br />
              <span className="text-gradient">predicted before it breaks.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Veliora AI builds a Mental Health Digital Twin™ of you — forecasting burnout, anxiety, and emotional decline 7 to 30 days in advance. Online or offline. Anywhere on Earth.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-aurora text-primary-foreground px-6 py-3 font-medium shadow-glow hover:opacity-95">
                Launch the app <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/digital-twin" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium hover:bg-white/10">
                See the Digital Twin
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              {["Offline-first", "Explainable AI", "End-to-end encrypted", "On-device inference"].map(t => (
                <span key={t} className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" /> {t}</span>
              ))}
            </div>
          </div>

          {/* Hero card preview */}
          <div className="lg:col-span-5 animate-rise" style={{ animationDelay: "0.15s" }}>
            <Card className="relative overflow-hidden">
              <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-aurora opacity-30 blur-3xl" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Wellness Score</div>
                  <div className="text-5xl font-semibold mt-1 text-gradient">82</div>
                  <div className="text-sm text-mint mt-1">Flourishing · +6 this week</div>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-aurora grid place-items-center shadow-glow">
                  <Brain className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-black/20 p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">14-day forecast</div>
                <Sparkline data={[62, 65, 64, 70, 68, 74, 72, 78, 76, 80, 79, 82, 83, 85]} />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-white/5 p-3"><div className="text-xs text-muted-foreground">Burnout</div><div className="text-sm font-medium text-mint mt-1">Low</div></div>
                <div className="rounded-xl bg-white/5 p-3"><div className="text-xs text-muted-foreground">Anxiety</div><div className="text-sm font-medium text-amber mt-1">Medium</div></div>
                <div className="rounded-xl bg-white/5 p-3"><div className="text-xs text-muted-foreground">Sleep</div><div className="text-sm font-medium text-mint mt-1">Stable</div></div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Problem */}
      <Section className="py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="font-serif text-4xl md:text-5xl mt-3">Help arrives <span className="text-gradient">too late.</span></h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Most mental health apps react after a user is already breaking down. Symptoms go unnoticed, therapy is expensive, rural users have no connectivity. Millions suffer silently because today's tools wait for crisis.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { n: "970M", l: "people live with a mental disorder globally" },
              { n: "75%", l: "of cases in developing countries go untreated" },
              { n: "$1T", l: "annual productivity loss from depression & anxiety" },
              { n: "11s", l: "one suicide every 11 seconds worldwide" },
            ].map(s => (
              <Card key={s.n} className="!p-5">
                <div className="text-3xl font-semibold text-gradient">{s.n}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Differentiation */}
      <Section className="py-20">
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>What makes us defensible</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl mt-3">Competitors react. <span className="text-gradient">Veliora predicts.</span></h2>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full text-sm glass rounded-3xl overflow-hidden">
            <thead className="bg-white/5">
              <tr className="text-left">
                {["", "Veliora AI", "Calm / Headspace", "Wysa", "BetterHelp"].map(h => (
                  <th key={h} className="px-5 py-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                ["Predictive (7–30 day forecast)", true, false, false, false],
                ["Works fully offline", true, false, false, false],
                ["Mental Health Digital Twin™", true, false, false, false],
                ["Explainable AI predictions", true, false, false, false],
                ["Personalized recovery missions", true, false, true, true],
                ["Live human therapy", false, false, false, true],
              ].map((row, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="px-5 py-3 text-foreground">{row[0]}</td>
                  {row.slice(1).map((v, j) => (
                    <td key={j} className="px-5 py-3">
                      {v ? <Check className="h-4 w-4 text-mint" /> : <span className="opacity-30">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Feature grid */}
      <Section className="py-20">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>The platform</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl mt-3">Ten breakthroughs in <span className="text-gradient">one co-pilot.</span></h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Brain, t: "Mental Health Digital Twin™", d: "A behavioral clone that forecasts your wellness 7, 14, and 30 days ahead with confidence scores." },
            { icon: Activity, t: "AI Wellness Score™", d: "A 0–100 proprietary score blending mood, sleep, journal, productivity, and social signals." },
            { icon: Zap, t: "Burnout Prediction Engine™", d: "ML models that flag burnout, anxiety, and withdrawal risk — with reasoning and contributing factors." },
            { icon: Heart, t: "AI Pocket Therapist™", d: "Lightweight on-device CBT companion. Active listening, coping skills, mood coaching — even offline." },
            { icon: WifiOff, t: "Offline Crisis Mode™", d: "Mood, journal, meditations, SOS toolkit — all available with zero connectivity. Local encrypted DB." },
            { icon: BookOpen, t: "Awareness Hub 2.0", d: "Gamified myth-vs-fact, learning paths, and quizzes across anxiety, depression, burnout & stress." },
            { icon: Users, t: "Community Wellness Network", d: "Anonymous peer support, recovery journeys, and AI-moderated discussion threads." },
            { icon: Sparkles, t: "Adaptive Intervention Engine™", d: "When risk rises, the AI auto-generates personalized recovery missions that evolve with progress." },
            { icon: Shield, t: "Community Wellness Radar™", d: "Anonymized heatmaps for universities & enterprises. A future B2B revenue line." },
          ].map((f) => (
            <Card key={f.t} className="hover:bg-white/5 transition-colors">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 grid place-items-center mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="font-medium">{f.t}</div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Architecture */}
      <Section className="py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Architecture</Eyebrow>
            <h2 className="font-serif text-4xl md:text-5xl mt-3">Built like a <span className="text-gradient">venture-backed company.</span></h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Four AI layers — NLP, ML, Recommendation, and Explainability — feed an offline-first edge architecture with local encryption, sync queues, and conflict resolution. Designed to pivot models, audiences, or business lines without rebuilding.
            </p>
            <div className="mt-6 space-y-3">
              {[
                ["NLP Layer", "Sentiment · Emotion · Stress detection"],
                ["ML Layer", "Burnout · Risk · Behavioral forecasting"],
                ["Recommendation", "Recovery plans · Awareness · Interventions"],
                ["Explainability", "Why · Confidence · Factors · Actions"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary shadow-glow" />
                  <div>
                    <div className="text-sm font-medium">{k}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-60 w-60 rounded-full bg-violet/30 blur-3xl" />
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Edge stack</div>
            <div className="mt-3 space-y-2 text-sm font-mono">
              {[
                { l: "Local AI inference", on: true },
                { l: "Encrypted local DB", on: true },
                { l: "Sync queue", on: true },
                { l: "Conflict resolution", on: true },
                { l: "Background sync", on: true },
                { l: "Server fallback", on: true },
              ].map(r => (
                <div key={r.l} className="flex items-center justify-between p-2.5 rounded-lg bg-black/20">
                  <span>{r.l}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-mint">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" /> active
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-white/5 p-3">
                <Wifi className="h-4 w-4 text-mint mx-auto" />
                <div className="text-xs text-muted-foreground mt-1">Online sync</div>
                <div className="text-sm font-medium">2 ms latency</div>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <WifiOff className="h-4 w-4 text-violet mx-auto" />
                <div className="text-xs text-muted-foreground mt-1">Offline AI</div>
                <div className="text-sm font-medium">on-device</div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Business / TAM */}
      <Section className="py-20">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>The opportunity</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl mt-3">A <span className="text-gradient">$240B</span> market, underserved.</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { l: "TAM", v: "$240B", s: "Global mental health market by 2030" },
            { l: "SAM", v: "$48B", s: "Digital + preventive wellness segment" },
            { l: "SOM", v: "$1.2B", s: "Yr-5 capture across SEA, India, LATAM" },
          ].map(s => (
            <Card key={s.l}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
              <div className="text-5xl font-semibold mt-2 text-gradient">{s.v}</div>
              <div className="text-sm text-muted-foreground mt-2">{s.s}</div>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-5 gap-3">
          {["Freemium", "Premium subscription", "University licenses", "Corporate wellness", "Government & NGO"].map(r => (
            <div key={r} className="rounded-2xl glass px-4 py-5 text-center text-sm">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Revenue</div>
              {r}
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-24">
        <Card className="relative overflow-hidden text-center !p-12">
          <div className="absolute inset-0 bg-aurora opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="relative">
            <h2 className="font-serif text-4xl md:text-6xl">Prevention, <span className="text-gradient">not reaction.</span></h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Step inside the Veliora app and meet your Digital Twin. It already knows what's coming.
            </p>
            <Link to="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-full bg-aurora text-primary-foreground px-7 py-3.5 font-medium shadow-glow hover:opacity-95">
              Enter the platform <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </Section>
    </div>
  );
}
