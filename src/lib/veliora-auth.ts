// Lightweight client-side auth + onboarding store for Veliora AI demo.
// Offline-first, no backend required. Data persists in localStorage.

const USERS_KEY = "veliora.users";
const SESSION_KEY = "veliora.session";
const ONBOARDING_KEY = "veliora.onboarding";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string; // demo only — never do this in production
  createdAt: string;
};

export type OnboardingEvent = {
  id: string;
  title: string;
  date: string;
  importance: "Low" | "Medium" | "High";
  type: string;
};

export type OnboardingData = {
  mood: string;
  moodIntensity: number;
  moodNote: string;
  sleepHours: number;
  bedtime: string;
  wakeTime: string;
  sleepQuality: number;
  events: OnboardingEvent[];
  stress: number;
  energy: number;
  motivation: number;
  goals: string[];
  completedAt: string;
};

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeUsers(u: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(u));
}

export function getSession(): { userId: string; name: string; email: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function signUp(name: string, email: string, password: string) {
  const users = readUsers();
  const lower = email.trim().toLowerCase();
  if (users.find((u) => u.email === lower)) {
    throw new Error("An account with this email already exists.");
  }
  const user: StoredUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: lower,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ userId: user.id, name: user.name, email: user.email }),
  );
  return user;
}

export function signIn(email: string, password: string, remember: boolean) {
  const users = readUsers();
  const lower = email.trim().toLowerCase();
  const user = users.find((u) => u.email === lower && u.password === password);
  if (!user) throw new Error("Invalid email or password.");
  const session = { userId: user.id, name: user.name, email: user.email };
  if (remember) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return user;
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

export function getOnboarding(userId: string): OnboardingData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${ONBOARDING_KEY}.${userId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveOnboarding(userId: string, data: OnboardingData) {
  localStorage.setItem(`${ONBOARDING_KEY}.${userId}`, JSON.stringify(data));
}

export function resetPassword(email: string, newPassword: string) {
  const users = readUsers();
  const lower = email.trim().toLowerCase();
  const user = users.find((u) => u.email === lower);
  if (!user) throw new Error("No account found for that email.");
  user.password = newPassword;
  writeUsers(users);
}
