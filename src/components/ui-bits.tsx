import { type ReactNode } from "react";

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-5 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
      <span className="h-px w-6 bg-gradient-to-r from-primary to-accent" />
      {children}
    </span>
  );
}

export function StatPill({ label, value, tone = "mint" }: { label: string; value: string; tone?: "mint" | "violet" | "amber" | "coral" }) {
  const tones: Record<string, string> = {
    mint: "from-mint/20 to-mint/5 text-mint border-mint/30",
    violet: "from-violet/20 to-violet/5 text-violet border-violet/30",
    amber: "from-amber/20 to-amber/5 text-amber border-amber/30",
    coral: "from-coral/20 to-coral/5 text-coral border-coral/30",
  };
  return (
    <div className={`rounded-2xl border bg-gradient-to-br ${tones[tone]} px-4 py-3`}>
      <div className="text-[10px] uppercase tracking-widest opacity-70">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-3xl p-6 shadow-card ${className}`}>
      {children}
    </div>
  );
}

export function GradientRing({ value, size = 180, label }: { value: number; size?: number; label?: string }) {
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.82 0.16 165)" />
            <stop offset="100%" stopColor="oklch(0.72 0.17 305)" />
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth="10" fill="none" />
        <circle
          cx={size/2} cy={size/2} r={r}
          stroke="url(#ringGrad)" strokeWidth="10" fill="none"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-4xl font-semibold text-gradient">{value}</div>
          {label && <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</div>}
        </div>
      </div>
    </div>
  );
}

export function Sparkline({ data, color = "oklch(0.82 0.16 165)", height = 60 }: { data: number[]; color?: string; height?: number }) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = Math.max(max - min, 1);
  const w = 280;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((d - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  }).join(" ");
  const area = `0,${height} ${points} ${w},${height}`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#spark-${color})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RiskBar({ label, level, value }: { label: string; level: "Low" | "Medium" | "High" | "Critical"; value: number }) {
  const colors = {
    Low: "from-mint to-mint/60",
    Medium: "from-amber to-amber/60",
    High: "from-coral to-coral/60",
    Critical: "from-destructive to-coral",
  };
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span>{label}</span>
        <span className="text-xs text-muted-foreground">{level} · {value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div className={`h-full rounded-full bg-gradient-to-r ${colors[level]}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
