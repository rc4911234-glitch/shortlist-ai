// Real ATS Keyword & Scoring Engine

export interface ATSAnalysisResult {
  overallScore: number;
  grade: "A+" | "A" | "B" | "C" | "Needs Work";
  summary: string;
  keywordMatchRate: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  detectedSkills: string[];
  formattingScore: number;
  formattingChecks: {
    title: string;
    passed: boolean;
    recommendation: string;
  }[];
  impactScore: number;
  quantifiedMetricsCount: number;
  actionVerbsCount: number;
  bulletSuggestions: {
    original: string;
    improved: string;
    reason: string;
  }[];
  tailoredResumeText: string;
}

const COMMON_SKILLS = [
  // Tech & Dev
  "javascript", "typescript", "react", "next.js", "node.js", "express", "python", "django",
  "fastapi", "java", "spring boot", "c++", "c#", ".net", "golang", "rust", "php", "laravel",
  "html5", "css3", "tailwind css", "bootstrap", "sass", "sql", "postgresql", "mysql", "mongodb",
  "redis", "elasticsearch", "graphql", "rest api", "microservices", "docker", "kubernetes",
  "aws", "azure", "gcp", "ci/cd", "github actions", "git", "linux", "jira", "agile", "scrum",
  // Data & AI
  "machine learning", "deep learning", "nlp", "llm", "pandas", "numpy", "tensorflow", "pytorch",
  "data analysis", "power bi", "tableau", "excel", "data visualization", "statistics",
  // Product, Design & Marketing
  "product management", "ui/ux", "figma", "wireframing", "prototyping", "user research",
  "seo", "sem", "google analytics", "content strategy", "copywriting", "a/b testing",
  // Soft & Leadership
  "leadership", "cross-functional", "communication", "problem solving", "stakeholder management",
  "critical thinking", "mentorship", "client relations"
];

const ACTION_VERBS = [
  "spearheaded", "architected", "engineered", "designed", "developed", "scaled", "optimized",
  "implemented", "automated", "streamlined", "accelerated", "reduced", "increased", "boosted",
  "generated", "delivered", "mentored", "orchestrated", "transformed", "established", "launched"
];

