import { NextRequest, NextResponse } from "next/server";
import { getAcademies, LOCALES, type Locale } from "@/lib/academies";

const LOCALE_LABEL: Record<Locale, string> = {
  global: "families around the world — including the UK, Australia, the US, the EU and New Zealand",
  uk: "families in the UK",
  au: "families in Australia",
};

/** Built fresh per request from src/lib/academies.ts — the same data the
 *  landing page's Academies section, academy pages and booking wizard read
 *  from — so Nova never drifts from what the site actually says. */
function buildKnowledgeBase(locale: Locale): string {
  const academies = getAcademies(locale);

  const academySections = academies
    .map((a) => {
      const steps = a.steps.map((s, i) => `   ${i + 1}. ${s.title} — ${s.desc}`).join("\n");
      const faqs = a.faqs.map((f) => `   Q: ${f.q}\n   A: ${f.a}`).join("\n");
      const examTable = a.examTable
        ? `\n   Also covers: ${a.examTable.rows.map((r) => `${r.exam} (${r.status}, ${r.who})`).join("; ")}`
        : "";
      return `### ${a.heading}\n   ${a.description}\n   Subjects/exams: ${a.subjects.join(", ")}${examTable}\n   How it works:\n${steps}\n   FAQs:\n${faqs}`;
    })
    .join("\n\n");

  return `
=== ABOUT SUPERSHELDON ===
SuperSheldon is a 1:1 online tutoring platform for school students, serving ${LOCALE_LABEL[locale]}.
- Every student is matched with a dedicated, vetted 1:1 tutor — every tutor goes through identity verification, background checks and a teaching demo before joining — plus a 24/7 AI tutor for instant help between lessons.
- An unlimited, level-adaptive question bank gives each child exactly the right amount of practice for their pace and goals.
- Regular diagnostics and parent-teacher meetings (PTMs) keep parents and tutors aligned on real progress.
- Scheduling is flexible across time zones. If a child doesn't click with their first tutor, SuperSheldon rematches at no extra cost, as many times as it takes.
- Plans are flexible with no long-term lock-in and can be cancelled any time.

=== THE THREE ACADEMIES ===
Everything SuperSheldon offers sits under three academies. Every path starts the same way: a free diagnostic, then a matched 1:1 tutor.

${academySections}

=== PRICING ===
There is no fixed public price list — pricing depends on the academy and plan chosen. Never invent or guess a number. If asked about cost, explain that it depends on the academy/plan and offer to book a free trial/demo so the team can share a personalised quote.

=== HOW TO BOOK A DEMO ===
Users can book a free demo session any time by asking Nova to "book a demo" (or similar — "trial", "session", "schedule", etc.). Nova will then collect, in order: which academy, the subject/exam, the child's grade/year, a mobile number, and a preferred date & time, then confirm before submitting.
`;
}

function buildSystemPrompt(locale: Locale): string {
  return `You are Nova, the friendly and knowledgeable AI assistant for SuperSheldon — a 1:1 online tutoring platform.

Your personality: warm, encouraging, clear, and concise. Use emojis sparingly to keep responses friendly.

Your role:
1. Answer questions about SuperSheldon's academies, subjects/exams, tutors and how the platform works — using only the knowledge provided below.
2. Never quote a specific price. Pricing is personalised — if asked, explain that it depends on the academy/plan and offer to help book a free trial so the team can share a quote.
3. If someone wants to book a demo or session, tell them you can help and to ask you to "book a demo" so you can collect their details.
4. Keep responses concise and easy to read. Use bullet points and bold for key info.
5. Never make up information not in the knowledge base. If unsure, say so and suggest contacting the SuperSheldon team.
6. Always stay on topic (SuperSheldon's academies, tutoring, bookings, and education generally).

${buildKnowledgeBase(locale)}

Remember: You are Nova from SuperSheldon. Be helpful, accurate, and friendly.`;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history = [], locale: rawLocale } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const locale: Locale = LOCALES.includes(rawLocale) ? rawLocale : "global";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "I'm currently unavailable. Please contact us directly or visit our demo page to book a session." },
        { status: 200 }
      );
    }

    const geminiHistory = (history as { role: string; content: string }[])
      .slice(-10)
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const payload = {
      system_instruction: {
        parts: [{ text: buildSystemPrompt(locale) }],
      },
      contents: [
        ...geminiHistory,
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600,
        topP: 0.9,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("[nova-chat] Gemini error:", errText);
      return NextResponse.json(
        { reply: "I'm having trouble right now. Please try again in a moment!" },
        { status: 200 }
      );
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[nova-chat] error:", err);
    return NextResponse.json(
      { reply: "Something went wrong. Please try again." },
      { status: 200 }
    );
  }
}
