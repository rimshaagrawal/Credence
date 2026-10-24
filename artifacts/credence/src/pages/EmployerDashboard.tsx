import { useState } from "react";
import { Link } from "wouter";
import TopNav from "@/components/layout/TopNav";
import StatusBadge from "@/components/ui/StatusBadge";
import EvidencePanel from "@/components/candidate/EvidencePanel";
import { demoCandidateProfile, demoJobDescription, DEMO_LABEL } from "@/data/demo";
import {
  Search, Users, Bookmark, BookmarkCheck, ChevronRight,
  CheckCircle2, XCircle, AlertTriangle, ExternalLink, BarChart3
} from "lucide-react";
import { toast } from "sonner";

type EmployerSection = "discover" | "candidate" | "compare";

export default function EmployerDashboard() {
  const [section, setSection] = useState<EmployerSection>("discover");
  const [shortlisted, setShortlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "evidence" | "jdmatch" | "credentials">("overview");

  const candidate = demoCandidateProfile;
  const jd = demoJobDescription;

  // JD match analysis
  const matchedSkills = jd.requirements.filter((req) =>
    candidate.skills.some((sk) => sk.name.toLowerCase() === req.skill.toLowerCase())
  );
  const missingRequired = jd.requirements.filter(
    (req) => req.required && !candidate.skills.some((sk) => sk.name.toLowerCase() === req.skill.toLowerCase())
  );
  const matchScore = Math.round((matchedSkills.length / jd.requirements.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <TopNav />
      <div className="demo-banner" style={{ borderRadius: 0, border: "none", borderBottom: "1px solid #D4C88A" }}>
        <AlertTriangle size={14} />
        {DEMO_LABEL}
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 60px - 44px)" }}>
        {/* Sidebar */}
        <nav className="sidebar" aria-label="Employer dashboard navigation">
          <div style={{ padding: "0 var(--space-6) var(--space-6)", borderBottom: "1px solid var(--color-border)", marginBottom: "var(--space-4)" }}>
            <p style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--color-text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Employer</p>
            <p style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-text)", marginTop: 2 }}>GreenGrid Technologies</p>
          </div>
          {[
            { id: "discover" as const, icon: <Search size={16} />, label: "Discover" },
            { id: "candidate" as const, icon: <Users size={16} />, label: "Candidate Profile" },
            { id: "compare" as const, icon: <BarChart3 size={16} />, label: "JD Matching" },
          ].map((item) => (
            <button
              key={item.id}
              className={`sidebar-link${section === item.id ? " active" : ""}`}
              onClick={() => setSection(item.id)}
              aria-current={section === item.id ? "page" : undefined}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <main style={{ flex: 1, padding: "var(--space-10)", overflowY: "auto", minWidth: 0 }}>

          {/* ── DISCOVER ───────────────────────────────────────────── */}
          {section === "discover" && (
            <div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 400, marginBottom: "var(--space-2)" }}>
                Candidate Discovery
              </h1>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-6)" }}>Search and filter verified candidates by skill, achievement, and evidence.</p>

              {/* Search bar */}
              <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-6)", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
                  <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", pointerEvents: "none" }} />
                  <input
                    type="search"
                    className="input"
                    placeholder="Search by skill, certification, project…"
                    style={{ paddingLeft: 36 }}
                    aria-label="Search candidates"
                  />
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => toast.info("Filters — coming in full build")}>Filters</button>
              </div>

              {/* Filter chips */}
              <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginBottom: "var(--space-8)" }}>
                {["Python", "Machine Learning", "Verified Only", "Climate Tech"].map((chip, i) => (
                  <span key={chip} style={{
                    padding: "4px 12px",
                    borderRadius: "var(--radius-sm)",
                    background: i === 0 ? "var(--color-brand)" : "var(--color-card)",
                    color: i === 0 ? "white" : "var(--color-text)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 500,
                    cursor: "pointer",
                    border: `1px solid ${i === 0 ? "var(--color-brand)" : "var(--color-border)"}`,
                  }}>
                    {chip}
                  </span>
                ))}
              </div>

              {/* Result */}
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "var(--space-4)", fontWeight: 500 }}>1 candidate (demo)</p>
              <div
                style={{
                  background: "var(--color-card)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-5)",
                  cursor: "pointer",
                  border: "1px solid transparent",
                  transition: "border-color var(--transition-fast)",
                }}
                onClick={() => setSection("candidate")}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = "transparent"}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-4)", flexWrap: "wrap" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", color: "white", fontSize: "var(--text-base)", flexShrink: 0 }}>
                    {candidate.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "var(--space-2)" }}>
                      <div>
                        <h3 style={{ fontSize: "var(--text-md)", fontWeight: 600, marginBottom: 2 }}>{candidate.name}</h3>
                        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>{candidate.tagline}</p>
                      </div>
                      <ChevronRight size={16} color="var(--color-text-muted)" />
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
                      {candidate.skills.slice(0, 4).map((sk) => (
                        <span key={sk.name} style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", padding: "2px 8px", fontSize: "var(--text-xs)", color: "var(--color-text)" }}>
                          {sk.name}
                        </span>
                      ))}
                      {candidate.skills.length > 4 && (
                        <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>+{candidate.skills.length - 4} more</span>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-3)" }}>
                      {candidate.claims.map((c) => <StatusBadge key={c.id} status={c.status} />)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── CANDIDATE PROFILE ──────────────────────────────────── */}
          {section === "candidate" && (
            <div>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap", marginBottom: "var(--space-8)" }}>
                <div style={{ display: "flex", gap: "var(--space-5)", alignItems: "flex-start", flex: 1 }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", color: "white", fontSize: "var(--text-lg)", flexShrink: 0 }}>
                    {candidate.avatar}
                  </div>
                  <div>
                    <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 400, marginBottom: "var(--space-1)" }}>{candidate.name}</h1>
                    <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-3)" }}>{candidate.tagline}</p>
                    <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
                      <Link href={`/profile/${candidate.publicProfileSlug}`} className="btn btn-ghost btn-sm">
                        <ExternalLink size={13} /> Public Profile
                      </Link>
                      <button className="btn btn-secondary btn-sm" onClick={() => setSection("compare")}>
                        <BarChart3 size={13} /> Match vs JD
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className={`btn ${shortlisted ? "btn-primary" : "btn-secondary"} btn-sm`}
                  onClick={() => { setShortlisted(!shortlisted); toast.success(shortlisted ? "Removed from shortlist" : "Added to shortlist"); }}
                  aria-pressed={shortlisted}
                >
                  {shortlisted ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                  {shortlisted ? "Shortlisted" : "Shortlist"}
                </button>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: "var(--space-1)", borderBottom: "1px solid var(--color-border)", marginBottom: "var(--space-8)" }} role="tablist">
                {[
                  { id: "overview" as const, label: "Overview" },
                  { id: "evidence" as const, label: "Evidence" },
                  { id: "jdmatch" as const, label: "JD Match" },
                  { id: "credentials" as const, label: "Credentials" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: "var(--space-3) var(--space-4)", border: "none", background: "none",
                      fontSize: "var(--text-sm)", fontWeight: 500, cursor: "pointer",
                      color: activeTab === tab.id ? "var(--color-brand)" : "var(--color-text-muted)",
                      borderBottom: `2px solid ${activeTab === tab.id ? "var(--color-brand)" : "transparent"}`,
                      marginBottom: -1,
                      transition: "color var(--transition-fast)",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "overview" && (
                <div>
                  <div style={{ display: "flex", gap: "var(--space-6)", flexWrap: "wrap", marginBottom: "var(--space-8)" }}>
                    {candidate.claims.map((claim) => (
                      <div key={claim.id} style={{ background: "var(--color-card)", borderRadius: "var(--radius-lg)", padding: "var(--space-5)", flex: "1 1 220px" }}>
                        <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{claim.category}</span>
                        <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, margin: "var(--space-1) 0 var(--space-2)" }}>{claim.title}</p>
                        <StatusBadge status={claim.status} />
                      </div>
                    ))}
                  </div>
                  <h3 style={{ fontSize: "var(--text-md)", fontWeight: 500, marginBottom: "var(--space-4)" }}>Skills</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                    {candidate.skills.map((sk) => (
                      <span key={sk.name} style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", padding: "4px 10px", fontSize: "var(--text-sm)" }}>
                        {sk.name} · <span style={{ color: "var(--color-text-muted)" }}>{sk.level}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "evidence" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                  {candidate.claims.map((claim) => (
                    <div key={claim.id}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-3)" }}>
                        <h3 style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>{claim.title}</h3>
                        <StatusBadge status={claim.status} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                        {claim.evidence.map((ev) => <EvidencePanel key={ev.id} evidence={ev} />)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "jdmatch" && (
                <div>
                  <div style={{ display: "flex", gap: "var(--space-4)", marginBottom: "var(--space-8)", flexWrap: "wrap" }}>
                    <div style={{ background: "var(--color-brand)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)", color: "white", flex: "0 0 160px" }}>
                      <p style={{ fontSize: "var(--text-3xl)", fontFamily: "var(--font-heading)", fontWeight: 400, marginBottom: "var(--space-1)" }}>{matchScore}%</p>
                      <p style={{ fontSize: "var(--text-sm)", opacity: 0.75 }}>Match Score</p>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)", justifyContent: "center" }}>
                      <p style={{ fontSize: "var(--text-md)", fontWeight: 500 }}>{jd.title}</p>
                      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>{jd.company}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                    {jd.requirements.map((req) => {
                      const matched = candidate.skills.some((sk) => sk.name.toLowerCase() === req.skill.toLowerCase());
                      return (
                        <div key={req.skill} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-3) var(--space-4)", background: "var(--color-card)", borderRadius: "var(--radius-md)" }}>
                          {matched ? <CheckCircle2 size={15} color="var(--color-brand)" /> : <XCircle size={15} color="var(--color-error)" />}
                          <span style={{ flex: 1, fontSize: "var(--text-sm)", fontWeight: 500 }}>{req.skill}</span>
                          {req.required ? (
                            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-error)", fontWeight: 600 }}>Required</span>
                          ) : (
                            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>Optional</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {missingRequired.length > 0 && (
                    <div style={{ marginTop: "var(--space-4)", background: "var(--color-highlight)", borderRadius: "var(--radius-md)", padding: "var(--space-4)", display: "flex", gap: "var(--space-3)" }}>
                      <AlertTriangle size={15} color="#7A6A30" style={{ flexShrink: 0, marginTop: 2 }} />
                      <p style={{ fontSize: "var(--text-sm)", color: "#6B5D1E" }}>
                        Missing required: {missingRequired.map((r) => r.skill).join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "credentials" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                  {candidate.claims.filter((c) => c.credential).map((claim) => (
                    <div key={claim.id} style={{ background: "var(--color-card)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-4)" }}>
                        <div>
                          <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, marginBottom: "var(--space-1)" }}>{claim.title}</p>
                          <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{claim.credential?.id}</code>
                        </div>
                        <StatusBadge status={claim.status} size="md" />
                      </div>
                      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                        Blockchain anchor: {claim.credential?.isAnchored ? "Anchored" : "Not anchored — deployment pending."}
                      </p>
                    </div>
                  ))}
                  <div className="demo-banner">
                    <AlertTriangle size={13} />
                    Credential integrity checks against a deployed smart contract are not active in this demo.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── JD COMPARE ─────────────────────────────────────────── */}
          {section === "compare" && (
            <div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 400, marginBottom: "var(--space-2)" }}>Job Description Matching</h1>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-8)" }}>Compare {candidate.name}'s profile against {jd.title}.</p>
              <button className="btn btn-secondary btn-sm" onClick={() => setSection("candidate")} style={{ marginBottom: "var(--space-6)" }}>
                ← Back to Candidate
              </button>
              <div style={{ background: "var(--color-card)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)", marginBottom: "var(--space-4)" }}>
                <p style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "var(--space-2)" }}>Role</p>
                <h2 style={{ fontSize: "var(--text-lg)", fontFamily: "var(--font-heading)", fontWeight: 400, marginBottom: "var(--space-2)" }}>{jd.title}</h2>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", lineHeight: 1.65 }}>{jd.description}</p>
              </div>
              <div style={{ background: "var(--color-brand)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)", color: "white", marginBottom: "var(--space-6)", display: "flex", gap: "var(--space-6)", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "var(--text-3xl)", fontFamily: "var(--font-heading)", fontWeight: 400, marginBottom: 0 }}>{matchScore}%</p>
                  <p style={{ fontSize: "var(--text-sm)", opacity: 0.7, marginTop: 2 }}>Match score</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "var(--text-sm)", opacity: 0.85, lineHeight: 1.65 }}>
                    {matchedSkills.length} of {jd.requirements.length} requirements matched.
                    {missingRequired.length === 0 ? " All required skills are present." : ` ${missingRequired.length} required skill(s) are missing.`}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                {jd.requirements.map((req) => {
                  const matched = candidate.skills.some((sk) => sk.name.toLowerCase() === req.skill.toLowerCase());
                  return (
                    <div key={req.skill} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-3) var(--space-4)", background: "var(--color-card)", borderRadius: "var(--radius-md)" }}>
                      {matched ? <CheckCircle2 size={15} color="var(--color-brand)" /> : <XCircle size={15} color="var(--color-error)" />}
                      <span style={{ flex: 1, fontSize: "var(--text-sm)", fontWeight: 500 }}>{req.skill}</span>
                      <span style={{ fontSize: "var(--text-xs)", color: req.required ? "var(--color-error)" : "var(--color-text-muted)", fontWeight: 600 }}>
                        {req.required ? "Required" : "Optional"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
