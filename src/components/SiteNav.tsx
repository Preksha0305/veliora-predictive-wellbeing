import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { getSession, signOut } from "@/lib/veliora-auth";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/digital-twin", label: "Digital Twin" },
  { to: "/therapist", label: "Therapist" },
  { to: "/community", label: "Community" },
  { to: "/awareness", label: "Awareness" },
  { to: "/sos", label: "SOS" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      <div className="glass-strong border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-lg bg-aurora animate-pulse-glow blur-md opacity-70" />
              <div className="relative h-8 w-8 rounded-lg bg-aurora shadow-glow grid place-items-center">
                <span className="text-primary-foreground font-bold text-sm">V</span>
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-semibold tracking-tight">Veliora AI</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">predictive wellness</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="px-3 py-1.5 text-sm text-muted-foreground rounded-md hover:text-foreground hover:bg-white/5 transition-colors"
                activeProps={{ className: "px-3 py-1.5 text-sm rounded-md text-foreground bg-white/5" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Offline-ready
            </span>
            <Link to="/login" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-white/5">
              Sign in
            </Link>
            <Link to="/login" className="px-4 py-2 rounded-full bg-aurora text-primary-foreground text-sm font-medium shadow-glow hover:opacity-95 transition-opacity">
              Get started
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-md hover:bg-white/5">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <nav className="lg:hidden border-t border-white/5 px-5 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-white/5">
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="mx-auto max-w-7xl px-5 py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-aurora grid place-items-center text-primary-foreground font-bold text-xs">V</div>
            <span className="font-semibold">Veliora AI</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            The world's first predictive, offline-first mental wellness co-pilot. Prevention, not reaction.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Product</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/digital-twin" className="hover:text-primary">Digital Twin</Link></li>
            <li><Link to="/therapist" className="hover:text-primary">Pocket Therapist</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Wellness Score</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Company</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/awareness" className="hover:text-primary">Awareness Hub</Link></li>
            <li><Link to="/community" className="hover:text-primary">Community</Link></li>
            <li><Link to="/sos" className="hover:text-primary">Crisis Center</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-muted-foreground">
        © 2026 Veliora AI · Built for prevention.
      </div>
    </footer>
  );
}
