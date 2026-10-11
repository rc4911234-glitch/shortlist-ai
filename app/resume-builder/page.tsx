"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Eye, 
  Plus, 
  Trash2, 
  Check, 
  Palette, 
  Layout, 
  Search, 
  X, 
  Grid,
  Code
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  RESUME_TEMPLATES_100,
  COLOR_PALETTES,
  FONT_OPTIONS,
  ResumeTemplate,
  LayoutBlueprint,
  FontStyle,
  SpacingDensity
} from "@/lib/resume-templates";

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

  // 100 Templates Engine
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("tech-01");
  const [activeAccent, setActiveAccent] = useState<string>("#e11d48");
  const [activeFont, setActiveFont] = useState<FontStyle>("sans");
  const [activeDensity, setActiveDensity] = useState<SpacingDensity>("normal");

  // Gallery Modal
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryCategory, setGalleryCategory] = useState<string>("All");
  const [gallerySearch, setGallerySearch] = useState<string>("");

  // Payment & Download Modal
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const currentTemplate: ResumeTemplate = 
    RESUME_TEMPLATES_100.find((t) => t.id === selectedTemplateId) || RESUME_TEMPLATES_100[0];

  const handleSelectTemplate = (tmpl: ResumeTemplate) => {
    setSelectedTemplateId(tmpl.id);
    setActiveAccent(tmpl.accentHex);
    setActiveFont(tmpl.font);
    setActiveDensity(tmpl.density);
    setIsGalleryOpen(false);
  };

  const filteredTemplates = RESUME_TEMPLATES_100.filter((t) => {
    const matchesCategory = galleryCategory === "All" || t.category === galleryCategory;
    const matchesSearch = 
      t.name.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      t.roleTag.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      t.description.toLowerCase().includes(gallerySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Typography helper
  const getFontFamily = (font: FontStyle) => {
    switch (font) {
      case "serif":
        return "'Georgia', 'Times New Roman', serif";
      case "editorial":
        return "'Garamond', 'Baskerville', serif";
      case "mono":
        return "'Courier New', monospace";
      case "sans":
      default:
        return "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    }
  };

  // Density padding helper
  const getDensityPadding = (density: SpacingDensity) => {
    switch (density) {
      case "compact":
        return "p-6 sm:p-7";
      case "spacious":
        return "p-9 sm:p-12";
      case "normal":
      default:
        return "p-8 sm:p-10";
    }
  };

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
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  const handleUpdateExpBullet = (expId: string, bulletIdx: number, val: string) => {
    setExperiences(experiences.map((exp) => {
      if (exp.id === expId) {
        const newBullets = [...exp.bullets];
        newBullets[bulletIdx] = val;
        return { ...exp, bullets: newBullets };
      }
      return exp;
    }));
  };

  const handleAddBulletToExp = (expId: string) => {
    setExperiences(experiences.map((exp) => {
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
        <div className="mb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>100+ Role-Specific ATS-Certified Templates</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              ATS-Optimized Resume Builder
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Passes 99% of company ATS parsers (Greenhouse, Lever, Ashby, Workday). Pick from 100+ curated presets below or customize live.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <Grid className="w-4 h-4" />
              <span>Browse 100+ Templates</span>
            </button>
            <button
              onClick={() => setActiveTab("edit")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all sm:hidden ${
                activeTab === "edit"
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all sm:hidden ${
                activeTab === "preview"
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Template Hub & Customizer Bar (Print: hidden) */}
        <div className="mb-6 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm print:hidden space-y-4">
          
          {/* Top Row: Active Template Info + Browse Button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm"
                style={{ backgroundColor: activeAccent }}
              >
                {currentTemplate.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-slate-900 text-sm">{currentTemplate.name}</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {currentTemplate.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    {currentTemplate.roleTag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Blueprint: <strong className="text-slate-700 uppercase font-mono">{currentTemplate.blueprint}</strong> • {currentTemplate.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsGalleryOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition-all shadow-sm shrink-0"
            >
              <Layout className="w-3.5 h-3.5 text-rose-400" />
              <span>Change Template (100 Available)</span>
            </button>
          </div>

          {/* Quick Preset Selector Chips */}
          <div>
            <div className="text-[11px] font-bold text-slate-500 mb-2 flex items-center justify-between">
              <span>Quick Featured Presets:</span>
              <button 
                onClick={() => setIsGalleryOpen(true)}
                className="text-rose-600 hover:text-rose-700 text-[11px] font-bold"
              >
                View all 100 templates →
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "tech-01",
                "tech-02",
                "exec-01",
                "fin-01",
                "fin-03",
                "fresh-01",
                "prod-01",
              ].map((id) => {
                const t = RESUME_TEMPLATES_100.find((item) => item.id === id);
                if (!t) return null;
                const isSelected = selectedTemplateId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTemplate(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                      isSelected
                        ? "border-rose-600 bg-rose-50 text-rose-700 ring-2 ring-rose-500/20 shadow-xs"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: t.accentHex }}
                    />
                    <span>{t.name}</span>
                    {isSelected && <Check className="w-3 h-3 text-rose-600 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Customizer Controls */}
          <div className="pt-2 border-t border-slate-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs">
            {/* 10 Accent Color Palettes */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-600 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-slate-400" />
                <span>Theme Accent:</span>
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {COLOR_PALETTES.map((color) => {
                  const isActive = activeAccent.toLowerCase() === color.hex.toLowerCase();
                  return (
                    <button
                      key={color.name}
                      onClick={() => setActiveAccent(color.hex)}
                      title={color.name}
                      className={`w-6 h-6 rounded-full transition-transform flex items-center justify-center relative ${
                        isActive ? "scale-125 ring-2 ring-slate-900 shadow-xs" : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isActive && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Typography Engine */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600">Font:</span>
              <select
                value={activeFont}
                onChange={(e) => setActiveFont(e.target.value as FontStyle)}
                className="bg-slate-50 border border-slate-200 font-bold text-slate-800 text-xs px-2.5 py-1 rounded-xl outline-none focus:ring-2 focus:ring-rose-500"
              >
                {FONT_OPTIONS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.description})
                  </option>
                ))}
              </select>
            </div>

            {/* Density */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-600">Density:</span>
              <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                {(["compact", "normal", "spacious"] as SpacingDensity[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setActiveDensity(d)}
                    className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold capitalize transition-all ${
                      activeDensity === d ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

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

            {/* Core Skills Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-600" />
                <span>Technical Skills & Core Proficiencies</span>
              </h3>
              <p className="text-slate-500 text-[11px]">
                Separate skills with commas. Match keywords from the job description for 95%+ ATS matching.
              </p>
              <textarea
                rows={2}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none font-mono text-xs"
              />
            </div>

            {/* Work Experiences */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-rose-600" />
                  <span>Work Experience</span>
                </h3>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              {experiences.map((exp, expIdx) => (
                <div key={exp.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(exp.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete role"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pr-6">
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
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white font-semibold text-xs"
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                      Achievement Bullets (Action Verb + Quantifiable Metric)
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
                      className="mt-1.5 text-[11px] font-bold text-rose-600 hover:text-rose-700"
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
                <span>Education & Credentials</span>
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
                <span>
                  Template: <strong className="text-slate-800">{currentTemplate.name}</strong>
                </span>
                <span className="hidden sm:inline text-slate-400 font-mono">({currentTemplate.blueprint})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl shadow-xs transition-colors"
                >
                  <span>100+ Templates</span>
                </button>

                <button
                  onClick={handlePrintDownload}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 bg-white px-3 py-1 rounded-xl border border-rose-200 hover:border-rose-300 shadow-xs transition-all hover:scale-105"
                >
                  <span>Export PDF</span>
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* DYNAMIC #resume-document ACCORDING TO BLUEPRINT */}
            <div 
              id="resume-document"
              className={`bg-white rounded-2xl shadow-xl border border-slate-300 ${getDensityPadding(activeDensity)} text-slate-900 selection:bg-rose-100 ${
                currentTemplate.blueprint === "executive" ? "border-t-8" : ""
              }`}
              style={{ 
                minHeight: "1050px", 
                fontFamily: getFontFamily(activeFont),
                borderTopColor: currentTemplate.blueprint === "executive" ? activeAccent : undefined
              }}
            >
              
              {/* HEADER LAYOUT: HARVARD / EDITORIAL (Centered) */}
              {(currentTemplate.blueprint === "harvard" || currentTemplate.blueprint === "editorial") && (
                <div className="text-center pb-4 border-b border-slate-800 space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 uppercase" style={{ letterSpacing: "1.5px" }}>
                    {fullName}
                  </h1>
                  <div className="text-sm font-semibold tracking-wide" style={{ color: activeAccent }}>
                    {jobTitle}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2.5 text-[11px] text-slate-600 pt-1 font-sans">
                    <span>{location}</span>
                    <span>•</span>
                    <span>{phone}</span>
                    <span>•</span>
                    <span className="font-semibold" style={{ color: activeAccent }}>{email}</span>
                    <span>•</span>
                    <span>{linkedin}</span>
                    <span>•</span>
                    <span>{github}</span>
                  </div>
                </div>
              )}

              {/* HEADER LAYOUT: SILICON / TECHNICAL (Modern Left Aligned with Pill) */}
              {(currentTemplate.blueprint === "silicon" || currentTemplate.blueprint === "technical") && (
                <div className="pb-4 border-b-2 border-slate-200 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                        {fullName}
                      </h1>
                      <div 
                        className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold mt-1 border"
                        style={{ 
                          borderColor: `${activeAccent}40`, 
                          color: activeAccent, 
                          backgroundColor: `${activeAccent}0D` 
                        }}
                      >
                        {jobTitle}
                      </div>
                    </div>
                    <div className="self-start sm:self-auto px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                      {location}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 pt-1 font-sans">
                    <span className="font-medium text-slate-900">{phone}</span>
                    <span>•</span>
                    <span className="font-bold" style={{ color: activeAccent }}>{email}</span>
                    <span>•</span>
                    <span className="text-slate-700 font-medium">{linkedin}</span>
                    <span>•</span>
                    <span className="text-slate-700 font-medium">{github}</span>
                  </div>
                </div>
              )}

              {/* HEADER LAYOUT: EXECUTIVE (Authoritative Slate Contrast) */}
              {currentTemplate.blueprint === "executive" && (
                <div className="pb-4 space-y-1.5 border-b-2" style={{ borderColor: activeAccent }}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 uppercase">
                      {fullName}
                    </h1>
                    <div className="text-xs font-black tracking-widest text-slate-500 uppercase">
                      {jobTitle}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-600 pt-1 font-medium font-sans">
                    <span>{location}</span>
                    <span>•</span>
                    <span>{phone}</span>
                    <span>•</span>
                    <span className="font-bold" style={{ color: activeAccent }}>{email}</span>
                    <span>•</span>
                    <span>{linkedin}</span>
                    <span>•</span>
                    <span>{github}</span>
                  </div>
                </div>
              )}

              {/* HEADER LAYOUT: COMPACT (Ultra High Density 1-Page) */}
              {currentTemplate.blueprint === "compact" && (
                <div className="border-b border-slate-300 pb-2 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
                      {fullName}
                    </h1>
                    <div className="text-xs font-bold" style={{ color: activeAccent }}>
                      {jobTitle}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[10px] text-slate-600 pt-0.5 font-sans">
                    <span>{location}</span>
                    <span>•</span>
                    <span>{phone}</span>
                    <span>•</span>
                    <span className="font-bold" style={{ color: activeAccent }}>{email}</span>
                    <span>•</span>
                    <span>{linkedin}</span>
                    <span>•</span>
                    <span>{github}</span>
                  </div>
                </div>
              )}

              {/* HEADER LAYOUT: MINIMAL / METRO */}
              {(currentTemplate.blueprint === "minimal" || currentTemplate.blueprint === "metro") && (
                <div 
                  className={`pb-3 space-y-1.5 ${
                    currentTemplate.blueprint === "metro" ? "p-3 rounded-xl border-l-4 mb-3" : "border-b border-slate-200"
                  }`}
                  style={{
                    backgroundColor: currentTemplate.blueprint === "metro" ? `${activeAccent}08` : undefined,
                    borderLeftColor: currentTemplate.blueprint === "metro" ? activeAccent : undefined
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                      {fullName}
                    </h1>
                    <span className="text-xs font-bold" style={{ color: activeAccent }}>{jobTitle}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 text-[11px] text-slate-600 font-sans">
                    <span>{location}</span>
                    <span>•</span>
                    <span>{phone}</span>
                    <span>•</span>
                    <span className="font-semibold" style={{ color: activeAccent }}>{email}</span>
                    <span>•</span>
                    <span>{linkedin}</span>
                  </div>
                </div>
              )}

              {/* SECTION 1: PROFESSIONAL SUMMARY */}
              {summary && (
                <div className={`pt-3.5 space-y-1 ${activeDensity === "compact" ? "pt-2 space-y-0.5" : ""}`}>
                  <h2 
                    className={`text-xs font-black uppercase tracking-wider text-slate-900 pb-0.5 ${
                      currentTemplate.blueprint === "silicon" || currentTemplate.blueprint === "technical"
                        ? "border-l-4 pl-2" 
                        : "border-b border-slate-300"
                    }`}
                    style={{
                      borderLeftColor: (currentTemplate.blueprint === "silicon" || currentTemplate.blueprint === "technical") ? activeAccent : undefined,
                      borderBottomColor: currentTemplate.blueprint === "executive" ? activeAccent : undefined
                    }}
                  >
                    Professional Summary
                  </h2>
                  <p className={`text-[11.5px] text-slate-800 leading-relaxed ${activeDensity === "compact" ? "text-[10px] leading-snug" : ""}`}>
                    {summary}
                  </p>
                </div>
              )}

              {/* SECTION 2: TECHNICAL SKILLS */}
              {skills && (
                <div className={`pt-3.5 space-y-1 ${activeDensity === "compact" ? "pt-2 space-y-0.5" : ""}`}>
                  <h2 
                    className={`text-xs font-black uppercase tracking-wider text-slate-900 pb-0.5 ${
                      currentTemplate.blueprint === "silicon" || currentTemplate.blueprint === "technical"
                        ? "border-l-4 pl-2" 
                        : "border-b border-slate-300"
                    }`}
                    style={{
                      borderLeftColor: (currentTemplate.blueprint === "silicon" || currentTemplate.blueprint === "technical") ? activeAccent : undefined,
                      borderBottomColor: currentTemplate.blueprint === "executive" ? activeAccent : undefined
                    }}
                  >
                    Core Technical Proficiencies
                  </h2>
                  <p className={`text-[11.5px] text-slate-800 leading-relaxed ${activeDensity === "compact" ? "text-[10px]" : ""}`}>
                    <strong className="text-slate-950 font-bold">Key Technologies: </strong>
                    <span>{skills}</span>
                  </p>
                </div>
              )}

              {/* SECTION 3: WORK EXPERIENCE */}
              <div className={`pt-3.5 space-y-2 ${activeDensity === "compact" ? "pt-2 space-y-1" : ""}`}>
                <h2 
                  className={`text-xs font-black uppercase tracking-wider text-slate-900 pb-0.5 ${
                    currentTemplate.blueprint === "silicon" || currentTemplate.blueprint === "technical"
                      ? "border-l-4 pl-2" 
                      : "border-b border-slate-300"
                  }`}
                  style={{
                    borderLeftColor: (currentTemplate.blueprint === "silicon" || currentTemplate.blueprint === "technical") ? activeAccent : undefined,
                    borderBottomColor: currentTemplate.blueprint === "executive" ? activeAccent : undefined
                  }}
                >
                  Work Experience
                </h2>

                <div className={`space-y-3.5 pt-0.5 ${activeDensity === "compact" ? "space-y-2" : ""}`}>
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex items-baseline justify-between font-sans">
                        <div>
                          <span className="font-bold text-slate-950 text-xs">{exp.role}</span>
                          <span className="text-slate-600 font-medium text-xs"> — {exp.company}</span>
                          {exp.location && (
                            <span className="text-slate-400 text-[10.5px] ml-1">({exp.location})</span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono shrink-0">{exp.duration}</span>
                      </div>

                      <ul className={`list-disc list-outside pl-4 text-slate-800 ${
                        activeDensity === "compact" ? "space-y-0.5 text-[10px] leading-snug" : "space-y-1 text-[11px] leading-relaxed"
                      }`}>
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: KEY PROJECTS */}
              {projects.length > 0 && (
                <div className={`pt-3.5 space-y-2 ${activeDensity === "compact" ? "pt-2 space-y-1" : ""}`}>
                  <h2 
                    className={`text-xs font-black uppercase tracking-wider text-slate-900 pb-0.5 ${
                      currentTemplate.blueprint === "silicon" || currentTemplate.blueprint === "technical"
                        ? "border-l-4 pl-2" 
                        : "border-b border-slate-300"
                    }`}
                    style={{
                      borderLeftColor: (currentTemplate.blueprint === "silicon" || currentTemplate.blueprint === "technical") ? activeAccent : undefined,
                      borderBottomColor: currentTemplate.blueprint === "executive" ? activeAccent : undefined
                    }}
                  >
                    Engineering Projects & Open Source
                  </h2>

                  <div className={`space-y-2.5 pt-0.5 ${activeDensity === "compact" ? "space-y-1.5" : ""}`}>
                    {projects.map((proj) => (
                      <div key={proj.id} className="space-y-0.5">
                        <div className="flex items-baseline justify-between font-sans">
                          <div>
                            <span className="font-bold text-slate-950 text-xs">{proj.title}</span>
                            <span className="text-slate-500 text-[11px] font-mono ml-1.5">({proj.tech})</span>
                          </div>
                          <span className="text-[11px] font-mono font-bold" style={{ color: activeAccent }}>
                            {proj.link}
                          </span>
                        </div>
                        <ul className={`list-disc list-outside pl-4 text-slate-800 ${
                          activeDensity === "compact" ? "space-y-0.5 text-[10px] leading-snug" : "space-y-0.5 text-[11px] leading-relaxed"
                        }`}>
                          {proj.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 5: EDUCATION */}
              {education && (
                <div className={`pt-3.5 space-y-1 ${activeDensity === "compact" ? "pt-2 space-y-0.5" : ""}`}>
                  <h2 
                    className={`text-xs font-black uppercase tracking-wider text-slate-900 pb-0.5 ${
                      currentTemplate.blueprint === "silicon" || currentTemplate.blueprint === "technical"
                        ? "border-l-4 pl-2" 
                        : "border-b border-slate-300"
                    }`}
                    style={{
                      borderLeftColor: (currentTemplate.blueprint === "silicon" || currentTemplate.blueprint === "technical") ? activeAccent : undefined,
                      borderBottomColor: currentTemplate.blueprint === "executive" ? activeAccent : undefined
                    }}
                  >
                    Education & Credentials
                  </h2>
                  <p className={`text-[11.5px] text-slate-800 pt-0.5 font-sans ${activeDensity === "compact" ? "text-[10px]" : ""}`}>
                    {education}
                  </p>
                </div>
              )}

            </div>

            {/* Candidate Monetization Banner */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4 print:hidden shadow-lg">
              <div>
                <div className="text-xs font-bold text-rose-400">Unlock All 100+ ATS-Certified Templates</div>
                <div className="text-[11px] text-slate-400">Passed by 99% of company Greenhouse/Lever parsers. Unlimited exports.</div>
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

      {/* 100+ TEMPLATE GALLERY MODAL */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-fadeIn print:hidden">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/50">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                  <span>100 Curated Role-Specific Presets</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Select From 100+ ATS-Approved Templates
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  All templates maintain strict single-column DOM structure engineered to pass Greenhouse, Lever, Workday & Ashby.
                </p>
              </div>

              <button
                onClick={() => setIsGalleryOpen(false)}
                className="w-9 h-9 rounded-2xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center shrink-0 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Filter Tabs */}
            <div className="p-4 sm:px-6 border-b border-slate-200 bg-white flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {[
                  "All",
                  "Tech & Engineering",
                  "Executive & Leadership",
                  "Product & Management",
                  "Finance & Corporate",
                  "Freshers & Interns",
                ].map((cat) => {
                  const isSelected = galleryCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setGalleryCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        isSelected
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search role or skill (e.g. Go, FAANG, Lead)..."
                  value={gallerySearch}
                  onChange={(e) => setGallerySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Grid of Templates (Scrollable) */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50/30">
              {filteredTemplates.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-400 text-xs">
                  No templates match your search query. Try another keyword or clear filter.
                </div>
              ) : (
                filteredTemplates.map((tmpl) => {
                  const isSelected = selectedTemplateId === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => handleSelectTemplate(tmpl)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between group relative bg-white ${
                        isSelected
                          ? "border-rose-600 ring-2 ring-rose-500/25 shadow-md"
                          : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                      }`}
                    >
                      <div>
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {tmpl.category}
                          </span>
                          <span 
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: tmpl.accentHex }}
                          >
                            {tmpl.roleTag}
                          </span>
                        </div>

                        {/* Title & Blueprint */}
                        <h4 className="font-black text-slate-900 text-sm group-hover:text-rose-600 transition-colors">
                          {tmpl.name}
                        </h4>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5 uppercase">
                          Blueprint: {tmpl.blueprint} • {tmpl.font} font
                        </div>

                        {/* Description */}
                        <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                          {tmpl.description}
                        </p>
                      </div>

                      {/* Bottom Button */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400">
                          {tmpl.density} layout
                        </span>
                        <span className={`text-xs font-extrabold px-3 py-1 rounded-xl transition-all flex items-center gap-1 ${
                          isSelected
                            ? "bg-rose-600 text-white"
                            : "bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white"
                        }`}>
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Active</span>
                            </>
                          ) : (
                            <span>Use Template</span>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
              <div>
                Showing <strong className="text-slate-900">{filteredTemplates.length}</strong> of 100 templates
              </div>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="font-bold text-slate-700 hover:text-slate-900 px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close Gallery
              </button>
            </div>

          </div>
        </div>
      )}

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
                Unlock all 100+ ATS-Certified role templates with lifetime access, unlimited edits, and instant browser PDF export.
              </p>
            </div>

            {/* Pricing Tag */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-left">
              <div>
                <span className="font-bold text-slate-900 block text-sm">Lifetime Pro PDF Access</span>
                <span className="text-xs text-slate-500">All 100+ templates + unlimited edits & downloads</span>
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
                <span>100+ industry-specific role templates included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero tables or columns (100% readable by ATS bots)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant vector PDF download directly in your browser</span>
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
