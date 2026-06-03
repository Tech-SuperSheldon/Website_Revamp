import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const country = data.get("country") as string;
    const subject = data.get("subject") as string;
    const experience = data.get("experience") as string;
    const cvFile = data.get("cv") as File | null;

    if (!name || !email || !subject || !experience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Build plain-text email body for forwarding
    const lines = [
      `New Teaching Application`,
      `---`,
      `Name:       ${name}`,
      `Email:      ${email}`,
      `Country:    ${country}`,
      `Subject:    ${subject}`,
      `Experience: ${experience}`,
      cvFile ? `CV:         ${cvFile.name} (${Math.round(cvFile.size / 1024)}KB attached)` : `CV:         Not provided`,
    ];

    // If SMTP env vars are set, send via nodemailer; otherwise log for dev
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      const nodemailer = await import("nodemailer");
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      const attachments: { filename: string; content: Buffer }[] = [];
      if (cvFile) {
        const buf = await cvFile.arrayBuffer();
        attachments.push({ filename: cvFile.name, content: Buffer.from(buf) });
      }

      await transport.sendMail({
        from: `"SuperSheldon Applications" <${process.env.SMTP_USER}>`,
        to: "curriculum@supersheldon.com",
        replyTo: email,
        subject: `New Application: ${name} — ${subject} (${country})`,
        text: lines.join("\n"),
        attachments,
      });
    } else {
      // Dev fallback — log to console
      console.log("[apply]", lines.join("\n"));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[apply] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
