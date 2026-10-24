import { Link, useParams } from "wouter";
import TopNav from "@/components/layout/TopNav";
import StatusBadge from "@/components/ui/StatusBadge";
import EvidencePanel from "@/components/candidate/EvidencePanel";
import VerificationTimeline from "@/components/candidate/VerificationTimeline";
import { demoCandidateProfile } from "@/data/demo";
import { AlertTriangle } from "lucide-react";

export default function ClaimDetail() {
  const { id } = useParams<{ id: string }>();
  const claim = demoCandidateProfile.claims.find((c) => c.id === id);

  if (!claim) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
        <TopNav />
        <div className="container" style={{ paddingTop: "var(--space-16)", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 400, marginBottom: "var(--space-4)" }}>Claim not found</h1>
          <Link href="/candidate" className="btn btn-secondary">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <TopNav />
      <div className="container" style={{ maxWidth: 800, padding: "var(--space-10) var(--space-5)" }}>
        <div className="demo-banner" style={{ marginBottom: "var(--space-6)" }}>
          <AlertTriangle size={13} />
          Simulated claim — no real verification was performed.
        </div>
        <Link href="/candidate" className="btn btn-ghost btn-sm" style={{ marginBottom: "var(--space-6)" }}>
          ← Back
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-4)", flexWrap: "wrap", marginBottom: "var(--space-8)" }}>
          <div>
            <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "var(--space-2)" }}>
              {claim.category}
            </span>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 400 }}>{claim.title}</h1>
          </div>
          <StatusBadge status={claim.status} size="md" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
          {claim.evidence.map((ev) => <EvidencePanel key={ev.id} evidence={ev} />)}
          <VerificationTimeline claim={claim} />
        </div>
      </div>
    </div>
  );
}
