"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import JobCard from "@/components/JobCard";
import PostJobModal from "@/components/PostJobModal";
import AlertModal from "@/components/AlertModal";
import Footer from "@/components/Footer";
import { INITIAL_JOBS } from "@/lib/jobsData";
import { Job, JobCategory } from "@/lib/types";
import { Briefcase, Plus, Sparkles } from "lucide-react";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "urgency" | "salary">("latest");
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  // Load any previously posted jobs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("custom_posted_jobs");
      if (stored) {
        const parsed: Job[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setJobs([...parsed, ...INITIAL_JOBS]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleJobPublished = (newJob: Job) => {
    const updated = [newJob, ...jobs];
    setJobs(updated);
    try {
      const stored = localStorage.getItem("custom_posted_jobs");
      const prevList = stored ? JSON.parse(stored) : [];
      localStorage.setItem("custom_posted_jobs", JSON.stringify([newJob, ...prevList]));
    } catch (e) {
      console.error(e);
    }
  };

  const handleApplyClick = (job: Job) => {
    // Increment applicant count for that job locally
    setJobs(prev => prev.map(j => {
      if (j.id === job.id && j.applicantsCount < j.maxApplicants) {
        return { ...j, applicantsCount: j.applicantsCount + 1 };
      }
      return j;
    }));
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    // Category match
    if (selectedCategory !== "All") {
      if (selectedCategory === "Remote Worldwide") {
        if (!job.location.toLowerCase().includes("worldwide")) return false;
      } else if (job.category !== selectedCategory) {
        return false;
      }
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchSkills = job.skills.some(s => s.toLowerCase().includes(q));
      const matchLocation = job.location.toLowerCase().includes(q);
      if (!matchTitle && !matchCompany && !matchSkills && !matchLocation) {
        return false;
      }
    }

    return true;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "urgency") {
      // Closest to 50 cap first
      return b.applicantsCount - a.applicantsCount;
    }
    // Default: featured first, then original order
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-rose-600 selection:text-white">
      <Navbar
        onOpenPostJob={() => setIsPostJobModalOpen(true)}
        onOpenAlerts={() => setIsAlertModalOpen(true)}
      />

      <Hero
        onOpenAlerts={() => setIsAlertModalOpen(true)}
        onOpenPostJob={() => setIsPostJobModalOpen(true)}
      />

      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={sortedJobs.length}
      />

      {/* Main Job Listing Container */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {sortedJobs.length > 0 ? (
          <div className="space-y-3.5">
            {sortedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApplyClick={handleApplyClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Jobs Found Matching "{searchQuery}"</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
              Try clearing your search query or switching categories. Or be the first company to post a role in this category!
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsPostJobModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all"
              >
                + Post This Job
              </button>
            </div>
          </div>
        )}

        {/* Post a Job Floating Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Hiring Software Engineers, Designers or Marketers?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Stop Paying ₹15,000 on Naukri for 2,000 Garbage Resumes.
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Post on ZeroSpamJobs for ₹1,999 ($79). Get capped at 50 high-signal applicants, and review every single candidate with dignity.
            </p>
          </div>

          <button
            onClick={() => setIsPostJobModalOpen(true)}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Post a Job for ₹1,999</span>
          </button>
        </div>

      </section>

      <Footer />

      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        onJobPublished={handleJobPublished}
      />

      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
      />
    </main>
  );
}
