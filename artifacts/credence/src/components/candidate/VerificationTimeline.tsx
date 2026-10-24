import { type Claim } from "@/data/demo";
import { formatDateTime } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface VerificationTimelineProps {
  claim: Claim;
}

export default function VerificationTimeline({ claim }: VerificationTimelineProps) {
  return (
    <div aria-label="Verification timeline">
      <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 600, marginBottom: "var(--space-4)", color: "var(--color-text-muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        Timeline
      </h4>
      <ol className="timeline" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {claim.timelineEvents.map((evt, i) => (
          <li key={i} className={`timeline-item ${evt.status}`} style={{ paddingBottom: i === claim.timelineEvents.length - 1 ? 0 : "var(--space-6)" }}>
            <div className={`timeline-dot`} aria-hidden="true" />
            <div className="timeline-content" style={{ paddingBottom: 0 }}>
              <p style={{ fontWeight: 500, fontSize: "var(--text-sm)", color: evt.status === "pending" ? "var(--color-text-muted)" : "var(--color-text)", marginBottom: "2px", display: "flex", alignItems: "center", gap: "6px" }}>
                {evt.status === "completed" && <CheckCircle2 size={13} color="var(--color-brand)" />}
                {evt.label}
              </p>
              {evt.timestamp ? (
                <time dateTime={evt.timestamp} style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                  {formatDateTime(evt.timestamp)}
                </time>
              ) : (
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>Awaiting</span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
