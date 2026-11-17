"use client";

import { useState } from "react";
import { profile } from "@/data/content";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <a href="#top" className="nav-logo" aria-label="Back to top">
        {profile.initials}
        <span>♡</span>
      </a>

      <nav className={`nav-links ${open ? "is-open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>

      <button
        className={`nav-toggle ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
