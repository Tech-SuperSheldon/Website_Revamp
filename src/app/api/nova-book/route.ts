import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, mobile, grade, subject } = await req.json();

    if (!fullName || !email || !mobile || !grade || !subject) {
      return NextResponse.json({ ok: false, message: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ ok: false, message: "Invalid email." }, { status: 400 });
    }

    const slackToken = process.env.SLACK_BOT_TOKEN;
    const slackChannel = process.env.SLACK_CHANNEL_ID;

    if (!slackToken || !slackChannel) {
      console.warn("[nova-book] Slack not configured — logging booking:", { fullName, email, mobile, grade, subject });
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
            { type: "mrkdwn", text: `:bust_in_silhouette: *Name:*\n${fullName}` },
            { type: "mrkdwn", text: `:telephone_receiver: *Phone:*\n${mobile}` },
            { type: "mrkdwn", text: `:e-mail: *Email:*\n${email}` },
            { type: "mrkdwn", text: `:books: *Subject:*\n${subject}` },
            { type: "mrkdwn", text: `:round_pushpin: *Year/Grade:*\n${grade}` },
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
