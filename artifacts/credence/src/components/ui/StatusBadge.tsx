import { type VerificationStatus } from "@/data/demo";
import { statusClass, statusIcon } from "@/lib/utils";
import {
  CheckCircle2, Clock, Minus, HelpCircle, XCircle, Ban
} from "lucide-react";

const iconMap: Record<VerificationStatus, React.ReactNode> = {
  Verified:          <CheckCircle2 size={11} />,
  Pending:           <Clock size={11} />,
  Inconclusive:      <Minus size={11} />,
  "Unable to Verify":<HelpCircle size={11} />,
  Rejected:          <XCircle size={11} />,
  Expired:           <Ban size={11} />,
  Revoked:           <Ban size={11} />,
};

interface StatusBadgeProps {
  status: VerificationStatus;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  return (
    <span
      className={`status-badge status-${statusClass(status)}`}
      style={size === "md" ? { fontSize: "var(--text-sm)", padding: "4px 10px" } : {}}
      aria-label={`Status: ${status}`}
    >
      {iconMap[status]}
      {status}
    </span>
  );
}
