import { NextResponse } from "next/server";
import { getPlatformStats } from "@/lib/serverStorage";

export async function GET() {
  const stats = getPlatformStats();
  return NextResponse.json({ success: true, stats });
}
