"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Briefcase, 
  Sparkles, 
  UploadCloud, 
  RefreshCw, 
  Check, 
  AlertCircle,
  FileCode2
} from "lucide-react";
import { SAMPLE_RESUME, SAMPLE_JOB_DESCRIPTION } from "@/lib/sampleData";
import { analyzeResume, ATSAnalysisResult } from "@/lib/atsEngine";

interface ResumeScannerProps {
  onScanComplete: (result: ATSAnalysisResult) => void;
  scannerRef: React.RefObject<HTMLDivElement>;
}

export default function ResumeScanner({ onScanComplete, scannerRef }: ResumeScannerProps) {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoadSampleResume = () => {
    setResumeText(SAMPLE_RESUME);
    setErrorMessage("");
  };

  const handleLoadSampleJD = () => {
    setJobDescription(SAMPLE_JOB_DESCRIPTION);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setResumeText(content);
        setErrorMessage("");
      };
      reader.readAsText(file);
    } else {
      // For PDF or docx, let the user know they can copy-paste text or parse text directly
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        // In browser, if plain text is readable:
        if (text && text.length > 50) {
          setResumeText(text);
          setErrorMessage("");
        } else {
          setErrorMessage("Tip: Copy and paste your resume text directly into the box for 100% accurate ATS text analysis!");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleStartScan = () => {
    if (!resumeText.trim() || resumeText.trim().length < 50) {
      setErrorMessage("Please enter or paste your resume content (at least 50 characters).");
      return;
    }

    setErrorMessage("");
    setIsScanning(true);

    const steps = [
      "Extracting sections and contact information...",
      "Parsing target Job Description for key technical & soft skills...",
      "Comparing keyword density against top ATS algorithms...",
      "Benchmarking quantified metrics & action verbs...",
      "Generating detailed score report..."
    ];

    let current = 0;
    setScanStep(steps[0]);

    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setScanStep(steps[current]);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        const result = analyzeResume(resumeText, jobDescription);
        onScanComplete(result);
      }
    }, 450);
  };

  const resumeWordCount = resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0;
  const jdWordCount = jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0;

  return (
    <div ref={scannerRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
        {/* Header bar */}
        <div className="bg-slate-900 px-6 sm:px-8 py-5 text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-blue-400" />
              <span>ATS Resume & Job Description Scanner</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Paste your resume or load our pre-filled template to see live ATS scoring in action.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSampleResume}
              className="text-xs font-medium px-3.5 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/30 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Fill Sample Resume</span>
            </button>
          </div>
        </div>

        {/* Input Panels Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Resume Input */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-blue-600" />
                <span>1. Your Resume Content</span>
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload .txt File</span>
                  <input
                    type="file"
                    accept=".txt,.doc,.docx,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-slate-400 font-mono">
                  {resumeWordCount} words
                </span>
              </div>
            </div>

            <div className="relative flex-1 min-h-[300px]">
              <textarea
                value={resumeText}
                onChange={(e) => {
                  setResumeText(e.target.value);
                  setErrorMessage("");
                }}
                placeholder="Paste your full resume text here (Summary, Work Experience, Skills, Education)... or click 'Auto-Fill Sample Resume' above!"
                className="w-full h-full min-h-[300px] p-4 text-sm font-mono bg-slate-50/70 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all placeholder:text-slate-400"
              />
              {!resumeText && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-3">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    Paste resume text or upload your file
                  </p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Supports text extracted from LinkedIn, Word, or PDF resumes.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Job Description Input */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>2. Target Job Description (Recommended)</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleLoadSampleJD}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Load Sample Job
                </button>
                <span className="text-xs text-slate-400 font-mono">
                  {jdWordCount} words
                </span>
              </div>
            </div>

            <div className="relative flex-1 min-h-[300px]">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the Job Description (Responsibilities, Requirements, Skills needed) from LinkedIn, Indeed, or company career page..."
                className="w-full h-full min-h-[300px] p-4 text-sm font-mono bg-slate-50/70 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all placeholder:text-slate-400"
              />
              {!jobDescription && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    Paste Job Description to check keyword match
                  </p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Or leave empty to run a general ATS standard diagnostic.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error message if any */}
        {errorMessage && (
          <div className="mx-6 sm:mx-8 mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action button & Scanning state */}
        <div className="bg-slate-50 px-6 sm:px-8 py-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Encrypted in-browser scan • 100% Private, your resume is never shared</span>
          </div>

          <button
            onClick={handleStartScan}
            disabled={isScanning}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-md ${
              isScanning
                ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.99]"
            }`}
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-blue-700" />
                <span className="text-slate-800">{scanStep}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Scan & Calculate ATS Score</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