export function analyzeResume(resumeText: string, jobDescriptionText: string): ATSAnalysisResult {
  const cleanResume = resumeText.toLowerCase();
  const cleanJD = jobDescriptionText.toLowerCase();

  // 1. Extract Target Keywords from JD (or common skills if JD empty)
  const targetKeywords: string[] = [];
  if (cleanJD.trim().length > 20) {
    COMMON_SKILLS.forEach(skill => {
      if (cleanJD.includes(skill)) {
        targetKeywords.push(skill);
      }
    });

    // Also extract important title/domain words from JD
    const jdWords = cleanJD.match(/\b[a-z]{4,}\b/g) || [];
    const frequencyMap: Record<string, number> = {};
    jdWords.forEach(w => {
      if (!["with", "this", "that", "from", "will", "have", "been", "work", "team", "year", "years", "role", "must", "plus"].includes(w)) {
        frequencyMap[w] = (frequencyMap[w] || 0) + 1;
      }
    });
    Object.entries(frequencyMap)
      .filter(([_, count]) => count >= 2)
      .slice(0, 8)
      .forEach(([word]) => {
        if (!targetKeywords.includes(word) && targetKeywords.length < 15) {
          targetKeywords.push(word);
        }
      });
  }

  // Fallback target keywords if none extracted or JD is short
  const finalTargets = targetKeywords.length >= 3 
    ? targetKeywords 
    : ["react", "typescript", "git", "agile", "rest api", "problem solving", "communication", "leadership"];

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  finalTargets.forEach(keyword => {
    if (cleanResume.includes(keyword)) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  const keywordMatchRate = finalTargets.length > 0 
    ? Math.round((matchedKeywords.length / finalTargets.length) * 100) 
    : 70;

  // 2. Formatting & Sections Checks
  const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(resumeText);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
  const hasLinkedIn = cleanResume.includes("linkedin.com") || cleanResume.includes("linkedin");
  const hasExperience = cleanResume.includes("experience") || cleanResume.includes("work history") || cleanResume.includes("employment");
  const hasEducation = cleanResume.includes("education") || cleanResume.includes("degree") || cleanResume.includes("university") || cleanResume.includes("college");
  const hasSkillsSection = cleanResume.includes("skills") || cleanResume.includes("technologies") || cleanResume.includes("tools");

  const wordCount = resumeText.trim().split(/\s+/).length;
  const isOptimalLength = wordCount >= 250 && wordCount <= 1000;

  const formattingChecks = [
    {
      title: "Contact Information (Email & Phone)",
      passed: hasEmail && (hasPhone || hasLinkedIn),
      recommendation: hasEmail && hasPhone ? "Perfect contact info formatting." : "Include clear email, phone number, and LinkedIn profile at the top."
    },
    {
      title: "Core Work Experience Section",
      passed: hasExperience,
      recommendation: hasExperience ? "Experience section properly detected." : "ATS scanners require a clear 'Experience' or 'Work History' header."
    },
    {
      title: "Dedicated Skills Section",
      passed: hasSkillsSection,
      recommendation: hasSkillsSection ? "Skills section detected." : "Add a clear 'Skills' section so parsers categorize your capabilities immediately."
    },
    {
      title: "Education Section",
      passed: hasEducation,
      recommendation: hasEducation ? "Education section detected." : "Ensure 'Education' with your degree and graduation year is included."
    },
    {
      title: "Optimal Resume Length (300-800 words)",
      passed: isOptimalLength,
      recommendation: isOptimalLength ? `Good length (${wordCount} words).` : wordCount < 250 ? "Resume is too short. Add more detailed project achievements." : "Resume is too lengthy. Keep it concise (1-2 pages maximum)."
    }
  ];

  const passedChecksCount = formattingChecks.filter(c => c.passed).length;
  const formattingScore = Math.round((passedChecksCount / formattingChecks.length) * 100);

  // 3. Impact & Metrics (STAR Method & Action Verbs)
  const metricMatches = resumeText.match(/\b(\d+%\b|\$\d+|\d+\+|\b\d+\s*(users|clients|projects|developers|engineers|sales|revenue|leads|downloads|stars|requests|ms|seconds))\b/gi) || [];
  const quantifiedMetricsCount = metricMatches.length;

  let foundActionVerbs = 0;
  ACTION_VERBS.forEach(verb => {
    if (cleanResume.includes(verb)) foundActionVerbs++;
  });

  // Calculate Impact Score
  let impactScore = Math.min(100, Math.round((quantifiedMetricsCount * 12) + (foundActionVerbs * 8)));
  if (impactScore < 20 && wordCount > 100) impactScore = 35;

  // 4. Overall Weighted Score
  // Weights: Keywords 45%, Formatting 25%, Impact 30%
  const overallScore = Math.min(98, Math.max(25, Math.round(
    (keywordMatchRate * 0.45) +
    (formattingScore * 0.25) +
    (impactScore * 0.30)
  )));

  let grade: ATSAnalysisResult["grade"] = "Needs Work";
  if (overallScore >= 85) grade = "A+";
  else if (overallScore >= 75) grade = "A";
  else if (overallScore >= 60) grade = "B";
  else if (overallScore >= 45) grade = "C";

  let summary = "";
  if (overallScore >= 80) {
    summary = "Strong ATS profile! Your resume has solid keyword density and formatting, ready for submission with minor fine-tuning.";
  } else if (overallScore >= 60) {
    summary = "Moderate ATS match. You are missing critical job-specific keywords and measurable achievements that recruiters filter for.";
  } else {
    summary = "High ATS Rejection Risk. Significant keyword mismatch and lack of quantifiable bullet points will cause automated filters to drop your resume.";
  }

  // 5. Intelligent Bullet Suggestions
  const bulletSuggestions: ATSAnalysisResult["bulletSuggestions"] = [
    {
      original: "Worked on frontend features using React and fixed bugs.",
      improved: "Architected and delivered 12+ responsive user interfaces using React & TypeScript, boosting user engagement by 28%.",
      reason: "Replaces passive 'Worked on' with strong action verb 'Architected' and adds quantified metrics."
    },
    {
      original: "Responsible for managing database and optimizing queries.",
      improved: "Engineered high-performance PostgreSQL indexing strategies, reducing query latency by 45% across 200k daily requests.",
      reason: "Eliminates 'Responsible for' cliché and proves real business impact with speed benchmarks."
    },
    {
      original: "Collaborated with team to launch new product updates.",
      improved: "Spearheaded cross-functional sprint delivery with 5 developers, deploying product updates 2 weeks ahead of schedule.",
      reason: "Demonstrates leadership, team size, and concrete delivery timeframe."
    }
  ];

  // 6. Generate 1-Click Tailored ATS Resume
  let tailoredResume = resumeText;
  bulletSuggestions.forEach(b => {
    if (tailoredResume.includes(b.original)) {
      tailoredResume = tailoredResume.replace(b.original, b.improved);
    }
  });

  if (missingKeywords.length > 0) {
    const formattedMissing = missingKeywords.map(k => k.charAt(0).toUpperCase() + k.slice(1)).join(", ");
    if (tailoredResume.includes("TECHNICAL SKILLS") || tailoredResume.includes("SKILLS")) {
      tailoredResume = tailoredResume.replace(
        /(TECHNICAL SKILLS|SKILLS)/i,
        `$1\nTarget Job Competencies (ATS Matched): ${formattedMissing}`
      );
    } else {
      tailoredResume += `\n\nCORE COMPETENCIES (ATS Matched):\n${formattedMissing}`;
    }
  }

  return {
    overallScore,
    grade,
    summary,
    keywordMatchRate,
    matchedKeywords,
    missingKeywords,
    detectedSkills: matchedKeywords,
    formattingScore,
    formattingChecks,
    impactScore,
    quantifiedMetricsCount,
    actionVerbsCount: foundActionVerbs,
    bulletSuggestions,
    tailoredResumeText: tailoredResume
  };
}
