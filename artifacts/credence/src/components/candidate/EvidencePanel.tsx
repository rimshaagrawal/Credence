import { type EvidenceSource } from "@/data/demo";
import { formatDateTime, truncate } from "@/lib/utils";
import { ExternalLink, ShieldCheck, AlertTriangle } from "lucide-react";
import { useState } from "react";

const typeColor: Record<EvidenceSource["type"], string> = {
  GitHub: "var(--color-brand)",
  "Official Issuer": "var(--color-brand)",
  News: "#8B7355",
  Portfolio: "#6B5D1E",
  LinkedIn: "#5C5A50",
  Other: "var(--color-text-muted)",
};

interface EvidencePanelProps {
  evidence: EvidenceSource;
  flagged?: boolean;
}

export default function EvidencePanel({ evidence, flagged = false }: EvidencePanelProps) {
  const [expanded, setExpanded] = useState(false);

  const EXCERPT_LIMIT = 160;
  const isLong = evidence.excerpt.length > EXCERPT_LIMIT;

  return (
    <article
      className={`evidence-panel${flagged ? " flagged" : ""}`}
      aria-label={`Evidence: ${evidence.title}`}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap", marginBottom: "var(--space-1)" }}>
            {/* Source type chip */}
            <span style={{
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              padding: "2px 7px",
              borderRadius: "var(--radius-sm)",
              background: "var(--color-bg)",
              color: typeColor[evidence.type],
              border: `1px solid ${typeColor[evidence.type]}40`,
              letterSpacing: "0.03em",
            }}>
              {evidence.type}
            </span>
            {/* Reliability */}
            <span style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              fontSize: "var(--text-xs)",
              color: evidence.reliability === "High" ? "var(--color-brand)" : evidence.reliability === "Medium" ? "#7A6A30" : "var(--color-text-muted)",
            }}>
              {flagged ? <AlertTriangle size={10} /> : <ShieldCheck size={10} />}
              {evidence.reliability} confidence
            </span>
          </div>
          {/* Title */}
          <p style={{
            fontWeight: 600,
            fontSize: "var(--text-base)",
            color: "var(--color-text)",
            marginBottom: "var(--space-1)",
            lineHeight: 1.3,
          }}>
            {evidence.title}
          </p>
          {/* URL */}
          <a
            href={evidence.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              wordBreak: "break-all",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brand)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
          >
            <ExternalLink size={10} />
            {truncate(evidence.url, 60)}
          </a>
        </div>
        {/* Timestamp */}
        <time
          dateTime={evidence.retrievedAt}
          style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", whiteSpace: "nowrap", flexShrink: 0 }}
        >
          Retrieved {formatDateTime(evidence.retrievedAt)}
        </time>
      </div>

      {/* Excerpt */}
      <p style={{
        fontSize: "var(--text-sm)",
        color: "var(--color-text)",
        lineHeight: 1.6,
        borderTop: "1px solid var(--color-border)",
        paddingTop: "var(--space-3)",
        marginTop: "var(--space-2)",
      }}>
        {expanded || !isLong ? evidence.excerpt : truncate(evidence.excerpt, EXCERPT_LIMIT)}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-brand)",
              fontSize: "var(--text-sm)",
              cursor: "pointer",
              padding: 0,
              marginLeft: "var(--space-1)",
            }}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>
    </article>
  );
}
