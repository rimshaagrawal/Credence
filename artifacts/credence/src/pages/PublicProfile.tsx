import TopNav from "@/components/layout/TopNav";
import StatusBadge from "@/components/ui/StatusBadge";
import EvidencePanel from "@/components/candidate/EvidencePanel";
import VerificationTimeline from "@/components/candidate/VerificationTimeline";
import { demoCandidateProfile, DEMO_LABEL } from "@/data/demo";
import { QRCodeSVG } from "qrcode.react";
import { Link, useParams } from "wouter";
import { Copy, Share2, AlertTriangle, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function PublicProfile() {
  const { slug } = useParams<{ slug: string }>();
  const candidate = demoCandidateProfile; // In production, fetch by slug

  const profileUrl = `${window.location.origin}/profile/${candidate.publicProfileSlug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl).then(() => toast.success("Profile URL copied!"));
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <TopNav />
      <div className="demo-banner" style={{ borderRadius: 0, border: "none", borderBottom: "1px solid #D4C88A" }}>
        <AlertTriangle size={14} />
        {DEMO_LABEL}
      </div>

      <div className="container" style={{ maxWidth: 800, padding: "var(--space-12) var(--space-5)" }}>
        {/* Profile header */}
        <div style={{ display: "flex", gap: "var(--space-6)", alignItems: "flex-start", marginBottom: "var(--space-10)", flexWrap: "wrap" }}>
          {/* Avatar */}
          <div style={{
            width: 80, height: 80, borderRadius: "50%", background: "var(--color-brand)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", color: "white", flexShrink: 0,
          }}>
            {candidate.avatar}
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 400, marginBottom: "var(--space-1)" }}>
              {candidate.name}
            </h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-md)", marginBottom: "var(--space-4)" }}>
              {candidate.tagline}
            </p>

            {/* Quick stats */}
            <div style={{ display: "flex", gap: "var(--space-6)", marginBottom: "var(--space-4)", flexWrap: "wrap" }}>
              {[
                { label: "Claims", value: candidate.claims.length },
                { label: "Verified", value: candidate.claims.filter((c) => c.status === "Verified").length },
                { label: "Skills", value: candidate.skills.length },
              ].map((s) => (
                <div key={s.label}>
                  <span style={{ fontSize: "var(--text-lg)", fontFamily: "var(--font-heading)", fontWeight: 400, color: "var(--color-brand)" }}>{s.value}</span>
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", marginLeft: 6 }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Share row */}
            <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", flexWrap: "wrap" }}>
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", background: "var(--color-card)", padding: "5px 10px", borderRadius: "var(--radius-sm)", color: "var(--color-text-muted)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {profileUrl}
              </code>
              <button className="btn btn-ghost btn-sm" onClick={handleCopy} aria-label="Copy profile URL">
                <Copy size={13} /> Copy
              </button>
            </div>
          </div>

          {/* QR */}
          <div style={{ background: "var(--color-card)", borderRadius: "var(--radius-lg)", padding: "var(--space-4)", textAlign: "center", flexShrink: 0 }}>
            <QRCodeSVG value={profileUrl} size={90} level="M" bgColor="transparent" fgColor="var(--color-brand)" />
            <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginTop: "var(--space-2)" }}>Scan to verify</p>
          </div>
        </div>

        {/* Bio */}
        <section style={{ marginBottom: "var(--space-10)" }}>
          <p style={{ lineHeight: 1.75, color: "var(--color-text)", maxWidth: "var(--max-reading)" }}>{candidate.bio}</p>
        </section>

        {/* Skills */}
        <section style={{ marginBottom: "var(--space-10)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", fontWeight: 400, marginBottom: "var(--space-4)" }}>Skills</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
            {candidate.skills.map((sk) => (
              <span key={sk.name} style={{
                background: "var(--color-card)", border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)", padding: "5px 12px", fontSize: "var(--text-sm)",
              }}>
                {sk.name} · <span style={{ color: "var(--color-text-muted)" }}>{sk.level}</span>
              </span>
            ))}
          </div>
        </section>

        {/* Claims */}
        <section style={{ marginBottom: "var(--space-10)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", fontWeight: 400, marginBottom: "var(--space-6)" }}>
            Verified Claims
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
            {candidate.claims.map((claim) => (
              <article key={claim.id}>
                {/* Claim header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-4)", flexWrap: "wrap", marginBottom: "var(--space-4)" }}>
                  <div>
                    <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--color-text-muted)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "var(--space-1)" }}>
                      {claim.category}
                    </span>
                    <h3 style={{ fontSize: "var(--text-md)", fontWeight: 500, color: "var(--color-text)" }}>{claim.title}</h3>
                  </div>
                  <StatusBadge status={claim.status} size="md" />
                </div>

                {/* Evidence */}
                {claim.evidence.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
                    {claim.evidence.map((ev) => (
                      <EvidencePanel key={ev.id} evidence={ev} />
                    ))}
                  </div>
                )}

                {/* Timeline */}
                <div style={{ background: "var(--color-card)", borderRadius: "var(--radius-lg)", padding: "var(--space-5)" }}>
                  <VerificationTimeline claim={claim} />
                </div>

                {/* Credential */}
                {claim.credential && (
                  <div style={{ marginTop: "var(--space-4)", background: "var(--color-card)", borderRadius: "var(--radius-md)", padding: "var(--space-4)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-3)" }}>
                    <div>
                      <p style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 2 }}>Credential ID</p>
                      <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-text)" }}>{claim.credential.id}</code>
                    </div>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                      {claim.credential.isAnchored ? "Blockchain-anchored" : "Not yet anchored"}
                    </span>
                  </div>
                )}
                <hr style={{ border: "none", borderBottom: "1px solid var(--color-border)", marginTop: "var(--space-8)" }} />
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
