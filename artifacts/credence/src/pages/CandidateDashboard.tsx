import { useState } from "react";
import { Link } from "wouter";
import TopNav from "@/components/layout/TopNav";
import StatusBadge from "@/components/ui/StatusBadge";
import EvidencePanel from "@/components/candidate/EvidencePanel";
import VerificationTimeline from "@/components/candidate/VerificationTimeline";
import { demoCandidateProfile, DEMO_LABEL, type Claim } from "@/data/demo";
import { formatDate } from "@/lib/utils";
import {
  LayoutDashboard, FileCheck, User, Settings, ChevronRight,
  Github, Linkedin, Copy, QrCode, Download, AlertTriangle,
  Sparkles, ExternalLink, Plus
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

type NavSection = "overview" | "claims" | "profile" | "settings";

function Sidebar({ active, onSelect }: { active: NavSection; onSelect: (s: NavSection) => void }) {
  const items: { id: NavSection; icon: React.ReactNode; label: string }[] = [
    { id: "overview", icon: <LayoutDashboard size={16} />, label: "Overview" },
    { id: "claims", icon: <FileCheck size={16} />, label: "My Claims" },
    { id: "profile", icon: <User size={16} />, label: "Profile" },
    { id: "settings", icon: <Settings size={16} />, label: "Settings" },
  ];
  return (
    <nav className="sidebar" aria-label="Candidate dashboard navigation">
      <div style={{ padding: "0 var(--space-6) var(--space-6)", borderBottom: "1px solid var(--color-border)", marginBottom: "var(--space-4)" }}>
        <p style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--color-text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Candidate</p>
        <p style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-text)", marginTop: 2 }}>{demoCandidateProfile.name}</p>
      </div>
      {items.map((item) => (
        <button
          key={item.id}
          className={`sidebar-link${active === item.id ? " active" : ""}`}
          onClick={() => onSelect(item.id)}
          aria-current={active === item.id ? "page" : undefined}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function ClaimCard({ claim, onClick }: { claim: Claim; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      style={{
        background: "var(--color-card)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-5)",
        cursor: "pointer",
        border: "1px solid transparent",
        transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "transparent";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-3)", gap: "var(--space-3)" }}>
        <div>
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--color-text-muted)", letterSpacing: "0.04em", textTransform: "uppercase", display: "block", marginBottom: "var(--space-1)" }}>
            {claim.category}
          </span>
          <h3 style={{ fontSize: "var(--text-base)", fontWeight: 600, color: "var(--color-text)", lineHeight: 1.3 }}>
            {claim.title}
          </h3>
        </div>
        <StatusBadge status={claim.status} />
      </div>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", lineHeight: 1.55, marginBottom: "var(--space-4)" }}>
        {claim.description}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
            {claim.evidence.length} source{claim.evidence.length !== 1 ? "s" : ""}
          </span>
          <time style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
            Submitted {formatDate(claim.submittedAt)}
          </time>
        </div>
        <ChevronRight size={14} color="var(--color-text-muted)" />
      </div>
    </article>
  );
}

function ClaimDetailView({ claim, onBack }: { claim: Claim; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"evidence" | "review" | "credential" | "timeline">("evidence");
  const tabs = [
    { id: "evidence" as const, label: `Evidence (${claim.evidence.length})` },
    { id: "review" as const, label: "AI Review" },
    { id: "credential" as const, label: "Credential" },
    { id: "timeline" as const, label: "Timeline" },
  ];

  return (
    <div>
      {/* Back */}
      <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ marginBottom: "var(--space-6)" }}>
        ← Back to Claims
      </button>

      {/* Header */}
      <div style={{ marginBottom: "var(--space-8)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap" }}>
          <div>
            <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--color-text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "var(--space-2)" }}>
              {claim.category}
            </span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 400, marginBottom: "var(--space-2)" }}>
              {claim.title}
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>{claim.description}</p>
          </div>
          <StatusBadge status={claim.status} size="md" />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "var(--space-1)", borderBottom: "1px solid var(--color-border)", marginBottom: "var(--space-8)" }} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "var(--space-3) var(--space-4)",
              border: "none",
              background: "none",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              cursor: "pointer",
              color: activeTab === tab.id ? "var(--color-brand)" : "var(--color-text-muted)",
              borderBottom: `2px solid ${activeTab === tab.id ? "var(--color-brand)" : "transparent"}`,
              marginBottom: -1,
              transition: "color var(--transition-fast), border-color var(--transition-fast)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div role="tabpanel">
        {activeTab === "evidence" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {claim.evidence.map((ev) => (
              <EvidencePanel key={ev.id} evidence={ev} />
            ))}
          </div>
        )}

        {activeTab === "review" && claim.aiReview && (
          <div>
            <div className="demo-banner" style={{ marginBottom: "var(--space-6)" }}>
              <Sparkles size={14} />
              Simulated AI review — no live evidence discovery has been performed in this demo.
            </div>
            <div style={{ background: "var(--color-card)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)", marginBottom: "var(--space-4)" }}>
              <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 600, marginBottom: "var(--space-3)", color: "var(--color-text)" }}>Review Summary</h4>
              <p style={{ fontSize: "var(--text-sm)", lineHeight: 1.7, color: "var(--color-text)" }}>{claim.aiReview.summary}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              {[
                { label: "Identity Match", value: claim.aiReview.identityMatch },
                { label: "Source Reliability", value: claim.aiReview.sourceReliability },
                { label: "Proposed Status", value: claim.aiReview.proposedStatus },
                { label: "Supporting Sources", value: `${claim.aiReview.supportingEvidenceIds.length} source(s)` },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "var(--color-bg)", borderRadius: "var(--radius-md)", padding: "var(--space-4)", border: "1px solid var(--color-border)" }}>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "var(--space-1)" }}>{label}</p>
                  <p style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-text)" }}>{value}</p>
                </div>
              ))}
            </div>
            {claim.aiReview.missingInfo && (
              <div style={{ background: "var(--color-highlight)", borderRadius: "var(--radius-md)", padding: "var(--space-4)", marginTop: "var(--space-4)", display: "flex", gap: "var(--space-3)" }}>
                <AlertTriangle size={16} style={{ color: "#7A6A30", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "#6B5D1E", marginBottom: "var(--space-1)" }}>Missing information</p>
                  <p style={{ fontSize: "var(--text-sm)", color: "#6B5D1E" }}>{claim.aiReview.missingInfo}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "credential" && (
          <div>
            {claim.credential ? (
              <div>
                <div style={{ background: "var(--color-card)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)", marginBottom: "var(--space-4)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
                    <h4 style={{ fontSize: "var(--text-md)", fontWeight: 500 }}>Credential Record</h4>
                    <StatusBadge status={claim.status} size="md" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                    <div>
                      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "var(--space-1)" }}>Credential ID</p>
                      <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", background: "var(--color-bg)", padding: "4px 8px", borderRadius: "var(--radius-sm)", display: "inline-block" }}>
                        {claim.credential.id}
                      </code>
                    </div>
                    <div>
                      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "var(--space-1)" }}>Issued</p>
                      <p style={{ fontSize: "var(--text-sm)" }}>{formatDate(claim.credential.issuedAt)}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "var(--space-1)" }}>Blockchain Anchor</p>
                      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
                        {claim.credential.isAnchored ? `Transaction: ${claim.credential.txHash}` : "Not anchored — smart contract deployment pending."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="demo-banner">
                  <AlertTriangle size={13} />
                  This is a simulated credential record. No blockchain transaction has been submitted in this demo.
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "var(--space-12)", color: "var(--color-text-muted)" }}>
                <p style={{ fontSize: "var(--text-sm)" }}>No credential issued yet — this claim is {claim.status.toLowerCase()}.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "timeline" && (
          <div style={{ maxWidth: 480 }}>
            <VerificationTimeline claim={claim} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function CandidateDashboard() {
  const [section, setSection] = useState<NavSection>("overview");
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const candidate = demoCandidateProfile;

  const verified = candidate.claims.filter((c) => c.status === "Verified").length;
  const pending  = candidate.claims.filter((c) => c.status === "Pending").length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <TopNav />
      <div className="demo-banner" style={{ borderRadius: 0, border: "none", borderBottom: "1px solid #D4C88A" }}>
        <AlertTriangle size={14} />
        {DEMO_LABEL}
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 60px - 44px)" }}>
        <Sidebar active={section} onSelect={(s) => { setSection(s); setSelectedClaim(null); }} />

        <main style={{ flex: 1, padding: "var(--space-10)", overflowY: "auto", minWidth: 0 }}>
          {/* OVERVIEW */}
          {section === "overview" && (
            <div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 400, marginBottom: "var(--space-2)" }}>
                Welcome back, {candidate.name.split(" ")[0]}
              </h1>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-8)" }}>{candidate.tagline}</p>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)", marginBottom: "var(--space-10)" }}>
                {[
                  { label: "Total Claims", value: candidate.claims.length },
                  { label: "Verified", value: verified },
                  { label: "Pending Review", value: pending },
                ].map((s) => (
                  <div key={s.label} style={{ background: "var(--color-card)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)" }}>
                    <p style={{ fontSize: "var(--text-2xl)", fontFamily: "var(--font-heading)", fontWeight: 400, color: "var(--color-brand)", marginBottom: "var(--space-1)" }}>{s.value}</p>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent claims */}
              <h2 style={{ fontSize: "var(--text-md)", fontWeight: 500, marginBottom: "var(--space-4)" }}>Recent Claims</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                {candidate.claims.map((claim) => (
                  <ClaimCard key={claim.id} claim={claim} onClick={() => { setSelectedClaim(claim); setSection("claims"); }} />
                ))}
              </div>
            </div>
          )}

          {/* CLAIMS */}
          {section === "claims" && (
            <div>
              {selectedClaim ? (
                <ClaimDetailView claim={selectedClaim} onBack={() => setSelectedClaim(null)} />
              ) : (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
                    <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 400 }}>My Claims</h1>
                    <button className="btn btn-primary btn-sm" onClick={() => toast.info("Claim submission form — coming in full build")}>
                      <Plus size={14} /> Submit Claim
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                    {candidate.claims.map((claim) => (
                      <ClaimCard key={claim.id} claim={claim} onClick={() => setSelectedClaim(claim)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROFILE */}
          {section === "profile" && (
            <div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 400, marginBottom: "var(--space-8)" }}>Profile</h1>

              {/* Avatar + name */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-6)", marginBottom: "var(--space-8)", flexWrap: "wrap" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", background: "var(--color-brand)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", color: "white", flexShrink: 0,
                }}>
                  {candidate.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 400, marginBottom: "var(--space-1)" }}>{candidate.name}</h2>
                  <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-3)" }}>{candidate.tagline}</p>
                  <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
                    {candidate.githubUrl && (
                      <a href={candidate.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                        <Github size={14} /> GitHub
                      </a>
                    )}
                    {candidate.linkedinUrl && (
                      <a href={candidate.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                        <Linkedin size={14} /> LinkedIn
                      </a>
                    )}
                    <Link href={`/profile/${candidate.publicProfileSlug}`} className="btn btn-secondary btn-sm">
                      <ExternalLink size={14} /> Public Profile
                    </Link>
                  </div>
                </div>

                {/* QR Code */}
                <div style={{ background: "var(--color-card)", borderRadius: "var(--radius-lg)", padding: "var(--space-4)", textAlign: "center" }}>
                  <QRCodeSVG
                    value={`${window.location.origin}/profile/${candidate.publicProfileSlug}`}
                    size={100}
                    level="M"
                    bgColor="transparent"
                    fgColor="var(--color-brand)"
                  />
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginTop: "var(--space-2)" }}>Public Profile QR</p>
                </div>
              </div>

              {/* Skills */}
              <h3 style={{ fontSize: "var(--text-md)", fontWeight: 500, marginBottom: "var(--space-4)" }}>Skills</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginBottom: "var(--space-8)" }}>
                {candidate.skills.map((sk) => (
                  <span key={sk.name} style={{
                    background: "var(--color-card)", border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)", padding: "4px 10px",
                    fontSize: "var(--text-sm)", color: "var(--color-text)",
                  }}>
                    {sk.name} · <span style={{ color: "var(--color-text-muted)" }}>{sk.level}</span>
                  </span>
                ))}
              </div>

              {/* Bio */}
              <h3 style={{ fontSize: "var(--text-md)", fontWeight: 500, marginBottom: "var(--space-3)" }}>Bio</h3>
              <p style={{ color: "var(--color-text)", lineHeight: 1.7, maxWidth: "var(--max-reading)" }}>{candidate.bio}</p>
            </div>
          )}

          {/* SETTINGS */}
          {section === "settings" && (
            <div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 400, marginBottom: "var(--space-4)" }}>Settings</h1>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-8)" }}>Privacy, consent, and access history — coming in the full build.</p>
              <div className="demo-banner">
                <AlertTriangle size={13} />
                Settings are not functional in the hackathon demo. No real authentication or per-user data is in use.
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
