import { NextRequest, NextResponse } from "next/server";

// Best-effort Slack ping for a demo booked through the Nova chatbot. The lead
// itself is already saved via the same /user/bookDemo/complete endpoint the
// site-wide booking wizard uses (see NovaChatbot's confirm step) — this route
// only exists so the team gets an instant notification for chatbot-sourced
// leads specifically. Its failure must never block the booking itself.
export async function POST(req: NextRequest) {
  try {
    const { market, academy, subject, grade, mobile, date, time, timezone } = await req.json();

    if (!academy || !subject || !grade || !mobile || !date || !time) {
      return NextResponse.json({ ok: false, message: "All fields are required." }, { status: 400 });
    }

    const slackToken = process.env.SLACK_BOT_TOKEN;
    const slackChannel = process.env.SLACK_CHANNEL_ID;

    if (!slackToken || !slackChannel) {
      console.warn("[nova-book] Slack not configured — logging booking:", {
        market,
        academy,
        subject,
        grade,
        mobile,
        date,
        time,
        timezone,
      });
      return NextResponse.json({ ok: true, message: "Booking received (Slack not configured)." });
    }

    const now = new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" });

    const slackPayload = {
      channel: slackChannel,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🤖 New Booking via Nova Chatbot!",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `:mortar_board: *Academy:*\n${academy}` },
            { type: "mrkdwn", text: `:books: *Subject/Exam:*\n${subject}` },
            { type: "mrkdwn", text: `:round_pushpin: *Grade/Year:*\n${grade}` },
            { type: "mrkdwn", text: `:telephone_receiver: *Mobile:*\n${mobile}` },
            { type: "mrkdwn", text: `:calendar: *Preferred date:*\n${date}` },
            { type: "mrkdwn", text: `:clock3: *Preferred time:*\n${time}${timezone ? ` (${timezone})` : ""}` },
            { type: "mrkdwn", text: `:globe_with_meridians: *Market:*\n${market || "global"}` },
            { type: "mrkdwn", text: `:date: *Submitted:*\n${now} (AEST)` },
          ],
        },
        { type: "divider" },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: ":label: Source: *Nova Chatbot* | Status: NEW LEAD",
            },
          ],
        },
      ],
    };

    const slackRes = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${slackToken}`,
      },
      body: JSON.stringify(slackPayload),
    });

    const slackData = await slackRes.json();

    if (!slackData.ok) {
      console.error("[nova-book] Slack error:", slackData.error);
      return NextResponse.json({ ok: false, message: "Failed to send to Slack." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Booking sent successfully!" });
  } catch (err) {
    console.error("[nova-book] error:", err);
    return NextResponse.json({ ok: false, message: "Internal server error." }, { status: 500 });
  }
}
