import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

function todayIST(): string {
  const now = new Date();
  const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  return ist.toISOString().slice(0, 10);
}

export async function GET() {
  try {
    const db = await getDb();
    const date = todayIST();
    const doc = await db.collection("webinar_schools").findOne({ date });
    return NextResponse.json({ schools: doc?.schools ?? [] });
  } catch (err) {
    console.error("webinar/schools GET error:", err);
    return NextResponse.json({ schools: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { school } = await request.json();
    const trimmed = (school ?? "").trim();
    if (!trimmed) return NextResponse.json({ schools: [] });

    const db = await getDb();
    const date = todayIST();

    await db.collection("webinar_schools").updateOne(
      { date },
      {
        $addToSet: { schools: trimmed },
        $setOnInsert: { created_at: new Date() },
      },
      { upsert: true }
    );

    const doc = await db.collection("webinar_schools").findOne({ date });
    return NextResponse.json({ schools: doc?.schools ?? [trimmed] });
  } catch (err) {
    console.error("webinar/schools POST error:", err);
    return NextResponse.json({ schools: [] });
  }
}
