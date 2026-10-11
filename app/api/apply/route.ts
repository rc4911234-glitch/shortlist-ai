import { NextResponse } from "next/server";
import { getApplications, addApplication, CandidateApplication } from "@/lib/serverStorage";

export async function GET() {
  const applications = getApplications();
  return NextResponse.json({ success: true, applications });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.jobId || !body.fullName || !body.email) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const newApp: CandidateApplication = {
      id: body.id || `APP-${Math.floor(10000 + Math.random() * 90000)}`,
      jobId: body.jobId,
      jobTitle: body.jobTitle || "Role",
      company: body.company || "Company",
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      linkedin: body.linkedin,
      experience: body.experience || "1-3 years",
      pitch: body.pitch || "",
      resumeText: body.resumeText || "",
      submittedAt: "Just now",
      status: body.status || "submitted"
    };

    const saved = addApplication(newApp);
    return NextResponse.json({ success: true, application: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 500 });
  }
}
