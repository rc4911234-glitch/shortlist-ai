import { Job } from "./types";
import { INITIAL_JOBS } from "./jobsData";

export interface CandidateApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  fullName: string;
  email: string;
  phone?: string;
  linkedin?: string;
  experience: string;
  pitch?: string;
  resumeText: string;
  submittedAt: string;
}

// In-memory server store (persists during runtime across requests)
let serverJobs: Job[] = [...INITIAL_JOBS];
let serverApplications: CandidateApplication[] = [
  {
    id: "APP-91823",
    jobId: "job-1",
    jobTitle: "Senior Full Stack Engineer (Next.js + TypeScript)",
    company: "Cal.com",
    fullName: "Arjun Mehta",
    email: "arjun.dev@gmail.com",
    phone: "+91 98112 34567",
    linkedin: "https://linkedin.com/in/arjun-fullstack",
    experience: "3-5 years",
    pitch: "Built high-scale calendar integrations for 40k users, deep expertise in Next.js 14 App Router and Prisma.",
    resumeText: "Experienced Full Stack Engineer with 4 years building SaaS with Next.js, TypeScript, PostgreSQL.",
    submittedAt: "Today, 1:15 PM"
  },
  {
    id: "APP-82914",
    jobId: "job-2",
    jobTitle: "Backend Engineer (Go / Python Systems)",
    company: "Zerodha",
    fullName: "Sneha Nair",
    email: "sneha.systems@outlook.com",
    phone: "+91 99201 88234",
    linkedin: "https://github.com/sneha-systems",
    experience: "1-3 years",
    pitch: "Wrote high-throughput concurrent Golang microservices processing 10k req/sec on Linux.",
    resumeText: "Systems engineer passionate about Linux internals, Golang concurrency, Redis and PostgreSQL performance tuning.",
    submittedAt: "Today, 11:40 AM"
  }
];

export function getJobs(): Job[] {
  return serverJobs;
}

export function addJob(job: Job): Job {
  serverJobs = [job, ...serverJobs];
  return job;
}

export function deleteJob(id: string): boolean {
  const initialLength = serverJobs.length;
  serverJobs = serverJobs.filter(j => j.id !== id);
  return serverJobs.length < initialLength;
}

export function incrementJobApplicantCount(jobId: string): Job | null {
  const job = serverJobs.find(j => j.id === jobId);
  if (job && job.applicantsCount < job.maxApplicants) {
    job.applicantsCount += 1;
    return job;
  }
  return job || null;
}

export function getApplications(): CandidateApplication[] {
  return serverApplications;
}

export function addApplication(app: CandidateApplication): CandidateApplication {
  serverApplications = [app, ...serverApplications];
  incrementJobApplicantCount(app.jobId);
  return app;
}

export function getPlatformStats() {
  const totalJobs = serverJobs.length;
  const totalApplications = serverApplications.length;
  // Estimate revenue based on custom jobs posted (e.g. ₹1,999 base + add-ons)
  const paidJobsCount = Math.max(3, serverJobs.filter(j => j.id.startsWith("job-") && !["job-1", "job-2", "job-3", "job-4", "job-5", "job-6", "job-7", "job-8"].includes(j.id)).length + 4);
  const totalRevenueINR = (paidJobsCount * 1999) + 4496; // base + add-ons

  return {
    totalJobs,
    totalApplications,
    totalRevenueINR,
    totalRevenueUSD: Math.round(totalRevenueINR / 84),
    activeCandidatesCount: totalApplications + 148,
    averageReviewHours: "36 hrs",
  };
}
