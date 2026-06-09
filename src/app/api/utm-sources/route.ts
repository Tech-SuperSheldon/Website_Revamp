import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

function todayIST(): string {
  const now = new Date();
  const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  return ist.toISOString().slice(0, 10);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const db = await getDb();

    const doc = {
      student_name: (data.student_name ?? "").trim(),
      parent_name:  (data.parent_name  ?? "").trim(),
      phone:        (data.phone        ?? "").trim(),
      email:        (data.email        ?? "").trim().toLowerCase(),
      school:       (data.school       ?? "").trim(),
      grade:        (data.grade        ?? "").trim(),
      utm_source:   (data.utm_source   ?? "").trim(),
      utm_medium:   (data.utm_medium   ?? "").trim(),
      utm_campaign: (data.utm_campaign ?? "").trim(),
      utm_content:  (data.utm_content  ?? "").trim(),
      utm_term:     (data.utm_term     ?? "").trim(),
      source_url:   (data.source_url   ?? "").trim(),
      submitted_at: new Date(),
    };

    const result = await db.collection("utm_sources").insertOne(doc);
    return NextResponse.json({ success: true, id: result.insertedId.toString() });
  } catch (err) {
    console.error("utm-sources POST error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const docs = await db.collection("utm_sources")
      .find({})
      .sort({ submitted_at: -1 })
      .limit(1000)
      .toArray();

    const submissions = docs.map(d => ({
      ...d,
      id: d._id.toString(),
      _id: undefined,
      submitted_at: d.submitted_at?.toISOString?.() ?? d.submitted_at,
    }));

    return NextResponse.json({ submissions });
  } catch (err) {
    console.error("utm-sources GET error:", err);
    return NextResponse.json({ submissions: [] }, { status: 500 });
  }
}
