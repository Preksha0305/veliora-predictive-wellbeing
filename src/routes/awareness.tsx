import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, X, Trophy } from "lucide-react";
import { Section, Eyebrow, Card } from "../components/ui-bits";

export const Route = createFileRoute("/awareness")({
  head: () => ({
    meta: [
      { title: "Awareness Hub 2.0 · Veliora AI" },
      { name: "description", content: "Learn, unlearn, and grow. Gamified myth-vs-fact, quizzes, and learning paths." },
    ],
  }),
  component: Awareness,
});

const paths = [
  { t: "Anxiety 101", lessons: 8, progress: 62, color: "violet" },
  { t: "Depression Awareness", lessons: 10, progress: 30, color: "mint" },
  { t: "Burnout Prevention", lessons: 7, progress: 100, color: "amber" },
  { t: "Stress Management", lessons: 9, progress: 12, color: "coral" },
  { t: "Emotional Intelligence", lessons: 12, progress: 48, color: "violet" },
  { t: "Workplace Wellness", lessons: 6, progress: 0, color: "mint" },
];

const myths = [
  { s: "Talking about suicide encourages it", fact: false, exp: "Studies show open conversations reduce risk and increase help-seeking." },
  { s: "Mental illness is a sign of weakness", fact: false, exp: "Mental disorders are medical conditions — like diabetes or asthma." },
  { s: "Exercise can improve mood within 30 days", fact: true, exp: "Aerobic activity 3×/week shows measurable mood gains in 4 weeks." },
];

function Awareness() {
  return (
    <Section className="py-12">
      <Eyebrow>Awareness Hub 2.0</Eyebrow>
      <h1 className="font-serif text-4xl md:text-5xl mt-3">Mental health, <span className="text-gradient">understood.</span></h1>
      <p className="text-muted-foreground mt-2 max-w-2xl">Bite-sized learning paths, myth-busters, and challenges. Earn streaks. Build literacy.</p>

      {/* Learning paths */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {paths.map((p) => (
          <Card key={p.t} className="hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className={`h-10 w-10 rounded-xl bg-${p.color}/20 grid place-items-center`}>
                <BookOpen className={`h-5 w-5 text-${p.color}`} />
              </div>
              {p.progress === 100 && <Trophy className="h-4 w-4 text-amber" />}
            </div>
            <div className="font-medium mt-4">{p.t}</div>
            <div className="text-xs text-muted-foreground">{p.lessons} lessons · {p.progress}% complete</div>
            <div className="h-1.5 rounded-full bg-white/5 mt-3 overflow-hidden">
              <div className={`h-full bg-${p.color}`} style={{ width: `${p.progress}%` }} />
            </div>
          </Card>
        ))}
      </div>

      {/* Myth vs fact */}
      <div className="mt-12">
        <Eyebrow>Myth vs Fact</Eyebrow>
        <h2 className="font-serif text-3xl mt-3">Test what you think you know.</h2>
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {myths.map((m, i) => (
            <Card key={i}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Statement</div>
              <div className="mt-2 font-medium">"{m.s}"</div>
              <div className="mt-4 flex items-center gap-2">
                {m.fact ? (
                  <span className="inline-flex items-center gap-1.5 text-mint text-sm"><CheckCircle2 className="h-4 w-4" /> Fact</span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-coral text-sm"><X className="h-4 w-4" /> Myth</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-3">{m.exp}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Weekly challenge */}
      <Card className="mt-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-aurora opacity-30 blur-3xl" />
        <div className="relative grid md:grid-cols-2 gap-6 items-center">
          <div>
            <Eyebrow>This week's challenge</Eyebrow>
            <h3 className="font-serif text-3xl mt-3">Notice one feeling, name it, breathe through it. Daily.</h3>
            <p className="text-muted-foreground mt-2">Earn the "Named &amp; Felt" badge by completing 7 days.</p>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className={`flex-1 aspect-square rounded-xl grid place-items-center ${i < 4 ? "bg-aurora shadow-glow" : "bg-white/5"}`}>
                {i < 4 ? <CheckCircle2 className="h-5 w-5 text-primary-foreground" /> : <span className="text-xs text-muted-foreground">D{i+1}</span>}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Section>
  );
}
