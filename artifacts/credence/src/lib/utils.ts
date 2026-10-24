import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type VerificationStatus } from "@/data/demo";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max) + "…";
}

/** Map VerificationStatus → CSS class suffix */
export function statusClass(status: VerificationStatus): string {
  const map: Record<VerificationStatus, string> = {
    Verified: "verified",
    Pending: "pending",
    Inconclusive: "inconclusive",
    "Unable to Verify": "unable",
    Rejected: "rejected",
    Expired: "expired",
    Revoked: "revoked",
  };
  return map[status] ?? "inconclusive";
}

/** Map VerificationStatus → icon char (fallback for non-icon contexts) */
export function statusIcon(status: VerificationStatus): string {
  const map: Record<VerificationStatus, string> = {
    Verified: "✓",
    Pending: "⏳",
    Inconclusive: "~",
    "Unable to Verify": "?",
    Rejected: "✕",
    Expired: "⊘",
    Revoked: "⊘",
  };
  return map[status] ?? "~";
}
