import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Users, Heart, MessageCircle, ShieldCheck, TrendingUp } from "lucide-react";
import { Section, Eyebrow, Card, Sparkline } from "../components/ui-bits";
import { getSession } from "@/lib/veliora-auth";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community Wellness Network · Veliora AI" },
      { name: "description", content: "Anonymous peer support, recovery journeys, and AI-moderated discussions." },
    ],
  }),
  component: Community,
});

const posts = [
  { tag: "Burnout", title: "Made it through finals — here's what helped", author: "anon_owl", hearts: 142, replies: 38, time: "2h" },
  { tag: "Anxiety", title: "Anyone else feel panicky during commutes?", author: "quiet_river", hearts: 89, replies: 24, time: "5h" },
  { tag: "Recovery", title: "Day 30 of consistent sleep — small win", author: "morning_fern", hearts: 211, replies: 52, time: "1d" },
  { tag: "Workplace", title: "How I asked my manager for a mental health day", author: "soft_signal", hearts: 167, replies: 41, time: "1d" },
  { tag: "Loneliness", title: "Living alone in a new city, looking for routines", author: "blue_kite", hearts: 73, replies: 19, time: "2d" },
];

function Community() {
  const [name, setName] = useState("");
  useEffect(() => { const s = getSession(); if (s) setName(s.name.split(" ")[0]); }, []);
  return (
    <Section className="py-12">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <Eyebrow>Community Wellness Network™</Eyebrow>
          <h1 className="font-serif text-4xl md:text-5xl mt-3">{name ? <>You're not <span className="text-gradient">alone</span>, {name}.</> : <>You're not <span className="text-gradient">alone</span> in this.</>}</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">Anonymous, AI-moderated peer support. Share, listen, recover — at your own pace.</p>
        </div>
        <button className="rounded-full bg-aurora text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-glow">Share anonymously</button>
      </div>

      <div className="grid lg:grid-cols-12 gap-5 mt-8">
        <div className="lg:col-span-8 space-y-3">
          {posts.map((p, i) => (
            <Card key={i} className="hover:bg-white/5 cursor-pointer transition-colors">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-0.5 rounded-full bg-violet/20 text-violet">{p.tag}</span>
                <span>· {p.author} · {p.time}</span>
              </div>
              <div className="text-lg font-medium mt-2">{p.title}</div>
              <div className="flex items-center gap-5 mt-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Heart className="h-4 w-4 text-coral" /> {p.hearts}</span>
                <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-4 w-4" /> {p.replies}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-5">
          <Card>
            <div className="flex items-center gap-2 mb-3"><TrendingUp className="h-4 w-4 text-mint" /> <span className="font-medium">Community mood today</span></div>
            <Sparkline data={[6, 6, 5, 7, 6, 7, 8, 7, 6, 7, 8, 7, 6, 7]} />
            <div className="text-xs text-muted-foreground mt-2">Trending more positive vs last week.</div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3"><Users className="h-4 w-4 text-violet" /> <span className="font-medium">Active circles</span></div>
            <ul className="space-y-2 text-sm">
              {[
                ["Student burnout", "1,284 members"],
                ["Sleep recovery", "892 members"],
                ["Workplace anxiety", "2,031 members"],
                ["Grief & loss", "418 members"],
              ].map(([n, m]) => (
                <li key={n} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                  <span>{n}</span>
                  <span className="text-xs text-muted-foreground">{m}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-mint" />
              <span>AI moderation removes harm in &lt;2s. Posts are anonymous by default.</span>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
