"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { journey } from "@/data/content";

export default function Journey() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".section-head > *", {
        y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".section-head", start: "top 80%" },
      });

      // The vine draws itself as you scroll
      gsap.fromTo(
        ".vine-path",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 70%", scrub: 0.6 },
        }
      );

      gsap.utils.toArray(".milestone").forEach((m, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(m.querySelector(".milestone-card"), {
          x: fromLeft ? -120 : 120, rotate: fromLeft ? -6 : 6, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: m, start: "top 80%" },
        });
        gsap.from(m.querySelector(".milestone-node"), {
          scale: 0, rotate: -90, duration: 0.7, ease: "back.out(3)",
          scrollTrigger: { trigger: m, start: "top 70%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="journey section" id="journey" ref={root}>
      <div className="section-head">
        <span className="eyebrow">03 · journey</span>
        <h2>
          The path that <em>bloomed</em>
        </h2>
      </div>

      <div className="timeline">
        <svg className="vine" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="vineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff8fab" />
              <stop offset="50%" stopColor="#c8b6ff" />
              <stop offset="100%" stopColor="#ffb38a" />
            </linearGradient>
          </defs>
          <path
            className="vine-track"
            d="M20 0 C 40 60, 0 120, 20 180 S 40 300, 20 360 S 0 480, 20 540 S 40 660, 20 720 S 0 840, 20 900 S 30 960, 20 1000"
          />
          <path
            className="vine-path"
            pathLength="1"
            d="M20 0 C 40 60, 0 120, 20 180 S 40 300, 20 360 S 0 480, 20 540 S 40 660, 20 720 S 0 840, 20 900 S 30 960, 20 1000"
          />
        </svg>

        {journey.map((j, i) => (
          <div className={`milestone ${i % 2 === 0 ? "left" : "right"}`} key={j.year + j.title}>
            <span className="milestone-node">{j.icon}</span>
            <div className="milestone-card">
              <span className="milestone-year">{j.year}</span>
              <h3>{j.title}</h3>
              <p className="milestone-place">{j.place}</p>
              <p>{j.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
