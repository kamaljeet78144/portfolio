"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { skills, tools } from "@/data/content";

function Flower({ color }) {
  return (
    <svg viewBox="0 0 100 100" className="flower-head" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse key={deg} cx="50" cy="26" rx="17" ry="25" fill={color} transform={`rotate(${deg} 50 50)`} opacity="0.92" />
      ))}
      <circle cx="50" cy="50" r="13" fill="#ffe08a" />
      <circle cx="50" cy="50" r="6" fill="#f4b860" />
    </svg>
  );
}

export default function Skills() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".section-head > *", {
        y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".section-head", start: "top 80%" },
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".garden", start: "top 75%" },
      });
      tl.from(".stem", { scaleY: 0, stagger: 0.1, duration: 1, ease: "power2.out" })
        .from(".leaf", { scale: 0, stagger: 0.05, duration: 0.5, ease: "back.out(3)" }, "-=0.8")
        .from(".flower-head", { scale: 0, rotate: -180, stagger: 0.1, duration: 0.9, ease: "back.out(2)" }, "-=0.9")
        .from(".flower-label", { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 }, "-=0.6");

      gsap.from(".chip", {
        y: 50, opacity: 0, scale: 0.5, stagger: { each: 0.05, from: "random" }, duration: 0.7, ease: "back.out(2)",
        scrollTrigger: { trigger: ".chips", start: "top 85%" },
      });
    },
    { scope: root }
  );

  return (
    <section className="skills section" id="skills" ref={root}>
      <div className="section-head">
        <span className="eyebrow">02 · skills</span>
        <h2>
          My little <em>garden</em> of skills
        </h2>
        <p className="section-sub">Every skill I grow gets a flower. The taller the stem, the deeper the roots.</p>
      </div>

      <div className="garden">
        {skills.map((s, i) => (
          <div className="flower" key={s.name} style={{ "--sway-delay": `${i * 0.3}s` }}>
            <div className="flower-sway">
              <Flower color={s.color} />
              <div className="stem" style={{ height: `${s.level * 2}px` }}>
                <span className="leaf leaf-l" />
                <span className="leaf leaf-r" />
              </div>
            </div>
            <div className="flower-label">
              <strong>{s.name}</strong>
              <span>{s.level}%</span>
            </div>
          </div>
        ))}
        <div className="garden-ground" />
      </div>

      <div className="chips">
        {tools.map((t) => (
          <span className="chip" key={t}>
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
