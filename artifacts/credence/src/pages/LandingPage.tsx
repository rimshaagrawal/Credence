import { Link } from "wouter";
import TopNav from "@/components/layout/TopNav";
import { ShieldCheck, Search, Cpu, ArrowRight, Github, BookOpen, Trophy, CheckCircle2, Clock, Minus } from "lucide-react";

// Evidence Graph — illustrative static version for landing hero
function EvidenceGraph() {
  const nodes = [
    { id: "candidate", label: "Candidate", sub: "Aarav Mehta", icon: "👤", x: 0 },
    { id: "claim", label: "Claim", sub: "ML Certification", icon: "📄", x: 1 },
    { id: "source", label: "Source", sub: "Coursera / DeepLearning.AI", icon: "🔗", x: 2 },
    { id: "review", label: "AI Review", sub: "Source-grounded", icon: "✦", x: 3 },
    { id: "credential", label: "Credential", sub: "Issued & Verified", icon: "🏅", x: 4 },
  ];

  return (
    <div
      role="img"
      aria-label="Evidence graph showing: Candidate → Claim → Supporting Source → AI Review → Credential Record"
      style={{
        overflowX: "auto",
        padding: "var(--space-6) 0",
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        minWidth: 600,
        position: "relative",
      }}>
        {nodes.map((node, i) => (
          <div key={node.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            {/* Node */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-2)",
              flex: "0 0 auto",
            }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: "var(--radius-lg)",
                background: node.id === "credential" ? "var(--color-brand)" : "var(--color-bg)",
                border: `1.5px solid ${node.id === "credential" ? "var(--color-brand)" : "var(--color-border)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                boxShadow: "var(--shadow-card)",
              }}>
                {node.icon}
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--color-text)", margin: 0 }}>{node.label}</p>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", margin: 0 }}>{node.sub}</p>
              </div>
            </div>
            {/* Connector */}
            {i < nodes.length - 1 && (
              <div style={{
                flex: 1,
                height: 1,
                background: "var(--color-border)",
                position: "relative",
                margin: "0 var(--space-2)",
                marginBottom: "28px",
              }}>
                <ArrowRight size={12} style={{ position: "absolute", right: -6, top: -6, color: "var(--color-text-muted)" }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <TopNav />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section style={{
        padding: "var(--space-24) 0 var(--space-16)",
        borderBottom: "1px solid var(--color-border)",
      }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <div style={{ maxWidth: 640, marginBottom: "var(--space-12)" }}>
            <p style={{
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-brand)",
              marginBottom: "var(--space-5)",
            }}>
              Evidence-backed skill verification
            </p>
            <h1 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.2rem, 5vw, var(--text-3xl))",
              fontWeight: 400,
              lineHeight: 1.12,
              color: "var(--color-text)",
              marginBottom: "var(--space-6)",
              letterSpacing: "-0.02em",
            }}>
              Proof,<br />not promises.
            </h1>
            <p style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              marginBottom: "var(--space-8)",
              maxWidth: 520,
            }}>
              Credence creates evidence-backed digital skill passports. Discover public evidence, run AI-powered reviews, and issue verifiable credentials — so candidates stand out for what they can actually do.
            </p>
            <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <Link href="/candidate" className="btn btn-primary btn-lg">
                View Candidate Demo
              </Link>
              <Link href="/employer" className="btn btn-secondary btn-lg">
                Employer Dashboard
              </Link>
            </div>
          </div>

          {/* Evidence Graph preview */}
          <div style={{
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-8)",
          }}>
            <p style={{ fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "var(--space-4)" }}>
              Evidence Graph — how verification works
            </p>
            <EvidenceGraph />
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section style={{ padding: "var(--space-20) 0", background: "var(--color-surface)" }}>
        <div className="container">
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-xl)",
            fontWeight: 400,
            marginBottom: "var(--space-3)",
            color: "var(--color-text)",
          }}>
            How Credence works
          </h2>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-12)", maxWidth: 560, lineHeight: 1.7 }}>
            Every credential is grounded in real, retrievable evidence — not self-reported claims or confident AI responses.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "var(--space-6)",
          }}>
            {[
              { icon: <BookOpen size={22} strokeWidth={1.5} />, step: "01", title: "Submit a claim", body: "Candidate submits a skill, project, certification, or achievement with supporting details and URLs." },
              { icon: <Search size={22} strokeWidth={1.5} />, step: "02", title: "Evidence discovery", body: "TinyFish searches and retrieves relevant public sources — repositories, official issuer pages, and achievement records." },
              { icon: <Cpu size={22} strokeWidth={1.5} />, step: "03", title: "AI-grounded review", body: "An LLM reviews the claim against retrieved evidence and returns a structured, source-cited report." },
              { icon: <ShieldCheck size={22} strokeWidth={1.5} />, step: "04", title: "Verifiable credential", body: "Eligible claims receive a credential record. Optionally anchored on-chain for tamper-evident integrity checks." },
            ].map((item) => (
              <div key={item.step} style={{
                background: "var(--color-bg)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-8)",
                boxShadow: "var(--shadow-card)",
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-card)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-brand)",
                  marginBottom: "var(--space-4)",
                }}>
                  {item.icon}
                </div>
                <p style={{ fontSize: "var(--text-xs)", fontWeight: 700, letterSpacing: "0.08em", color: "var(--color-text-muted)", marginBottom: "var(--space-2)" }}>
                  {item.step}
                </p>
                <h3 style={{ fontSize: "var(--text-md)", fontWeight: 500, marginBottom: "var(--space-2)", color: "var(--color-text)" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", lineHeight: 1.65 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo status overview ────────────────────────────────────── */}
      <section style={{ padding: "var(--space-20) 0", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-12)", alignItems: "start" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 400, marginBottom: "var(--space-4)", color: "var(--color-text)" }}>
                See it in action
              </h2>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "var(--space-6)" }}>
                The demo uses a fictional candidate — Aarav Mehta — with three claims across different verification outcomes.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-8)" }}>
                {[
                  { label: "ML Certification (Coursera)", status: "Verified", icon: <CheckCircle2 size={14} /> },
                  { label: "EarthHacks 2026 — Hackathon", status: "Pending", icon: <Clock size={14} /> },
                  { label: "climate-forecast-ml — GitHub Project", status: "Inconclusive", icon: <Minus size={14} /> },
                ].map((c) => (
                  <div key={c.label} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "var(--space-4) var(--space-5)",
                    background: "var(--color-card)",
                    borderRadius: "var(--radius-lg)",
                    gap: "var(--space-4)",
                  }}>
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }}>{c.label}</span>
                    <span className={`status-badge status-${c.status.toLowerCase()}`} style={{ flexShrink: 0 }}>
                      {c.icon} {c.status}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/candidate" className="btn btn-primary">
                Open Candidate Dashboard <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{
              background: "var(--color-brand)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-8)",
              color: "white",
            }}>
              <ShieldCheck size={32} strokeWidth={1.5} style={{ marginBottom: "var(--space-4)", opacity: 0.7 }} />
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", fontWeight: 400, marginBottom: "var(--space-4)", color: "white" }}>
                For Employers
              </h3>
              <p style={{ fontSize: "var(--text-sm)", lineHeight: 1.7, marginBottom: "var(--space-6)", color: "rgba(255,255,255,0.75)" }}>
                Browse candidates with verified skills, inspect supporting evidence, compare against job descriptions, and check credential integrity — all from one dashboard.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                {["Candidate discovery & search", "Evidence inspection & source links", "JD matching with explainable scores", "Credential integrity checks"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.85)" }}>
                    <CheckCircle2 size={14} style={{ flexShrink: 0, opacity: 0.7 }} /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/employer" style={{ background: "white", color: "var(--color-brand)", borderRadius: "var(--radius-md)", padding: "10px 20px", display: "inline-flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--text-sm)", fontWeight: 500, textDecoration: "none" }}>
                Employer Dashboard <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer style={{ padding: "var(--space-12) 0", borderTop: "1px solid var(--color-border)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <ShieldCheck size={18} color="var(--color-brand)" strokeWidth={1.5} />
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-base)", color: "var(--color-brand)" }}>Credence</span>
          </div>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
            Proof, not promises. · Hackathon demo — all data is fictional.
          </p>
        </div>
      </footer>
    </div>
  );
}
