// Demo data for Credence hackathon demo
// ALL data here is fictional. No real verification has been performed.
// See design.md §12 — Demo Data Standards.

export type VerificationStatus =
  | "Verified"
  | "Pending"
  | "Inconclusive"
  | "Unable to Verify"
  | "Rejected"
  | "Expired"
  | "Revoked";

export interface EvidenceSource {
  id: string;
  title: string;
  url: string;
  type: "GitHub" | "Official Issuer" | "News" | "Portfolio" | "LinkedIn" | "Other";
  retrievedAt: string;
  excerpt: string;
  reliability: "High" | "Medium" | "Low";
}

export interface Claim {
  id: string;
  category: "Technical Skill" | "Hackathon" | "Certification" | "Education" | "Internship" | "Project";
  title: string;
  description: string;
  submittedAt: string;
  status: VerificationStatus;
  evidence: EvidenceSource[];
  aiReview?: {
    summary: string;
    supportingEvidenceIds: string[];
    contradictingEvidenceIds: string[];
    identityMatch: "Confirmed" | "Likely" | "Uncertain" | "Not found";
    sourceReliability: "High" | "Medium" | "Low";
    missingInfo?: string;
    proposedStatus: VerificationStatus;
    isSimulated: true;
  };
  credential?: {
    id: string;
    issuedAt: string;
    expiresAt?: string;
    txHash?: string;
    network?: string;
    contractAddress?: string;
    isAnchored: boolean;
  };
  timelineEvents: {
    stage: string;
    label: string;
    timestamp: string;
    status: "completed" | "active" | "pending";
  }[];
}

