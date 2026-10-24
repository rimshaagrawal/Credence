import { Link } from "wouter";
import TopNav from "@/components/layout/TopNav";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <TopNav />
      <div className="container" style={{ paddingTop: "var(--space-24)", textAlign: "center" }}>
        <p style={{ fontSize: "var(--text-xs)", fontWeight: 700, letterSpacing: "0.1em", color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "var(--space-4)" }}>404</p>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-2xl)", fontWeight: 400, marginBottom: "var(--space-4)", color: "var(--color-text)" }}>
          Page not found
        </h1>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-8)" }}>
          This page doesn't exist or was moved.
        </p>
        <Link href="/" className="btn btn-primary">Go Home</Link>
      </div>
    </div>
  );
}
