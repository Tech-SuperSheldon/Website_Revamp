import { NextRequest, NextResponse } from "next/server";

const COURSE_KNOWLEDGE = `
SuperSheldon offers the following Australian courses:

=== TEST PREP COURSES ===
1. Selective School Exam Prep
   - Type: Exam Prep | Level: Intermediate to Advanced | Duration: 12 Weeks | Topics: 10
   - Description: Comprehensive preparation for Selective High School and Scholarship entry exams, covering Reading, Writing, Mathematical Reasoning and Thinking Skills.
   - Chapters: Introduction to Selective & Scholarship Exams, Reading Core Strategies, Writing & Language Conventions, Mathematical Reasoning Algebra, Problem Solving & Data Analysis, Thinking Skills & Logic, Geometry & Measurement, Time Management Techniques, Full Mock Test & Review, Final Test Day Strategies
   - Pricing: Basic Pack A$360/24 classes, Standard Pack A$672/48 classes, Premium Pack A$1152/96 classes

2. NAPLAN Prep
   - Type: Exam Prep | Level: Intermediate | Duration: 10 Weeks | Topics: 10
   - Description: Full coverage of Reading, Writing, Language Conventions, and Numeracy for the NAPLAN assessment (Years 3, 5, 7 & 9).
   - Chapters: NAPLAN Overview & Test Format, Language Conventions Grammar & Punctuation, Language Conventions Spelling, Numeracy Number & Algebra, Numeracy Measurement & Geometry, Numeracy Statistics & Probability, Reading Comprehension Strategies, Writing Narrative Texts, Writing Persuasive Texts, Full NAPLAN Practice Test
   - Pricing: Basic Pack A$360/24 classes, Standard Pack A$672/48 classes, Premium Pack A$1152/96 classes

=== GENERAL ACADEMICS ===
3. Master Math for School and Exam
   - Type: Math | Level: Beginner to Intermediate | Duration: Ongoing | Topics: 10
   - Description: From core fundamentals to advanced problem solving, tailored to your year level.
   - Chapters: Number Sense & Operations, Algebraic Thinking Basics, Geometry Essentials, Measurement & Data Analysis, Ratio & Proportional Reasoning, The Number System Deep Dive, Expressions & Equations, Functions & Modeling, Statistics & Probability, Final Math Mastery Challenge
   - Pricing: Basic Pack A$360/24 classes, Standard Pack A$672/48 classes, Premium Pack A$1152/96 classes

4. Master English for School and Exam
   - Type: English | Level: All Levels | Duration: Ongoing | Topics: 10
   - Description: Developing critical reading and analytical writing skills for academic success.
   - Chapters: Reading Comprehension Foundations, Literary Analysis Techniques, Informational Text Mastery, Grammar & Punctuation Excellence, Sentence Structure & Variation, Essay Planning & Organization, Creative Writing Workshop, Research & Citation Standards, Critical Thinking & Argument, Final Portfolio Review
   - Pricing: Basic Pack A$360/24 classes, Standard Pack A$672/48 classes, Premium Pack A$1152/96 classes

=== YEAR-BASED COURSES ===
Year 2:
5. ICAS Spark Course – Kickstart your exam journey. Ignite curiosity and build a strong foundation. Topics: 12, Duration: 22hr 30min
   Chapters: Reading Short Stories, Finding Information from Pictures, Vocabulary Common Words, Grammar Nouns/Verbs/Adjectives, Grammar Sentence Building, Spelling Simple Patterns, Writing Short Narrative, Writing Opinions, Numeracy Numbers & Addition, Numeracy Shapes & Measurement

Year 3:
6. NAPLAN Champion Course – Train like a champion, master key skills for exam success. Topics: 15, Duration: 22hr 30min
7. ICAS Smart Prep Course – Get exam-ready with structured practice. Topics: 9, Duration: 22hr 30min

Year 4:
8. ICAS Challenger Course – Strengthen problem-solving and critical thinking. Topics: 16, Duration: 22hr 30min

Year 5:
9. NAPLAN Prodigy Course – Push high achievers toward exam excellence. Topics: 15, Duration: 22hr 30min
10. ICAS Challenger Course (Year 5) – Higher-level test success. Topics: 20, Duration: 22hr 30min
11. Opportunity and Scholarship Course – Sharpen analytical skills for scholarship exams. Topics: 12, Duration: 22hr 30min

Year 6:
12. ICAS Mastermind Course – Advanced concepts and critical reasoning. Topics: 16, Duration: 22hr 30min
13. Scholarship Builder Course – Foundation for competitive exams. Topics: 24, Duration: 22hr 30min

Year 7:
14. ICAS Genius Track Course – Advanced problem-solving pathways. Topics: 12, Duration: 22hr 30min
15. NAPLAN Prodigy Course (Year 7) – Nurture young minds into high achievers. Topics: 14, Duration: 22hr 30min

Year 8:
16. ICAS Genius Track Course (Year 8) – Take skills to the next level. Topics: 12, Duration: 22hr 30min

Year 9:
17. ICAS Olympian Prep Course – International-level competition preparation. Topics: 24, Duration: 22hr 30min
18. Selective School Prep (Year 9) – Elite selective school and scholarship exam prep. Topics: 10, Duration: 22hr 30min

Year 10:
19. HSC Foundation Course – Build a strong base for senior years. Topics: 12, Duration: 22hr 30min

Year 11 & 12:
20. HSC Advanced Prep – Comprehensive HSC preparation for top ATAR results. Topics: 14, Duration: 22hr 30min

=== WHAT SUPERSHELDON PROVIDES ===
- Live 1-on-1 and group online tutoring sessions with expert Australian tutors
- Personalised learning plans tailored to each student's needs
- Interactive lessons with real-time feedback
- Weekly quizzes and assessments to track progress
- Detailed progress reports for parents
- Exam-focused strategies and mock tests
- Email and chat support from teachers
- VIP community access (Premium plan)
- Flexible scheduling to suit family timetables
- Coverage of all major Australian exams: NAPLAN, ICAS, Selective, Scholarship, HSC

=== PRICING STRUCTURE ===
All courses follow the same pricing tiers:
- Basic Pack: A$360 for 24 classes (~A$15/class)
- Standard Pack (Most Popular): A$672 for 48 classes (~A$14/class) — Best Value
- Premium Pack: A$1,152 for 96 classes (~A$12/class) — Elite, includes 1-on-1 review & VIP access

=== HOW TO BOOK ===
Users can book a free demo session by asking to book or schedule, and Nova will collect their details and send them to the SuperSheldon team.
`;

const SYSTEM_PROMPT = `You are Nova, the friendly and knowledgeable AI assistant for SuperSheldon — an Australian online tutoring platform for school students.

Your personality: warm, encouraging, clear, and concise. You use emojis sparingly to keep responses friendly.

Your role:
1. Answer questions about SuperSheldon's Australian courses — provide detailed, accurate information based on the knowledge provided.
2. If someone wants to book a demo or session, tell them you can help and to ask you to "book a demo" so you can collect their details.
3. Keep responses concise and easy to read. Use bullet points and bold for key info.
4. Never make up information not in the knowledge base. If unsure, say so and suggest contacting the SuperSheldon team.
5. Always stay on topic (courses, tutoring, bookings, education in Australia).

${COURSE_KNOWLEDGE}

Remember: You are Nova from SuperSheldon. Be helpful, accurate, and friendly.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

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
        parts: [{ text: SYSTEM_PROMPT }],
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
