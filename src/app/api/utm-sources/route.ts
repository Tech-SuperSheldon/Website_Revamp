import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BACKEND_URL = "https://presales-crm-backend.supersheldon.com/api/utm-sources";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({ success: false }));
    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.error("utm-sources POST error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const res = await fetch(BACKEND_URL, { cache: "no-store" });
    const json = await res.json().catch(() => ({ submissions: [] }));
    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.error("utm-sources GET error:", err);
    return NextResponse.json({ submissions: [] }, { status: 500 });
  }
}
