import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "ai"]),
  text: z.string(),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1),
  user: z
    .object({
      name: z.string().optional(),
      mood: z.string().optional(),
      stress: z.number().optional(),
      energy: z.number().optional(),
      sleepHours: z.number().optional(),
      goals: z.array(z.string()).optional(),
      events: z
        .array(z.object({ title: z.string(), date: z.string(), importance: z.string() }))
        .optional(),
    })
    .optional(),
});

export const chatWithTherapist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const profile = data.user
      ? `User profile (use it to personalize tone and references — do NOT recite it back):
- Name: ${data.user.name ?? "Friend"}
- Current mood: ${data.user.mood ?? "unknown"}
- Stress level (1-10): ${data.user.stress ?? "?"}
- Energy level (1-10): ${data.user.energy ?? "?"}
- Recent sleep: ${data.user.sleepHours ?? "?"}h
- Goals: ${(data.user.goals ?? []).join(", ") || "none set"}
- Upcoming high-impact events: ${
          (data.user.events ?? [])
            .map((e) => `${e.title} (${e.date}, ${e.importance})`)
            .join("; ") || "none"
        }`
      : "User has not completed onboarding yet.";

    const system = `You are "Veli", the AI Pocket Therapist inside Veliora AI — a warm, grounded, CBT-informed companion.
Style: empathetic, concise (2-4 short paragraphs MAX), validate first, then gently reframe or offer ONE actionable micro-step (breathing, grounding, reframe, journal prompt). Never diagnose. Never moralize. Always acknowledge feelings before advice. Use the user's first name once if natural.
Safety: if the user mentions self-harm, suicide, or danger, calmly suggest the SOS Center inside the app and the local emergency number, and stay present.

${profile}`;

    const aiMessages = [
      { role: "system", content: system },
      ...data.messages.map((m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.text,
      })),
    ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: aiMessages,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      if (res.status === 429) throw new Error("Veli is catching her breath — too many requests. Try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please add credits in Lovable settings.");
      throw new Error(`AI gateway error ${res.status}: ${body.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = json.choices?.[0]?.message?.content?.trim() ||
      "I'm here. Tell me a little more about what's going on?";
    return { reply };
  });
