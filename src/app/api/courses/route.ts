import { NextResponse } from "next/server";

export const revalidate = 60;

const CRM_PUBLIC_COURSES_URL =
  process.env.CRM_BACKEND_URL || "https://presales-crm-backend.supersheldon.com/api/public/courses/";

export async function GET() {
  try {
    const res = await fetch(CRM_PUBLIC_COURSES_URL, { next: { revalidate: 60 } });
    const json = await res.json().catch(() => ({ data: [] }));
    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.error("courses GET error:", err);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
