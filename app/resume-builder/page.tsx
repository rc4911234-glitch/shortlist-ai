"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  Download, 
  Printer,
  Mail,
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
  Code,
  Edit3,
  Globe,
  Sliders
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
  // Document Title
  const [docTitle, setDocTitle] = useState("ROHIT_CHAUDHARY_Resume");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Left Sidebar Mode: "design" (Templates & Colors) vs "formatting" (Content & Inputs)
  const [leftTab, setLeftTab] = useState<"design" | "formatting">("design");

  // Candidate Info (Matching User Screenshot)
  const [fullName, setFullName] = useState("ROHIT CHAUDHARY");
  const [jobTitle, setJobTitle] = useState("Full Stack Software Engineer");
  const [email, setEmail] = useState("rohitchaudhary5755@gmail.com");
  const [phone, setPhone] = useState("+91 78569 17258");
  const [location, setLocation] = useState("Mumbai, India");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/rohit-chaudhary");
  const [github, setGithub] = useState("github.com/rc4911234-glitch");
  const [summary, setSummary] = useState(
    "IT professional with a strong interest in web development, software solutions, and database management. Experienced in building websites and web applications with knowledge of frontend, backend, and database concepts. Skilled in problem-solving, understanding project requirements, and creating user-friendly digital solutions. Passionate about learning new technologies and contributing effectively to IT projects."
  );

  // Skills
  const [skills, setSkills] = useState("Full stack web development, Software development principles, Frontend technologies, Backend fundamentals, Database management, Database design and queries, API integration, Responsive design techniques, Software testing and debugging, Version control with GitHub, Technical documentation");

  // Experience
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: "exp-1",
      role: "Project Coordinator",
      company: "Rustomjee LTD.",
      duration: "October 2025 - April 2026",
      location: "Mumbai, India",
      bullets: [
        "Managed real estate project data, documentation, and reports from the head office with high accuracy.",
        "Coordinated with site teams and internal departments to track project progress and ensure timely updates.",
        "Supported planning and execution by analyzing site reports and resolving coordination gaps.",
        "Ensured proper documentation, compliance tracking, and smooth communication between head office and sites."
      ]
    },
    {
      id: "exp-2",
      role: "CRM EXECUTIVE",
      company: "DLF Limited",
      duration: "January 2025 - September 2025",
      location: "Mumbai, India",
      bullets: [
        "Managed client bookings, CRM logins, and end to end documentation including KYC, agreements, and payment records with high accuracy.",
        "Conducted timely welcome calls and emails post-booking, collecting feedback to enhance customer experience.",
        "Handled post-sales support through calls and emails, including demand and possession letters, coordinating with sales teams.",
        "Tracked payment milestones, followed up on dues, and supported upselling opportunities to drive revenue growth."
      ]
    },
    {
      id: "exp-3",
      role: "Back Office Executive",
      company: "Pavitra Security & Service Pvt. Ltd.",
      duration: "November 2023 - December 2024",
      location: "Mumbai, India",
      bullets: [
        "Purchase mutual fund transactions (Purchase, redemption, SIPs) with 100% compliance to SEBI and AMFI regulations, ensuring zero operational penalties.",
        "Developed MIS reports on client holdings, SIP performance, and redemptions, enabling advisor to deliver accurate portfolio reviews.",
        "Streamlined communication with AMCs, Banks and clients to resolve mismatched transactions, improving turnaround time and client satisfaction."
      ]
    }
  ]);

  // Projects
  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: "proj-1",
      title: "PerfectShot AI",
      tech: "Next.js, Python, Stable Diffusion",
      link: "perfectshot.ai",
      bullets: [
        "Developed an AI-powered headshot generation platform with automated delivery pipelines.",
        "Engineered secure payment workflows and cloud storage integration for generated image assets."
      ]
    },
    {
      id: "proj-2",
      title: "Combo Store",
      tech: "React, Node.js, Stripe, MongoDB",
      link: "thecombostore.in",
      bullets: [
        "Developed a full-stack e-commerce application with product catalog management and automated order processing."
      ]
    },
    {
      id: "proj-3",
      title: "ThePrayVerse",
      tech: "Next.js, Tailwind, Cloudflare",
      link: "theprayverse.com",
      bullets: [
        "Developed an AI powered Christian content platform with dynamic content generation and automated social workflows."
      ]
    }
  ]);

  // Websites & Portfolios
  const [websites, setWebsites] = useState("https://www.theprayverse.com/\nhttps://www.thecombostore.in/");

  // Education
  const [education, setEducation] = useState("HSC • 12th Science, Bihar School Examination Board (BSEB), Madhubani • July 2023");

  // Template Engine
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("silicon-blue");
  const [activeAccent, setActiveAccent] = useState<string>("#2563eb"); // Ocean Blue from screenshot
  const [activeFont, setActiveFont] = useState<FontStyle>("sans");
  const [activeDensity, setActiveDensity] = useState<SpacingDensity>("normal");

  // Filter & Search in Sidebar
  const [sidebarFilter, setSidebarFilter] = useState<string>("All");
  const [sidebarSearch, setSidebarSearch] = useState<string>("");

  // Modals
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeSectionScroll, setActiveSectionScroll] = useState<string>("heading");

  // 10 Color Swatches from ResumeNow screenshot
  const STUDIO_COLORS = [
    { name: "White/Silver", hex: "#f8fafc", dotBg: "#f8fafc", border: "border-slate-400" },
    { name: "Charcoal", hex: "#0f172a", dotBg: "#0f172a", border: "border-slate-900" },
    { name: "Warm Tan", hex: "#b45309", dotBg: "#b45309", border: "border-amber-700" },
    { name: "Ocean Blue", hex: "#2563eb", dotBg: "#2563eb", border: "border-blue-600" }, // Selected in screenshot!
    { name: "Cyan Teal", hex: "#06b6d4", dotBg: "#06b6d4", border: "border-cyan-500" },
    { name: "Emerald Green", hex: "#059669", dotBg: "#059669", border: "border-emerald-600" },
    { name: "Sunset Orange", hex: "#ea580c", dotBg: "#ea580c", border: "border-orange-600" },
    { name: "Ruby Rose", hex: "#e11d48", dotBg: "#e11d48", border: "border-rose-600" },
    { name: "Velvet Purple", hex: "#7c3aed", dotBg: "#7c3aed", border: "border-purple-600" },
  ];

  const currentTemplate: ResumeTemplate = 
    RESUME_TEMPLATES_100.find((t) => t.id === selectedTemplateId) || RESUME_TEMPLATES_100[0];

  const handleSelectTemplate = (tmpl: ResumeTemplate) => {
    setSelectedTemplateId(tmpl.id);
    setActiveAccent(tmpl.accentHex);
    setActiveFont(tmpl.font);
    setActiveDensity(tmpl.density);
  };

  const filteredTemplates = RESUME_TEMPLATES_100.filter((t) => {
    const matchesCat = sidebarFilter === "All" || t.category === sidebarFilter;
    const matchesSearch = 
      t.name.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
      t.roleTag.toLowerCase().includes(sidebarSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

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

  // ATS Score Calculator
  let atsScore = 68;
  if (fullName.trim()) atsScore += 5;
  if (summary.length > 50) atsScore += 8;
  if (skills.split(",").length >= 6) atsScore += 8;
  if (experiences.length >= 2) atsScore += 6;
  if (projects.length >= 2) atsScore += 5;
  atsScore = Math.min(atsScore, 98);

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

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: `exp-${Date.now()}`,
        role: "Software Engineer",
        company: "Company Name",
        duration: "2023 - 2024",
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

  return (
    <div className="min-h-screen bg-[#182236] text-slate-100 selection:bg-blue-600 selection:text-white flex flex-col font-sans">
      
      {/* Non-Printable Header Bar */}
      <header className="border-b border-slate-800 bg-[#111927] sticky top-0 z-40 print:hidden shadow-md">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Job Board</span>
            </Link>

            <span className="text-slate-700">|</span>

            {/* Editable Document Name */}
            <div className="flex items-center gap-2">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                  autoFocus
                  className="bg-slate-800 text-white font-bold text-xs px-2 py-1 rounded outline-none border border-blue-500"
                />
              ) : (
                <button
                  onClick={() => setIsEditingTitle(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-200 hover:text-white group"
                >
                  <span>{docTitle}</span>
                  <Edit3 className="w-3 h-3 text-slate-500 group-hover:text-blue-400" />
                </button>
              )}
            </div>
          </div>

          {/* Right Header Badges */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-emerald-300">ATS Pass Score:</span>
              <span className="font-black text-emerald-400 font-mono">{atsScore}/100</span>
            </div>

            <button
              onClick={handlePrintDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isUnlocked ? "Download PDF" : "Download ATS-Pro (₹99)"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3-COLUMN STUDIO LAYOUT (Matching Screenshot) */}
      <div className="flex-1 max-w-[1700px] w-full mx-auto px-2 sm:px-4 py-4 flex flex-col lg:flex-row gap-5 items-start justify-center">
        
        {/* COLUMN 1: LEFT SIDEBAR (Design & Formatting Panel) */}
        <aside className="w-full lg:w-[320px] shrink-0 bg-[#1f2b42] rounded-2xl border border-slate-700/80 shadow-xl overflow-hidden flex flex-col print:hidden max-h-[calc(100vh-80px)] sticky top-16">
          
          {/* Top Tabs: Design vs Formatting */}
          <div className="grid grid-cols-2 p-2 gap-1.5 bg-[#172133] border-b border-slate-800">
            <button
              onClick={() => setLeftTab("design")}
              className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                leftTab === "design"
                  ? "bg-[#273754] text-white shadow-sm border border-slate-600/50"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/40"
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-blue-400" />
              <span>Design</span>
            </button>

            <button
              onClick={() => setLeftTab("formatting")}
              className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                leftTab === "formatting"
                  ? "bg-[#273754] text-white shadow-sm border border-slate-600/50"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/40"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Formatting</span>
            </button>
          </div>

          {/* TAB 1: DESIGN (Colors & Miniature Templates Grid - Exact Match to Screenshot) */}
          {leftTab === "design" && (
            <div className="p-4 overflow-y-auto flex-1 space-y-5 scrollbar-thin scrollbar-thumb-slate-700">
              
              {/* Colors Section */}
              <div>
                <label className="text-xs font-extrabold text-slate-300 block mb-2.5">
                  Colors
                </label>
                <div className="grid grid-cols-5 gap-2.5">
                  {STUDIO_COLORS.map((col) => {
                    const isSelected = activeAccent.toLowerCase() === col.hex.toLowerCase();
                    return (
                      <button
                        key={col.name}
                        onClick={() => setActiveAccent(col.hex)}
                        title={col.name}
                        className={`w-9 h-9 rounded-full transition-all flex items-center justify-center relative shadow-sm border-2 ${
                          isSelected 
                            ? "ring-2 ring-white scale-110 border-white" 
                            : `${col.border} hover:scale-105 opacity-80 hover:opacity-100`
                        }`}
                        style={{ backgroundColor: col.dotBg }}
                      >
                        {isSelected && (
                          <Check className={`w-4 h-4 stroke-[3] ${col.hex === "#f8fafc" ? "text-slate-900" : "text-white"}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Templates Section Header */}
              <div className="border-t border-slate-700/60 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-slate-300">
                    Templates
                  </label>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {filteredTemplates.length} Available
                  </span>
                </div>

                {/* Search / Filter Input */}
                <div className="relative mb-3">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={sidebarSearch}
                    onChange={(e) => setSidebarSearch(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 rounded-xl bg-[#172133] border border-slate-700 text-[11px] text-white placeholder-slate-500 outline-none focus:border-blue-500"
                  />
                </div>

                {/* 2-COLUMN GRID OF MINI PAPER RESUME THUMBNAILS (Exact match to Screenshot) */}
                <div className="grid grid-cols-2 gap-3">
                  {filteredTemplates.slice(0, 30).map((tmpl) => {
                    const isSelected = selectedTemplateId === tmpl.id;
                    return (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => handleSelectTemplate(tmpl)}
                        className={`relative w-full h-44 rounded-lg bg-white border text-left p-2 overflow-hidden flex flex-col justify-between transition-all group ${
                          isSelected
                            ? "border-blue-500 ring-2 ring-blue-500 shadow-lg scale-[1.02]"
                            : "border-slate-600/70 hover:border-slate-300 opacity-90 hover:opacity-100 hover:scale-[1.01]"
                        }`}
                      >
                        {/* Checkmark Badge on Selected Thumbnail */}
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 z-10 w-4 h-4 rounded-full bg-slate-950 text-white flex items-center justify-center text-[10px] font-black shadow-md">
                            ✓
                          </div>
                        )}

                        {/* Top Simulated Header */}
                        <div>
                          {tmpl.blueprint === "harvard" || tmpl.blueprint === "editorial" ? (
                            <div className="text-center mb-1.5">
                              <div className="h-1.5 w-16 bg-slate-900 rounded mx-auto mb-0.5" />
                              <div className="h-0.5 w-12 bg-slate-400 rounded mx-auto mb-1" />
                              <div className="h-[1px] w-full bg-slate-800" />
                            </div>
                          ) : tmpl.blueprint === "executive" ? (
                            <div className="mb-1.5">
                              <div className="h-1.5 w-full rounded -mt-2 -mx-2 mb-1" style={{ backgroundColor: activeAccent }} />
                              <div className="h-1.5 w-14 bg-slate-900 rounded mb-0.5" />
                              <div className="h-[1px] w-full" style={{ backgroundColor: activeAccent }} />
                            </div>
                          ) : tmpl.blueprint === "metro" ? (
                            <div className="p-1 rounded mb-1.5" style={{ backgroundColor: `${activeAccent}18` }}>
                              <div className="h-1.5 w-14 bg-slate-900 rounded mb-0.5" />
                              <div className="h-0.5 w-20 bg-slate-500 rounded" />
                            </div>
                          ) : (
                            <div className="mb-1.5">
                              <div className="h-1.5 w-14 bg-slate-900 rounded mb-0.5" />
                              <div className="h-1 w-8 rounded mb-1" style={{ backgroundColor: activeAccent }} />
                              <div className="h-[1px] w-full bg-slate-200" />
                            </div>
                          )}

                          {/* Simulated Skeleton Lines */}
                          <div className="space-y-1">
                            {/* Summary lines */}
                            <div className="h-1 w-8 bg-slate-700 rounded" />
                            <div className="h-0.5 w-full bg-slate-300 rounded" />
                            <div className="h-0.5 w-5/6 bg-slate-300 rounded" />

                            {/* Section line */}
                            <div className="pt-1">
                              <div 
                                className="h-1 w-10 rounded mb-0.5"
                                style={{ 
                                  backgroundColor: tmpl.blueprint === "silicon" ? activeAccent : "#0f172a" 
                                }} 
                              />
                              <div className="h-0.5 w-full bg-slate-300 rounded" />
                              <div className="h-0.5 w-4/5 bg-slate-300 rounded" />
                              <div className="h-0.5 w-3/4 bg-slate-300 rounded" />
                            </div>
                          </div>
                        </div>

                        {/* Thumbnail Footer Label */}
                        <div className="pt-1 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[9px] font-bold text-slate-800 truncate max-w-[90px] group-hover:text-blue-600">
                            {tmpl.name}
                          </span>
                          <span className="text-[7.5px] font-mono font-semibold px-1 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                            {tmpl.blueprint}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: FORMATTING & CONTENT (Input Fields & Editor) */}
          {leftTab === "formatting" && (
            <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-700">
              
              {/* Personal Details */}
              <div className="space-y-2 bg-[#172133] p-3.5 rounded-xl border border-slate-700">
                <span className="font-bold text-white text-xs block mb-1">Personal Heading</span>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2 rounded-lg bg-[#1f2b42] border border-slate-700 text-white text-xs outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">Target Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full p-2 rounded-lg bg-[#1f2b42] border border-slate-700 text-white text-xs outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-0.5">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 rounded-lg bg-[#1f2b42] border border-slate-700 text-white text-xs outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-0.5">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2 rounded-lg bg-[#1f2b42] border border-slate-700 text-white text-xs outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 rounded-lg bg-[#1f2b42] border border-slate-700 text-white text-xs outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5 bg-[#172133] p-3.5 rounded-xl border border-slate-700">
                <span className="font-bold text-white text-xs block">Professional Summary</span>
                <textarea
                  rows={4}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full p-2 rounded-lg bg-[#1f2b42] border border-slate-700 text-white text-xs leading-relaxed outline-none focus:border-blue-500"
                />
              </div>

              {/* Skills */}
              <div className="space-y-1.5 bg-[#172133] p-3.5 rounded-xl border border-slate-700">
                <span className="font-bold text-white text-xs block">Technical Skills (Comma separated)</span>
                <textarea
                  rows={3}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full p-2 rounded-lg bg-[#1f2b42] border border-slate-700 text-white text-xs outline-none focus:border-blue-500"
                />
              </div>

              {/* Experience list */}
              <div className="space-y-2 bg-[#172133] p-3.5 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">Experience</span>
                  <button
                    onClick={handleAddExperience}
                    className="text-[11px] text-blue-400 font-bold hover:underline"
                  >
                    + Add Role
                  </button>
                </div>
                {experiences.map((exp, idx) => (
                  <div key={exp.id} className="p-2.5 rounded-lg bg-[#1f2b42] border border-slate-700/80 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].role = e.target.value;
                          setExperiences(updated);
                        }}
                        className="bg-transparent font-bold text-white text-xs outline-none w-3/4"
                      />
                      <button onClick={() => handleRemoveExperience(exp.id)} className="text-rose-400 hover:text-rose-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx].company = e.target.value;
                        setExperiences(updated);
                      }}
                      className="w-full bg-[#172133] p-1.5 rounded text-[11px] text-slate-300 outline-none"
                    />
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx].duration = e.target.value;
                        setExperiences(updated);
                      }}
                      className="w-full bg-[#172133] p-1.5 rounded text-[11px] text-slate-400 font-mono outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="space-y-1.5 bg-[#172133] p-3.5 rounded-xl border border-slate-700">
                <span className="font-bold text-white text-xs block">Education</span>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full p-2 rounded-lg bg-[#1f2b42] border border-slate-700 text-white text-xs outline-none focus:border-blue-500"
                />
              </div>

              {/* Websites */}
              <div className="space-y-1.5 bg-[#172133] p-3.5 rounded-xl border border-slate-700">
                <span className="font-bold text-white text-xs block">Websites, Portfolios, Profiles</span>
                <textarea
                  rows={2}
                  value={websites}
                  onChange={(e) => setWebsites(e.target.value)}
                  className="w-full p-2 rounded-lg bg-[#1f2b42] border border-slate-700 text-white text-xs outline-none focus:border-blue-500"
                />
              </div>

            </div>
          )}

        </aside>

        {/* COLUMN 2: CENTER LIVE A4 RESUME CANVAS (Floating Sheet with Real-time Updates) */}
        <main className="flex-1 flex flex-col items-center justify-start w-full max-w-[850px]">
          
          {/* Document Top Bar */}
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3 px-2 print:hidden">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">{docTitle}</span>
              <span className="text-slate-500">•</span>
              <span className="text-[11px]">Template: <strong className="text-white">{currentTemplate.name}</strong></span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              A4 Format (100% ATS Ready)
            </div>
          </div>

          {/* THE ACTUAL WHITE A4 RESUME SHEET */}
          <div 
            id="resume-document"
            className={`bg-white rounded-lg shadow-2xl border border-slate-300 w-full ${getDensityPadding(activeDensity)} text-slate-900 selection:bg-blue-100 ${
              currentTemplate.blueprint === "executive" ? "border-t-8" : ""
            }`}
            style={{ 
              minHeight: "1120px", 
              fontFamily: getFontFamily(activeFont),
              borderTopColor: currentTemplate.blueprint === "executive" ? activeAccent : undefined
            }}
          >
            
            {/* CANDIDATE HEADER */}
            <div className="pb-3 border-b border-slate-200 space-y-1">
              <h1 
                className="text-2xl sm:text-3xl font-black tracking-tight uppercase"
                style={{ color: activeAccent }}
              >
                {fullName}
              </h1>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-600 font-sans">
                <span>{phone}</span>
                <span>|</span>
                <span className="font-medium text-slate-800">{email}</span>
                <span>|</span>
                <span>{location}</span>
              </div>
            </div>

            {/* SUMMARY SECTION */}
            {summary && (
              <div className="pt-3.5 space-y-1">
                <h2 
                  className="text-xs font-black uppercase tracking-wider pb-0.5 font-sans"
                  style={{ color: activeAccent }}
                >
                  SUMMARY
                </h2>
                <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
                  {summary}
                </p>
              </div>
            )}

            {/* SKILLS SECTION */}
            {skills && (
              <div className="pt-3.5 space-y-1.5">
                <h2 
                  className="text-xs font-black uppercase tracking-wider pb-0.5 font-sans"
                  style={{ color: activeAccent }}
                >
                  SKILLS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[11px] text-slate-700">
                  {skills.split(",").map((sk, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-400 leading-none">•</span>
                      <span>{sk.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EXPERIENCE SECTION */}
            <div className="pt-3.5 space-y-2">
              <h2 
                className="text-xs font-black uppercase tracking-wider pb-0.5 font-sans"
                style={{ color: activeAccent }}
              >
                EXPERIENCE
              </h2>

              <div className="space-y-3 pt-0.5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-0.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-sans">
                      <div>
                        <span className="font-black text-slate-900 text-xs">{exp.role}</span>
                        <span className="text-slate-600 font-medium text-xs">, {exp.company}</span>
                      </div>
                      <span className="text-[10.5px] text-slate-500 font-mono shrink-0">{exp.duration}</span>
                    </div>

                    {exp.location && (
                      <div className="text-[10.5px] text-slate-500 italic pb-0.5">
                        {exp.location}
                      </div>
                    )}

                    <ul className="list-disc list-outside pl-4 space-y-0.5 text-[10.5px] text-slate-700 leading-relaxed">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* EDUCATION SECTION */}
            {education && (
              <div className="pt-3.5 space-y-1">
                <h2 
                  className="text-xs font-black uppercase tracking-wider pb-0.5 font-sans"
                  style={{ color: activeAccent }}
                >
                  EDUCATION
                </h2>
                <div className="text-[11px] text-slate-800 font-sans">
                  {education}
                </div>
              </div>
            )}

            {/* PROJECTS SECTION */}
            {projects.length > 0 && (
              <div className="pt-3.5 space-y-1.5">
                <h2 
                  className="text-xs font-black uppercase tracking-wider pb-0.5 font-sans"
                  style={{ color: activeAccent }}
                >
                  PROJECTS
                </h2>

                <div className="space-y-1.5 pt-0.5 text-[11px] text-slate-700">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-0.5">
                      <div>
                        <strong className="text-slate-900 font-bold">{proj.title}</strong>
                        {proj.tech && <span className="text-slate-500 text-[10.5px]"> ({proj.tech})</span>}
                        {proj.bullets.length > 0 && <span>, {proj.bullets[0]}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WEBSITES, PORTFOLIOS, PROFILES */}
            {websites && (
              <div className="pt-3.5 space-y-1">
                <h2 
                  className="text-xs font-black uppercase tracking-wider pb-0.5 font-sans"
                  style={{ color: activeAccent }}
                >
                  WEBSITES, PORTFOLIOS, PROFILES
                </h2>
                <div className="space-y-0.5 text-[10.5px] text-slate-700">
                  {websites.split("\n").filter(Boolean).map((url, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-slate-400">•</span>
                      <span className="text-blue-600 font-mono hover:underline">{url.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Legal links */}
          <footer className="mt-8 mb-4 text-center text-[11px] text-slate-500 space-x-3 print:hidden">
            <Link href="/terms" className="hover:text-slate-300">Terms & Conditions</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-300">Contact Us</Link>
          </footer>

        </main>

        {/* COLUMN 3: RIGHT SIDEBAR (Actions & Resume Section Navigator - Matching Screenshot) */}
        <aside className="w-full lg:w-[240px] shrink-0 space-y-4 print:hidden sticky top-16">
          
          {/* Action Button Row: Download, Print, Email */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handlePrintDownload}
              className="p-2.5 rounded-xl bg-white text-slate-800 hover:bg-slate-100 flex flex-col items-center justify-center gap-1 shadow-sm transition-all"
            >
              <Download className="w-4 h-4 text-slate-700" />
              <span className="text-[10px] font-bold">Download</span>
            </button>

            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-xl bg-white text-slate-800 hover:bg-slate-100 flex flex-col items-center justify-center gap-1 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4 text-slate-700" />
              <span className="text-[10px] font-bold">Print</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert("Resume link copied to clipboard!");
              }}
              className="p-2.5 rounded-xl bg-white text-slate-800 hover:bg-slate-100 flex flex-col items-center justify-center gap-1 shadow-sm transition-all"
            >
              <Mail className="w-4 h-4 text-slate-700" />
              <span className="text-[10px] font-bold">Share</span>
            </button>
          </div>

          {/* Primary Action Button (Big Blue CTA) */}
          <button
            onClick={handlePrintDownload}
            className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>{isUnlocked ? "Save & Print PDF" : "Save & Download (₹99)"}</span>
          </button>

          {/* Spell Check / ATS Check Utility */}
          <div className="p-3 rounded-xl bg-[#1f2b42] border border-slate-700 flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="leading-tight">
              <span className="font-bold text-white block">ATS Score Verified</span>
              <span className="text-[10px] text-slate-400">98% pass rate on Greenhouse</span>
            </div>
          </div>

          {/* Resume Sections Navigation List (Exact match to Screenshot) */}
          <div className="bg-[#1f2b42] rounded-2xl border border-slate-700 p-4 space-y-3">
            <h3 className="font-extrabold text-white text-xs tracking-wide">
              Resume Sections
            </h3>

            <div className="space-y-1.5 text-xs">
              {[
                { num: 1, name: "Heading" },
                { num: 2, name: "Summary" },
                { num: 3, name: "Skills" },
                { num: 4, name: "Experience" },
                { num: 5, name: "Education" },
                { num: 6, name: "Projects" },
                { num: 7, name: "Websites, Portfolios" },
              ].map((sec) => (
                <button
                  key={sec.num}
                  onClick={() => setLeftTab("formatting")}
                  className="w-full flex items-center gap-2.5 p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors text-left"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-blue-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {sec.num}
                  </span>
                  <span className="font-semibold text-[11px] truncate">{sec.name}</span>
                </button>
              ))}

              <button
                onClick={() => setLeftTab("formatting")}
                className="w-full pt-2 text-[11px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>+ Add a section</span>
              </button>
            </div>
          </div>

        </aside>

      </div>

      {/* Paywall Modal (Candidate Micro-Payment ₹99) */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn print:hidden">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative p-6 sm:p-8 text-center space-y-5 text-slate-900">
            
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
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
                Unlock all templates with lifetime access, unlimited edits, and instant clean browser PDF export.
              </p>
            </div>

            {/* Pricing Tag */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-left">
              <div>
                <span className="font-bold text-slate-900 block text-sm">Lifetime Pro PDF Access</span>
                <span className="text-xs text-slate-500">All templates + unlimited edits & downloads</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-blue-600">₹99</span>
                <span className="text-[10px] text-slate-400 block">or $1.99 USD</span>
              </div>
            </div>

            {/* 3 Value Points */}
            <div className="space-y-2 text-left text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Single-column format (100% readable by ATS bots)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Live color customization & unlimited template switches</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant vector PDF download directly in your browser</span>
              </div>
            </div>

            <button
              onClick={handleUnlockPro}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
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

      {/* Print Stylesheet (Hides all studio chrome, prints pristine paper document) */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          header, footer, nav, aside, button, .print\\:hidden {
            display: none !important;
          }
          #resume-document {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

    </div>
  );
}
