export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyWebsite?: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Contract" | "Internship";
  category: "Engineering" | "Design" | "Marketing" | "Product" | "Freshers";
  experienceLevel: "Freshers (0-2 Yrs)" | "Mid-Level (2-5 Yrs)" | "Senior (5+ Yrs)";
  salary: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: "INR" | "USD";
  skills: string[];
  perks?: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  applyUrl: string;
  postedAt: string;
  featured?: boolean;
  highlighted?: boolean;
  status: "open" | "capped" | "filled";
  applicantsCount: number;
  maxApplicants: number;
  contactEmail?: string;
  employerToken?: string;
}

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
  status: "submitted" | "under_review" | "shortlisted" | "rejected";
}

export interface JobAlertSubscriber {
  id: string;
  email: string;
  phone?: string;
  role: string;
  subscribedAt: string;
}

export type JobCategory = "All" | "Engineering" | "Design" | "Marketing" | "Product" | "Freshers" | "Remote Worldwide";
export type ExperienceFilter = "All" | "Freshers (0-2 Yrs)" | "Mid-Level (2-5 Yrs)" | "Senior (5+ Yrs)";
export type CurrencyFilter = "All" | "INR" | "USD";
