import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, MessageSquare, Wind, Heart, WifiOff, ShieldAlert } from "lucide-react";
import { Section, Eyebrow, Card } from "../components/ui-bits";
import { getSession } from "@/lib/veliora-auth";

export const Route = createFileRoute("/sos")({
  head: () => ({
    meta: [
      { title: "SOS Center · Veliora AI" },
      { name: "description", content: "Crisis tools that work offline: breathing, grounding, emergency contacts, and immediate support." },
    ],
  }),
  component: SOS,
});

function SOS() {
  return (
    <Section className="py-12">
      <div className="rounded-3xl p-6 border border-coral/30 bg-gradient-to-br from-coral/15 to-coral/5 flex items-start gap-4">
        <div className="h-10 w-10 rounded-xl bg-coral/30 grid place-items-center">
          <ShieldAlert className="h-5 w-5 text-coral" />
        </div>
        <div>
          <div className="font-medium">If you're in immediate danger, please call your local emergency number now.</div>
          <div className="text-sm text-muted-foreground mt-1">Veliora's SOS Center works offline — every tool below is available without internet.</div>
        </div>
      </div>

      <div className="mt-8">
        <Eyebrow>Offline Crisis Mode™</Eyebrow>
        <h1 className="font-serif text-4xl md:text-5xl mt-3">You're <span className="text-gradient">safe here.</span></h1>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {[
          { I: Phone, t: "iCall (India)", d: "9152987821 · 9 AM–9 PM", color: "mint" },
          { I: Phone, t: "Vandrevala Foundation", d: "1860-2662-345 · 24/7", color: "mint" },
          { I: MessageSquare, t: "iCall chat", d: "Text-based support", color: "violet" },
        ].map((c, i) => (
          <Card key={i}>
            <div className={`h-10 w-10 rounded-xl bg-${c.color}/20 grid place-items-center mb-3`}>
              <c.I className={`h-5 w-5 text-${c.color}`} />
            </div>
            <div className="font-medium">{c.t}</div>
            <div className="text-sm text-muted-foreground mt-1">{c.d}</div>
            <button className="mt-4 w-full rounded-xl bg-aurora text-primary-foreground py-2.5 text-sm font-medium shadow-glow">Contact</button>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-5">
        <Card>
          <div className="flex items-center gap-2 mb-4 font-medium"><Wind className="h-5 w-5 text-mint" /> Guided breathing · 4-7-8</div>
          <div className="aspect-square max-w-xs mx-auto relative grid place-items-center">
            <div className="absolute inset-0 rounded-full bg-aurora opacity-20 blur-2xl animate-pulse-glow" />
            <div className="relative h-48 w-48 rounded-full bg-aurora shadow-glow grid place-items-center animate-pulse-glow">
              <div className="text-center">
                <div className="font-serif text-4xl text-primary-foreground">Breathe</div>
                <div className="text-xs text-primary-foreground/80 mt-1">in · hold · out</div>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground text-center mt-4">Inhale 4s · Hold 7s · Exhale 8s · repeat 4 cycles</div>
        </Card>

        <div className="space-y-5">
          <Card>
            <div className="flex items-center gap-2 mb-3 font-medium"><Heart className="h-5 w-5 text-coral" /> 5-4-3-2-1 Grounding</div>
            <ul className="space-y-2 text-sm">
              {[
                ["5", "things you can see"],
                ["4", "things you can touch"],
                ["3", "things you can hear"],
                ["2", "things you can smell"],
                ["1", "thing you can taste"],
              ].map(([n, t]) => (
                <li key={n} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <span className="h-8 w-8 rounded-full bg-aurora grid place-items-center text-primary-foreground font-semibold">{n}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-2 text-sm">
              <WifiOff className="h-4 w-4 text-violet" />
              <span>All SOS tools are stored on your device and work without internet.</span>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
