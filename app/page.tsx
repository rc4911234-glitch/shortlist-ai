"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import JobCard from "@/components/JobCard";
import PostJobModal from "@/components/PostJobModal";
import AlertModal from "@/components/AlertModal";
import ApplyModal from "@/components/ApplyModal";
import MyApplicationsModal from "@/components/MyApplicationsModal";
import Footer from "@/components/Footer";
import { INITIAL_JOBS } from "@/lib/jobsData";
import { Job, JobCategory, ExperienceFilter, CurrencyFilter } from "@/lib/types";
import { Briefcase, Plus, Sparkles, Heart } from "lucide-react";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "urgency" | "salary">("latest");
  const [experienceFilter, setExperienceFilter] = useState<ExperienceFilter>("All");
  const [currencyFilter, setCurrencyFilter] = useState<CurrencyFilter>("All");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [appliedCount, setAppliedCount] = useState(0);

  // Modals state
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isMyAppsModalOpen, setIsMyAppsModalOpen] = useState(false);
  const [jobForApply, setJobForApply] = useState<Job | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Fetch jobs from backend API on mount
  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        if (data.success && Array.isArray(data.jobs) && data.jobs.length > 0) {
          setJobs(data.jobs);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadJobs();

    // Load saved jobs and applied count from localStorage
    try {
      const storedSaved = localStorage.getItem("saved_jobs_list");
      if (storedSaved) setSavedJobIds(JSON.parse(storedSaved));

      const storedApps = localStorage.getItem("my_submitted_applications");
      if (storedApps) {
        const parsed = JSON.parse(storedApps);
        if (Array.isArray(parsed)) setAppliedCount(parsed.length);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleToggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => {
      const updated = prev.includes(jobId) 
        ? prev.filter(id => id !== jobId) 
        : [...prev, jobId];
      try {
        localStorage.setItem("saved_jobs_list", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleJobPublished = (newJob: Job) => {
    setJobs(prev => [newJob, ...prev]);
  };

  const handleOpenApplyModal = (job: Job) => {
    setJobForApply(job);
    setIsApplyModalOpen(true);
  };

  const handleApplicationSubmitted = (jobId: string) => {
    setAppliedCount(prev => prev + 1);
    setJobs(prev => prev.map(j => {
      if (j.id === jobId && j.applicantsCount < j.maxApplicants) {
        const newCount = j.applicantsCount + 1;
        return { 
          ...j, 
          applicantsCount: newCount,
          status: newCount >= j.maxApplicants ? "capped" : j.status
        };
      }
      return j;
    }));
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    // Saved only filter
    if (showSavedOnly && !savedJobIds.includes(job.id)) {
      return false;
    }

    // Category match
    if (selectedCategory !== "All") {
      if (selectedCategory === "Remote Worldwide") {
        if (!job.location.toLowerCase().includes("worldwide")) return false;
      } else if (job.category !== selectedCategory) {
        return false;
      }
    }

    // Experience match
    if (experienceFilter !== "All" && job.experienceLevel !== experienceFilter) {
      return false;
    }

    // Currency match
    if (currencyFilter !== "All" && job.currency !== currencyFilter) {
      return false;
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
      return b.applicantsCount - a.applicantsCount;
    }
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-rose-600 selection:text-white">
      <Navbar
        onOpenPostJob={() => setIsPostJobModalOpen(true)}
        onOpenAlerts={() => setIsAlertModalOpen(true)}
        onOpenMyApplications={() => setIsMyAppsModalOpen(true)}
        appliedCount={appliedCount}
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
        experienceFilter={experienceFilter}
        onExperienceFilterChange={setExperienceFilter}
        currencyFilter={currencyFilter}
        onCurrencyFilterChange={setCurrencyFilter}
        showSavedOnly={showSavedOnly}
        onToggleShowSavedOnly={() => setShowSavedOnly(!showSavedOnly)}
        savedCount={savedJobIds.length}
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
                onApplyClick={handleOpenApplyModal}
                isSaved={savedJobIds.includes(job.id)}
                onToggleSave={handleToggleSaveJob}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {showSavedOnly ? "You haven't bookmarked any jobs yet" : `No Jobs Found Matching "${searchQuery}"`}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
              {showSavedOnly 
                ? "Click the heart icon on any job card to save it for easy access." 
                : "Try adjusting your filters or currency. Or be the first company to post in this category!"}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setExperienceFilter("All");
                  setCurrencyFilter("All");
                  setShowSavedOnly(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => setIsPostJobModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all"
              >
                + Post a Job
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

      <ApplyModal
        job={jobForApply}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onApplicationSubmitted={handleApplicationSubmitted}
      />

      <MyApplicationsModal
        isOpen={isMyAppsModalOpen}
        onClose={() => setIsMyAppsModalOpen(false)}
      />
    </main>
  );
}
