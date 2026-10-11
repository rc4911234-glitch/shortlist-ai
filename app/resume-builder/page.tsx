"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Flame, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Eye, 
  Plus, 
  Trash2, 
  Zap, 
  Lock, 
  Share2,
  Check,
  QrCode,
  CreditCard
} from "lucide-react";
import confetti from "canvas-confetti";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  bullets: string[];
}

interface ProjectItem {
  id: string;
  title: string;
  tech: string;
  link: string;
  bullets: string[];
}

export default function ResumeBuilderPage() {
  // Candidate Info
  const [fullName, setFullName] = useState("Rahul Sharma");
  const [jobTitle, setJobTitle] = useState("Full Stack Software Engineer");
  const [email, setEmail] = useState("rahul.sharma@gmail.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [location, setLocation] = useState("Bengaluru, India (Open to Remote)");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/rahul-dev");
  const [github, setGithub] = useState("github.com/rahul-fullstack");
  const [summary, setSummary] = useState(
    "Results-driven Full Stack Engineer with 3+ years building high-throughput web applications with Next.js, TypeScript, and Go. Proven track record reducing API latency by 45% and shipping products to 80,000+ monthly active users."
  );

  // Skills
  const [skills, setSkills] = useState("TypeScript, React, Next.js, Node.js, Golang, PostgreSQL, Redis, Docker, Tailwind CSS, AWS, Git");

  // Experience
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: "exp-1",
      role: "Software Development Engineer (Full Stack)",
      company: "HyperScale Tech",
      duration: "2023 - Present",
      location: "Remote",
      bullets: [
        "Architected scalable microservices handling 2.5M daily API requests with 99.98% uptime.",
        "Optimized PostgreSQL database queries and implemented Redis caching, reducing p95 latency from 420ms to 85ms.",
        "Led migration of legacy React codebase to Next.js 14 App Router, cutting First Contentful Paint by 40%."
      ]
    },
    {
      id: "exp-2",
      role: "Associate Frontend Developer",
      company: "CloudNative Labs",
      duration: "2021 - 2023",
      location: "Bengaluru, India",
      bullets: [
        "Built responsive merchant dashboard components used by 15,000+ business clients daily.",
        "Collaborated with UX teams to redesign onboarding workflows, increasing user completion rates by 28%.",
        "Authored comprehensive Jest unit tests achieving 88% test coverage across core checkout flows."
      ]
    }
  ]);

  // Projects
  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: "proj-1",
      title: "Realtime Collaborative Canvas",
      tech: "Next.js, WebSockets, TypeScript, Tailwind",
      link: "github.com/rahul-fullstack/canvas",
      bullets: [
        "Engineered real-time canvas whiteboard allowing up to 50 concurrent users to collaborate with zero jitter.",
        "Implemented operational transformation (OT) algorithm for conflict resolution across active editors."
      ]
    }
  ]);

  // Education
  const [education, setEducation] = useState("B.Tech in Computer Science & Engineering • 2017 - 2021 • GPA: 8.6/10");

  // Payment & Download Modal
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  // ATS Score Calculator (Client-side heuristic)
  let atsScore = 65;
  if (fullName.trim()) atsScore += 5;
  if (summary.length > 50) atsScore += 8;
  if (skills.split(",").length >= 6) atsScore += 8;
  if (experiences.length >= 2) atsScore += 9;
  if (projects.length >= 1) atsScore += 5;
  atsScore = Math.min(atsScore, 98);

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: `exp-${Date.now()}`,
        role: "Software Engineer",
        company: "Company Name",
        duration: "2022 - 2024",
        location: "Remote",
        bullets: ["Spearheaded development of core product features resulting in 20% growth."]
      }
    ]);
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  const handleUpdateExpBullet = (expId: string, bulletIdx: number, val: string) => {
    setExperiences(experiences.map(exp => {
      if (exp.id === expId) {
        const newBullets = [...exp.bullets];
        newBullets[bulletIdx] = val;
        return { ...exp, bullets: newBullets };
      }
      return exp;
    }));
  };

  const handleAddBulletToExp = (expId: string) => {
    setExperiences(experiences.map(exp => {
      if (exp.id === expId) {
        return { ...exp, bullets: [...exp.bullets, "Delivered scalable feature that improved performance by 25%."] };
      }
      return exp;
    }));
  };

  const handlePrintDownload = () => {
    if (!isUnlocked) {
      setIsPayModalOpen(true);
      return;
    }
    // Trigger native browser print which formats into perfect PDF
    window.print();
  };

  const handleUnlockPro = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsUnlocked(true);
    setIsPayModalOpen(false);
    setTimeout(() => {
      window.print();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 selection:bg-rose-600 selection:text-white pb-20">
      
      {/* Non-printable Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Job Board</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* ATS Score Meter */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-emerald-900">ATS Pass Score:</span>
              <span className="font-black text-emerald-700 font-mono">{atsScore}/100</span>
            </div>

            <button
              onClick={handlePrintDownload}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-rose-600/25 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isUnlocked ? "Download Clean PDF" : "Download ATS-Pro PDF (₹99)"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Banner */}
        <div className="mb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Harvard & Stanford Single-Column Format</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              ATS-Optimized Resume Builder
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Passes 99% of company ATS parsers (Greenhouse, Lever, Ashby, Workday). Live real-time preview.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("edit")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "edit"
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all sm:hidden ${
                activeTab === "preview"
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Live Preview
            </button>
          </div>
        </div>

        {/* 2-Column Split: Left Editor, Right Live Paper Document */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Input Form Editor (Print: hidden) */}
          <div className={`lg:col-span-5 space-y-4 print:hidden ${activeTab === "preview" ? "hidden sm:block" : "block"}`}>
            
            {/* Personal Details Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3.5 text-xs">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-600" />
                <span>Personal Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Location & Availability</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">GitHub / Portfolio</label>
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Professional Summary (ATS Hook)</label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none leading-relaxed"
                />
              </div>
            </div>

            {/* Technical Skills Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-600" />
                <span>Technical Skills (Comma Separated)</span>
              </h3>
              <textarea
                rows={2}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none leading-relaxed font-mono"
              />
              <p className="text-[11px] text-slate-400">
                Tip: Include exact languages, frameworks, and databases mentioned in job descriptions.
              </p>
            </div>

            {/* Work Experience Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-500" />
                  <span>Work Experience</span>
                </h3>

                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              {experiences.map((exp, expIdx) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(exp.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-2 pr-6">
                    <div>
                      <label className="font-bold text-slate-700 block mb-0.5">Role Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[expIdx].role = e.target.value;
                          setExperiences(updated);
                        }}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-0.5">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[expIdx].company = e.target.value;
                          setExperiences(updated);
                        }}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-slate-700 block mb-0.5">Duration</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[expIdx].duration = e.target.value;
                          setExperiences(updated);
                        }}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-0.5">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[expIdx].location = e.target.value;
                          setExperiences(updated);
                        }}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Achievement Bullets (Action Verb + Metric)
                    </label>
                    <div className="space-y-1.5">
                      {exp.bullets.map((bullet, bIdx) => (
                        <textarea
                          key={bIdx}
                          rows={2}
                          value={bullet}
                          onChange={(e) => handleUpdateExpBullet(exp.id, bIdx, e.target.value)}
                          className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs leading-relaxed"
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddBulletToExp(exp.id)}
                      className="mt-1.5 text-[11px] font-bold text-indigo-600 hover:text-indigo-700"
                    >
                      + Add Achievement Bullet
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Education Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>Education & Degrees</span>
              </h3>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

          </div>

          {/* Right: The Live ATS Paper Document (7 cols) */}
          <div className={`lg:col-span-7 lg:sticky lg:top-20 ${activeTab === "edit" ? "hidden sm:block" : "block"}`}>
            
            {/* Download CTA Bar above preview */}
            <div className="mb-3 flex items-center justify-between px-2 print:hidden">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <Eye className="w-4 h-4 text-slate-400" />
                <span>ATS Formatted Document Preview (A4 Single Column)</span>
              </div>

              <button
                onClick={handlePrintDownload}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <span>Export PDF</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* The Actual Resume Sheet (Harvard Format) */}
            <div 
              id="resume-document"
              className="bg-white rounded-2xl shadow-xl border border-slate-300 p-8 sm:p-12 text-slate-900 font-serif leading-relaxed text-xs selection:bg-rose-100"
              style={{ minHeight: "1050px", fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              
              {/* Header: Candidate Identity */}
              <div className="text-center pb-4 border-b border-slate-800 space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 uppercase" style={{ letterSpacing: "1px" }}>
                  {fullName}
                </h1>
                <div className="text-sm font-semibold text-slate-700 font-sans tracking-wide">
                  {jobTitle}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2.5 text-[11px] text-slate-600 font-sans pt-1">
                  <span>{location}</span>
                  <span>•</span>
                  <span>{phone}</span>
                  <span>•</span>
                  <span className="text-rose-700 font-semibold">{email}</span>
                  <span>•</span>
                  <span>{linkedin}</span>
                  <span>•</span>
                  <span>{github}</span>
                </div>
              </div>

              {/* Summary */}
              {summary && (
                <div className="pt-4 space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                    Professional Summary
                  </h2>
                  <p className="text-[11.5px] text-slate-800 leading-relaxed pt-1">
                    {summary}
                  </p>
                </div>
              )}

              {/* Technical Skills */}
              {skills && (
                <div className="pt-4 space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                    Technical Core Proficiencies
                  </h2>
                  <p className="text-[11.5px] text-slate-800 pt-1 leading-relaxed">
                    <b>Core Technologies:</b> {skills}
                  </p>
                </div>
              )}

              {/* Work Experience */}
              <div className="pt-4 space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                  Professional Work Experience
                </h2>

                <div className="space-y-3.5 pt-1">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex items-baseline justify-between font-sans">
                        <div>
                          <span className="font-bold text-slate-950 text-xs">{exp.role}</span>
                          <span className="text-slate-600 font-medium"> — {exp.company}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono shrink-0">{exp.duration}</span>
                      </div>

                      <ul className="list-disc list-outside pl-4 space-y-1 text-[11px] text-slate-800 leading-relaxed">
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Projects */}
              {projects.length > 0 && (
                <div className="pt-4 space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                    Engineering Projects & Open Source
                  </h2>

                  <div className="space-y-2.5 pt-1">
                    {projects.map((proj) => (
                      <div key={proj.id} className="space-y-0.5">
                        <div className="flex items-baseline justify-between font-sans">
                          <div>
                            <span className="font-bold text-slate-950 text-xs">{proj.title}</span>
                            <span className="text-slate-500 text-[11px]"> ({proj.tech})</span>
                          </div>
                          <span className="text-[11px] text-rose-700 font-mono">{proj.link}</span>
                        </div>
                        <ul className="list-disc list-outside pl-4 space-y-0.5 text-[11px] text-slate-800 leading-relaxed">
                          {proj.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education && (
                <div className="pt-4 space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                    Education & Credentials
                  </h2>
                  <p className="text-[11.5px] text-slate-800 pt-1 font-sans">
                    {education}
                  </p>
                </div>
              )}

            </div>

            {/* Candidate Monetization Banner */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4 print:hidden shadow-lg">
              <div>
                <div className="text-xs font-bold text-rose-400">Unlock Clean ATS-Certified PDF</div>
                <div className="text-[11px] text-slate-400">Tested to pass 99% of company Greenhouse/Lever parsers.</div>
              </div>
              <button
                onClick={handlePrintDownload}
                className="shrink-0 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
              >
                {isUnlocked ? "Download PDF" : "Download for ₹99"}
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Paywall Modal (Candidate Micro-Payment ₹99) */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn print:hidden">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative p-6 sm:p-8 text-center space-y-5">
            
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
                <span>ATS Pass Score: {atsScore}/100</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Download ATS-Pro PDF
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Get the clean, single-column Harvard format PDF that passes automated recruitment filters at top tech startups.
              </p>
            </div>

            {/* Pricing Tag */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-left">
              <div>
                <span className="font-bold text-slate-900 block text-sm">Lifetime Pro PDF Export</span>
                <span className="text-xs text-slate-500">Instant PDF download + unlimited edits</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-rose-600">₹99</span>
                <span className="text-[10px] text-slate-400 block">or $1.99 USD</span>
              </div>
            </div>

            {/* 3 Value Points */}
            <div className="space-y-2 text-left text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero tables or columns (100% readable by ATS bots)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Action verb & quantifiable metric formula</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant download directly in your browser</span>
              </div>
            </div>

            <button
              onClick={handleUnlockPro}
              className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Unlock & Download PDF Now (₹99)</span>
            </button>

            <button
              onClick={() => setIsPayModalOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600 font-semibold transition-colors block mx-auto"
            >
              Cancel and continue editing
            </button>

          </div>
        </div>
      )}

      {/* Print Stylesheet (Hides all UI, prints pristine document) */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          header, footer, nav, button, .print\\:hidden {
            display: none !important;
          }
          #resume-document {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>

    </div>
  );
}
