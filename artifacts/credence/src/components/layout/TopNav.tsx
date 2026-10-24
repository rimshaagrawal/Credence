import { Link, useLocation } from "wouter";
import { ShieldCheck, Menu, X } from "lucide-react";
import { useState } from "react";

export default function TopNav() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/candidate", label: "Candidate" },
    { href: "/employer", label: "Employer" },
    { href: "/profile/aarav-mehta", label: "Demo Profile" },
  ];

  return (
    <header style={{
      background: "var(--color-brand)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "60px",
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          textDecoration: "none",
        }}>
          <ShieldCheck size={22} color="white" strokeWidth={1.5} />
          <span style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-md)",
            fontWeight: 400,
            color: "white",
            letterSpacing: "-0.01em",
          }}>
            Credence
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" style={{ display: "flex", gap: "var(--space-1)", alignItems: "center" }}
          className="hidden-mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                color: location === l.href ? "white" : "rgba(255,255,255,0.65)",
                background: location === l.href ? "rgba(255,255,255,0.12)" : "transparent",
                textDecoration: "none",
                transition: "color var(--transition-fast), background var(--transition-fast)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/candidate" className="btn btn-sm" style={{
            marginLeft: "var(--space-3)",
            background: "white",
            color: "var(--color-brand)",
          }}>
            Get Started
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            padding: "var(--space-2)",
          }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          background: "var(--color-brand-dark)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "var(--space-4)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-1)",
        }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--text-sm)",
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 768px) { .show-mobile { display: none !important; } }
      `}</style>
    </header>
  );
}
