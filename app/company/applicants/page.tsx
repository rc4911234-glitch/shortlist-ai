"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Building2, 
  Users, 
  Mail, 
  Phone, 
  Linkedin, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowLeft, 
  Search, 
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import { Job, CandidateApplication } from "@/lib/types";

export default function EmployerApplicantsPortal() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          fetch("/api/jobs"),
          fetch("/api/apply")
        ]);
        const jobsData = await jobsRes.json();
        const appsData = await appsRes.json();

        if (jobsData.success && jobsData.jobs.length > 0) {
          setJobs(jobsData.jobs);
          setSelectedJobId(jobsData.jobs[0].id);
        }
        if (appsData.success) {
          setApplications(appsData.applications);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const currentJob = jobs.find(j => j.id === selectedJobId) || jobs[0];
  const jobApplications = applications.filter(a => a.jobId === selectedJobId);

  const handleUpdateStatus = (appId: string, newStatus: CandidateApplication["status"]) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
  };

  const filteredApps = jobApplications.filter(a => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return a.fullName.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.experience.toLowerCase().includes(q);
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-600 selection:text-white">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Job Board</span>
            </Link>

            <div>
              <h1 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-rose-600" />
                <span>Employer Hiring Review Dashboard</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>50-Cap Human Review Policy</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Job Selector Dropdown / Pills */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
            Select Your Active Job Posting:
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {jobs.map(j => (
              <button
                key={j.id}
                onClick={() => setSelectedJobId(j.id)}
                className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all text-left border ${
                  selectedJobId === j.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className="font-bold">{j.title}</div>
                <div className="text-[11px] opacity-80 mt-0.5">{j.company} • {j.applicantsCount}/{j.maxApplicants} applied</div>
              </button>
            ))}
          </div>
        </div>

        {/* Candidate Stats for Selected Job */}
        {currentJob && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Applicants Received</span>
              <div className="text-3xl font-black text-slate-900 mt-1">
                {currentJob.applicantsCount} / {currentJob.maxApplicants}
              </div>
              <div className="text-xs text-rose-600 font-semibold mt-1">
                {currentJob.maxApplicants - currentJob.applicantsCount} spots remaining before automatic freeze
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Compensation Listed</span>
              <div className="text-2xl font-black text-emerald-700 mt-1">
                {currentJob.salary}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Location: {currentJob.location}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Review Status</span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {jobApplications.filter(a => a.status === "shortlisted").length} Shortlisted
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {jobApplications.filter(a => a.status === "under_review").length} Awaiting Initial Review
              </div>
            </div>
          </div>
        )}

        {/* Candidate List Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-rose-600" />
            <span>Candidates Applied for this Role ({jobApplications.length})</span>
          </h2>

          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate name or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
        </div>

        {/* Candidate Cards Grid */}
        {filteredApps.length > 0 ? (
          <div className="space-y-4">
            {filteredApps.map((candidate) => (
              <div key={candidate.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-slate-900">{candidate.fullName}</span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {candidate.id}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        candidate.status === "shortlisted" 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                          : candidate.status === "rejected" 
                          ? "bg-rose-50 text-rose-700 border border-rose-200" 
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {candidate.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Experience: <b className="text-slate-800">{candidate.experience}</b> • Applied: {candidate.submittedAt}
                    </div>
                  </div>

                  {/* Quick Decision Buttons for Employer */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateStatus(candidate.id, "shortlisted")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                        candidate.status === "shortlisted"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Shortlist for Interview</span>
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(candidate.id, "rejected")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                        candidate.status === "rejected"
                          ? "bg-rose-600 text-white shadow-sm"
                          : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Pass</span>
                    </button>
                  </div>
                </div>

                {/* Candidate Contact & Profile Links */}
                <div className="flex flex-wrap items-center gap-4 text-xs mb-4">
                  <a
                    href={`mailto:${candidate.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200"
                  >
                    <Mail className="w-3.5 h-3.5 text-rose-600" />
                    <span>Email: {candidate.email}</span>
                  </a>

                  {candidate.phone && (
                    <a
                      href={`https://wa.me/${candidate.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Candidate</span>
                    </a>
                  )}

                  {candidate.linkedin && (
                    <a
                      href={candidate.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold border border-blue-200"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Candidate Pitch */}
                {candidate.pitch && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 mb-3">
                    <span className="font-bold text-slate-900 block mb-0.5">Why they are a fit:</span>
                    "{candidate.pitch}"
                  </div>
                )}

                {/* Resume preview */}
                <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200 text-xs font-mono text-slate-600">
                  <span className="font-bold text-slate-900 font-sans block mb-0.5">Resume / Qualifications:</span>
                  {candidate.resumeText}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <Clock className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-slate-900">No Applications Received Yet for this Role</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Applications will appear here in real time as candidates submit 1-Click applications.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
