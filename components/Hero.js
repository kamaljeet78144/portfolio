"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/content";

// Fixed values so server and client render the same petals
const PETALS = [
  { left: 6, delay: 0, dur: 14, size: 22 },
  { left: 18, delay: 4, dur: 18, size: 16 },
  { left: 29, delay: 8, dur: 15, size: 26 },
  { left: 41, delay: 2, dur: 20, size: 14 },
  { left: 53, delay: 10, dur: 16, size: 20 },
  { left: 64, delay: 6, dur: 19, size: 24 },
  { left: 76, delay: 1, dur: 13, size: 18 },
  { left: 87, delay: 7, dur: 17, size: 22 },
  { left: 95, delay: 12, dur: 21, size: 15 },
];

const split = (word) =>
  word.split("").map((ch, i) => (
    <span className="char" key={i}>
      {ch}
    </span>
  ));

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const intro = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });
      intro
        .from(".hero-hello", { y: 30, opacity: 0, duration: 0.8 })
        .from(".hero-first .char", { yPercent: 120, rotate: 12, opacity: 0, stagger: 0.06, duration: 0.9 }, "-=0.4")
        .from(".hero-last .char", { yPercent: 120, opacity: 0, stagger: 0.08, duration: 0.8 }, "-=0.6")
        .from(".hero-roles, .hero-tagline", { y: 30, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .from(".hero-cta > *", { scale: 0, stagger: 0.12, duration: 0.6 }, "-=0.4")
        .from(".hero-badge", { scale: 0, rotate: -180, duration: 1 }, "-=0.5");

      // Rotating role ticker
      const roles = gsap.utils.toArray(".role");
      const cycle = gsap.timeline({ repeat: -1, delay: 2 });
      roles.forEach((role) => {
        cycle
          .fromTo(role, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
          .to(role, { yPercent: -100, opacity: 0, duration: 0.6, ease: "power3.in" }, "+=1.6");
      });

      // Scroll: content drifts up, blobs drift apart
      gsap.to(".hero-content", {
        yPercent: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".blob-1", {
        x: -150, y: 120, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".blob-2", {
        x: 150, y: 200, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="petals" aria-hidden="true">
        {PETALS.map((p, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>

      <div className="hero-content">
        <p className="hero-hello">✿ hello there, I&apos;m</p>
        <h1 className="hero-name">
          <span className="hero-first">{split(profile.firstName)}</span>
          <span className="hero-last">{split(profile.lastName)}</span>
        </h1>

        <div className="hero-roles" aria-label={profile.roles.join(", ")}>
          <span className="roles-prefix">a</span>
          <span className="roles-window">
            {profile.roles.map((r) => (
              <span className="role" key={r}>
                {r}
              </span>
            ))}
          </span>
        </div>

        <p className="hero-tagline">{profile.tagline}</p>

        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">
            See my work ♡
          </a>
          <a href="#contact" className="btn btn-ghost">
            Say hello
          </a>
        </div>
      </div>

      <a href="#about" className="hero-badge" aria-label="Scroll to about">
        <svg viewBox="0 0 120 120">
          <defs>
            <path id="circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
          </defs>
          <text>
            <textPath href="#circle">scroll down • scroll down • scroll down •</textPath>
          </text>
        </svg>
        <span>↓</span>
      </a>
    </section>
  );
}
