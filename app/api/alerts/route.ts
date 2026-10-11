import { NextResponse } from "next/server";
import { getAlerts, addAlert } from "@/lib/serverStorage";
import { JobAlertSubscriber } from "@/lib/types";

export async function GET() {
  const alerts = getAlerts();
  return NextResponse.json({ success: true, alerts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const subscriber: JobAlertSubscriber = {
      id: `SUB-${Date.now().toString().slice(-5)}`,
      email: body.email,
      phone: body.phone || "",
      role: body.role || "Engineering",
      subscribedAt: "Just now"
    };

    const saved = addAlert(subscriber);
    return NextResponse.json({ success: true, subscriber: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to subscribe" }, { status: 500 });
  }
}
