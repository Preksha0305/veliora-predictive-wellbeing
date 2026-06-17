import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User as UserIcon, Loader2, Eye, EyeOff } from "lucide-react";
import { signIn, signUp, resetPassword, getOnboarding } from "@/lib/veliora-auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Veliora AI" },
      { name: "description", content: "Sign in or create your Veliora AI account to access predictive wellness insights." },
    ],
  }),
  component: LoginPage,
});

type Mode = "signin" | "signup" | "forgot";

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      if (mode === "signup") {
        if (!name.trim()) throw new Error("Please enter your full name.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        if (password !== confirm) throw new Error("Passwords do not match.");
        const user = signUp(name, email, password);
        navigate({ to: "/onboarding" });
        void user;
      } else if (mode === "signin") {
        const user = signIn(email, password, remember);
        const done = getOnboarding(user.id);
        navigate({ to: done ? "/dashboard" : "/onboarding" });
      } else {
        if (password.length < 6) throw new Error("New password must be at least 6 characters.");
        resetPassword(email, password);
        setInfo("Password updated. You can now sign in.");
        setMode("signin");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] grid place-items-center px-4 py-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute top-10 left-1/4 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-accent/30 blur-3xl animate-pulse-glow" />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Secure on-device session
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            {mode === "signup" ? "Create your account" : mode === "forgot" ? "Reset password" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signup"
              ? "Begin your predictive wellness journey with Veliora AI."
              : mode === "forgot"
                ? "Enter your email and choose a new password."
                : "Sign in to continue to your wellness dashboard."}
          </p>
        </div>

        <form onSubmit={onSubmit} className="glass-strong rounded-2xl p-6 border border-white/10 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {mode === "signup" && (
            <Field icon={<UserIcon className="h-4 w-4" />} label="Full name">
              <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Ada Lovelace" className="bg-transparent w-full outline-none text-sm" />
            </Field>
          )}

          <Field icon={<Mail className="h-4 w-4" />} label="Email">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@domain.com" className="bg-transparent w-full outline-none text-sm" />
          </Field>

          <Field icon={<Lock className="h-4 w-4" />} label={mode === "forgot" ? "New password" : "Password"}>
            <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="bg-transparent w-full outline-none text-sm" />
            <button type="button" onClick={() => setShowPw((v) => !v)} className="text-muted-foreground hover:text-foreground">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </Field>

          {mode === "signup" && (
            <Field icon={<Lock className="h-4 w-4" />} label="Confirm password">
              <input type={showPw ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} required placeholder="••••••••" className="bg-transparent w-full outline-none text-sm" />
            </Field>
          )}

          {mode === "signin" && (
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-transparent accent-[hsl(var(--primary))]" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button type="button" onClick={() => { setMode("forgot"); setError(null); setInfo(null); }} className="text-primary hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          {error && <div className="text-sm text-[hsl(var(--coral))] bg-[hsl(var(--coral)/0.1)] border border-[hsl(var(--coral)/0.3)] rounded-lg px-3 py-2">{error}</div>}
          {info && <div className="text-sm text-[hsl(var(--mint))] bg-[hsl(var(--mint)/0.1)] border border-[hsl(var(--mint)/0.3)] rounded-lg px-3 py-2">{info}</div>}

          <button disabled={loading} type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-aurora text-primary-foreground py-2.5 font-medium shadow-glow hover:opacity-95 transition-opacity disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signup" ? "Create account" : mode === "forgot" ? "Update password" : "Sign in"}
          </button>

          <div className="text-center text-sm text-muted-foreground">
            {mode === "signin" && (
              <>New to Veliora AI?{" "}
                <button type="button" onClick={() => { setMode("signup"); setError(null); }} className="text-primary hover:underline">Create an account</button>
              </>
            )}
            {mode === "signup" && (
              <>Already have an account?{" "}
                <button type="button" onClick={() => { setMode("signin"); setError(null); }} className="text-primary hover:underline">Sign in</button>
              </>
            )}
            {mode === "forgot" && (
              <button type="button" onClick={() => { setMode("signin"); setError(null); }} className="text-primary hover:underline">Back to sign in</button>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to Veliora AI's <Link to="/" className="underline hover:text-foreground">terms</Link> and privacy commitment.
        </p>
      </div>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 focus-within:border-primary/60 transition-colors">
        <span className="text-muted-foreground">{icon}</span>
        {children}
      </div>
    </label>
  );
}