export interface CandidateProfile {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  location: string;
  avatar: string;
  skills: { name: string; level: "Beginner" | "Intermediate" | "Advanced" | "Expert" }[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  publicProfileSlug: string;
  claims: Claim[];
  isDemo: true;
}

// ─── Demo candidate: Aarav Mehta ─────────────────────────────────────────────
// Fictional profile. No real data.

const evidenceSources: Record<string, EvidenceSource> = {
  gh_repo: {
    id: "ev-gh-001",
    title: "aarav-mehta/climate-forecast-ml — GitHub Repository",
    url: "https://github.com/aarav-mehta/climate-forecast-ml",
    type: "GitHub",
    retrievedAt: "2026-09-14T10:32:00Z",
    excerpt:
      "Public repository with 47 commits over 3 months. README describes a Python ML pipeline using scikit-learn and XGBoost to forecast regional temperature anomalies. Last commit: 2026-09-12.",
    reliability: "High",
  },
  hackathon_results: {
    id: "ev-hack-001",
    title: "EarthHacks 2026 — Official Results Page",
    url: "https://earthhacks.io/2026/results",
    type: "Official Issuer",
    retrievedAt: "2026-09-14T10:35:00Z",
    excerpt:
      "Top 10 finalist teams listed. Team 'ClimateNet' (members: Aarav Mehta, Priya Sharma) — awarded Best Use of Open Data. Certificate issued by EarthHacks Foundation.",
    reliability: "High",
  },
  coursera_cert: {
    id: "ev-cert-001",
    title: "Coursera — Machine Learning Specialization Certificate",
    url: "https://coursera.org/verify/specialization/CREDENCE-DEMO-ML2026",
    type: "Official Issuer",
    retrievedAt: "2026-09-14T10:38:00Z",
    excerpt:
      "Certificate issued to 'Aarav Mehta' for completion of the Machine Learning Specialization (DeepLearning.AI). Issue date: 2026-07-22. Verification ID: CREDENCE-DEMO-ML2026.",
    reliability: "High",
  },
  blog_mention: {
    id: "ev-news-001",
    title: "Dev.to — 'Building a Climate ML Pipeline in Python'",
    url: "https://dev.to/aaravmehta/climate-ml-pipeline",
    type: "Other",
    retrievedAt: "2026-09-14T10:42:00Z",
    excerpt:
      "Article by @aaravmehta describing the architecture of the climate-forecast-ml project. 1.2k reactions. Cannot independently confirm sole authorship of the repository.",
    reliability: "Medium",
  },
};

export const demoCandidateProfile: CandidateProfile = {
  id: "cand-aarav-demo-001",
  name: "Aarav Mehta",
  tagline: "ML Engineer · Python · Climate Tech",
  bio:
    "I build machine learning systems for environmental monitoring and climate forecasting. Currently exploring XGBoost, time-series modelling, and open geospatial datasets. Open to roles in climate tech, research, and data engineering.",
  location: "Mumbai, India",
  avatar: "AM",
  skills: [
    { name: "Python", level: "Advanced" },
    { name: "Machine Learning", level: "Advanced" },
    { name: "scikit-learn", level: "Intermediate" },
    { name: "XGBoost", level: "Intermediate" },
    { name: "Data Engineering", level: "Intermediate" },
    { name: "Git", level: "Advanced" },
    { name: "SQL", level: "Intermediate" },
    { name: "TensorFlow", level: "Beginner" },
  ],
  githubUrl: "https://github.com/aarav-mehta",
  linkedinUrl: "https://linkedin.com/in/aaravmehta",
  publicProfileSlug: "aarav-mehta",
  claims: [
    // ── Claim 1: VERIFIED ─────────────────────────────────────────────
    {
      id: "claim-001",
      category: "Certification",
      title: "Machine Learning Specialization — DeepLearning.AI / Coursera",
      description:
        "Completed the 3-course Machine Learning Specialization taught by Andrew Ng on Coursera. Certificate issued 2026-07-22.",
      submittedAt: "2026-09-10T09:00:00Z",
      status: "Verified",
      evidence: [evidenceSources.coursera_cert],
      aiReview: {
        summary:
          "The Coursera verification URL confirms a certificate issued to 'Aarav Mehta' for the Machine Learning Specialization. Name match is confirmed. Issue date matches the candidate's claim. The issuer (Coursera / DeepLearning.AI) is authoritative for this credential type. No contradicting evidence found.",
        supportingEvidenceIds: ["ev-cert-001"],
        contradictingEvidenceIds: [],
        identityMatch: "Confirmed",
        sourceReliability: "High",
        proposedStatus: "Verified",
        isSimulated: true,
      },
      credential: {
        id: "cred-CREDENCE-DEMO-ML2026",
        issuedAt: "2026-09-14T11:00:00Z",
        txHash: undefined,
        isAnchored: false,
      },
      timelineEvents: [
        { stage: "1", label: "Submitted", timestamp: "2026-09-10T09:00:00Z", status: "completed" },
        { stage: "2", label: "Evidence Discovery", timestamp: "2026-09-14T10:38:00Z", status: "completed" },
        { stage: "3", label: "AI Review", timestamp: "2026-09-14T10:55:00Z", status: "completed" },
        { stage: "4", label: "Policy Check", timestamp: "2026-09-14T11:00:00Z", status: "completed" },
        { stage: "5", label: "Issued", timestamp: "2026-09-14T11:00:00Z", status: "completed" },
      ],
    },
    // ── Claim 2: PENDING ──────────────────────────────────────────────
    {
      id: "claim-002",
      category: "Hackathon",
      title: "EarthHacks 2026 — Best Use of Open Data Finalist",
      description:
        "Top-10 finalist and award recipient at EarthHacks 2026, a global climate hackathon. Team ClimateNet (Aarav Mehta + Priya Sharma). Contribution: ML forecasting module.",
      submittedAt: "2026-09-12T14:00:00Z",
      status: "Pending",
      evidence: [evidenceSources.hackathon_results],
      aiReview: {
        summary:
          "The EarthHacks 2026 results page confirms Team ClimateNet as a finalist and award recipient. The candidate's name appears alongside a second team member (Priya Sharma). Individual contribution evidence is not publicly available — the claim cannot be verified or rejected solely on the team listing. Awaiting additional contribution evidence before issuance.",
        supportingEvidenceIds: ["ev-hack-001"],
        contradictingEvidenceIds: [],
        identityMatch: "Confirmed",
        sourceReliability: "High",
        missingInfo:
          "Individual contribution scope within the team is not determinable from public sources alone. Manual review or candidate-provided evidence recommended.",
        proposedStatus: "Pending",
        isSimulated: true,
      },
      timelineEvents: [
        { stage: "1", label: "Submitted", timestamp: "2026-09-12T14:00:00Z", status: "completed" },
        { stage: "2", label: "Evidence Discovery", timestamp: "2026-09-14T10:35:00Z", status: "completed" },
        { stage: "3", label: "AI Review", timestamp: "2026-09-14T10:50:00Z", status: "completed" },
        { stage: "4", label: "Policy Check", timestamp: "2026-09-14T11:05:00Z", status: "active" },
        { stage: "5", label: "Outcome", timestamp: "", status: "pending" },
      ],
    },
    // ── Claim 3: INCONCLUSIVE ─────────────────────────────────────────
    {
      id: "claim-003",
      category: "Project",
      title: "climate-forecast-ml — Python/ML GitHub Project",
      description:
        "Solo-authored open-source ML project using Python, scikit-learn, and XGBoost. Forecasts regional temperature anomalies from ERA5 climate data.",
      submittedAt: "2026-09-13T10:00:00Z",
      status: "Inconclusive",
      evidence: [evidenceSources.gh_repo, evidenceSources.blog_mention],
      aiReview: {
        summary:
          "The GitHub repository exists and is publicly accessible. The commit history shows consistent activity from a single contributor matching the candidate's GitHub handle. However, GitHub does not independently verify real-world identity — the account owner cannot be confirmed as the physical person 'Aarav Mehta' without additional identity anchoring. The blog article corroborates the project description but is authored by the same unverified account. Individual authorship is probable but not confirmable from public sources alone.",
        supportingEvidenceIds: ["ev-gh-001", "ev-news-001"],
        contradictingEvidenceIds: [],
        identityMatch: "Likely",
        sourceReliability: "Medium",
        missingInfo:
          "GitHub account identity is not verified against the candidate's real-world identity. A practical assessment or signed attestation could resolve this.",
        proposedStatus: "Inconclusive",
        isSimulated: true,
      },
      timelineEvents: [
        { stage: "1", label: "Submitted", timestamp: "2026-09-13T10:00:00Z", status: "completed" },
        { stage: "2", label: "Evidence Discovery", timestamp: "2026-09-14T10:32:00Z", status: "completed" },
        { stage: "3", label: "AI Review", timestamp: "2026-09-14T10:45:00Z", status: "completed" },
        { stage: "4", label: "Policy Check", timestamp: "2026-09-14T11:10:00Z", status: "completed" },
        { stage: "5", label: "Inconclusive", timestamp: "2026-09-14T11:10:00Z", status: "completed" },
      ],
    },
  ],
  isDemo: true,
};

// ─── Demo employer ────────────────────────────────────────────────────────────
export const demoJobDescription = {
  title: "ML Engineer — Climate Data Platform",
  company: "GreenGrid Technologies (Demo)",
  requirements: [
    { skill: "Python", required: true },
    { skill: "Machine Learning", required: true },
    { skill: "scikit-learn", required: true },
    { skill: "XGBoost", required: false },
    { skill: "Data Engineering", required: true },
    { skill: "TensorFlow", required: false },
    { skill: "Climate / Environmental Domain", required: false },
  ],
  description:
    "We're building open-source tools for climate data analysis. Looking for an ML engineer comfortable with Python, scikit-learn, and geospatial datasets. Hackathon experience in climate tech is a strong plus.",
  isDemo: true,
};

export const DEMO_LABEL = "DEMO DATA — No real verification has been performed. All profiles, claims, and credentials on this page are fictional.";
