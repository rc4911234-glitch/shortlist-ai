import { NextResponse } from "next/server";
import { getJobs, addJob, deleteJob } from "@/lib/serverStorage";
import { Job } from "@/lib/types";

export async function GET() {
  const jobs = getJobs();
  return NextResponse.json({ success: true, jobs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newJob: Job = {
      id: body.id || `job-${Date.now()}`,
      title: body.title,
      company: body.company,
      companyLogo: body.companyLogo,
      location: body.location || "Remote",
      type: body.type || "Full-Time",
      category: body.category || "Engineering",
      experienceLevel: body.experienceLevel || "Mid-Level (2-5 Yrs)",
      salary: body.salary || "₹18L - ₹28L / yr",
      currency: body.currency || (body.salary?.includes("$") ? "USD" : "INR"),
      skills: Array.isArray(body.skills) ? body.skills : (body.skills ? body.skills.split(",").map((s: string) => s.trim()) : []),
      perks: body.perks || ["🏝 100% Remote", "💻 Equipment Budget"],
      description: body.description || "",
      responsibilities: body.responsibilities || [],
      requirements: body.requirements || [],
      applyUrl: body.applyUrl,
      postedAt: "Just now",
      featured: Boolean(body.featured),
      highlighted: Boolean(body.highlighted),
      status: body.status || "open",
      applicantsCount: 0,
      maxApplicants: body.maxApplicants || 50,
      contactEmail: body.contactEmail || `careers@${body.company.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      employerToken: body.employerToken || `tok_${Math.random().toString(36).substring(7)}`
    };

    const saved = addJob(newJob);
    return NextResponse.json({ success: true, job: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to post job" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "Missing job ID" }, { status: 400 });

    const deleted = deleteJob(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete job" }, { status: 500 });
  }
}
