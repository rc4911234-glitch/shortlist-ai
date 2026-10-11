export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Contract" | "Internship";
  category: "Engineering" | "Design" | "Marketing" | "Product" | "Freshers";
  salary: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  applyUrl: string;
  postedAt: string;
  featured?: boolean;
  highlighted?: boolean;
  applicantsCount: number;
  maxApplicants: number;
  contactEmail?: string;
}

export type JobCategory = "All" | "Engineering" | "Design" | "Marketing" | "Product" | "Freshers" | "Remote Worldwide";
