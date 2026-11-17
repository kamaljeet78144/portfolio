"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { about, profile } from "@/data/content";

const FAN = [
  { x: -120, rotate: -14 },
  { x: 0, rotate: 4 },
  { x: 120, rotate: 16 },
];

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".section-head > *", {
        y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".section-head", start: "top 80%" },
      });

      // Polaroids fan out from a neat stack
      gsap.utils.toArray(".polaroid").forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: 0, rotate: 0, y: 60 },
          {
            x: FAN[i].x, rotate: FAN[i].rotate, y: i === 1 ? -20 : 0,
            ease: "power2.out",
            scrollTrigger: { trigger: ".polaroids", start: "top 85%", end: "top 25%", scrub: 1 },
          }
        );
      });

      // Letter: words light up one by one as you scroll
      gsap.fromTo(
        ".letter-text .word",
        { opacity: 0.12 },
        {
          opacity: 1, stagger: 0.1, ease: "none",
          scrollTrigger: { trigger: ".letter", start: "top 75%", end: "bottom 60%", scrub: true },
        }
      );
      gsap.from(".letter", {
        y: 80, rotate: 3, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".letter", start: "top 85%" },
      });

      // Count-up stats
      gsap.utils.toArray(".stat-num").forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => (el.textContent = Math.round(obj.v)),
        });
      });
      gsap.from(".stat", {
        scale: 0.6, opacity: 0, stagger: 0.15, duration: 0.8, ease: "back.out(2)",
        scrollTrigger: { trigger: ".stats", start: "top 90%" },
      });
    },
    { scope: root }
  );

  return (
    <section className="about section" id="about" ref={root}>
      <div className="section-head">
        <span className="eyebrow">01 · about me</span>
        <h2>
          A little <em>letter</em> from me
        </h2>
      </div>

      <div className="about-grid">
        <div className="polaroids">
          {about.polaroids.map((p, i) => (
            <figure className={`polaroid tone-${p.tone}`} key={i} style={{ zIndex: i === 1 ? 3 : 2 - i }}>
              <div className="polaroid-img">
                <span className="polaroid-emoji">{p.emoji}</span>
                {i === 1 && <span className="polaroid-initials">{profile.initials}</span>}
              </div>
              <figcaption>{p.caption}</figcaption>
              <span className="tape" />
            </figure>
          ))}
        </div>

        <article className="letter">
          <p className="letter-greet">{about.greeting}</p>
          <p className="letter-text">
            {about.letter.split(" ").map((w, i) => (
              <span className="word" key={i}>
                {w}{" "}
              </span>
            ))}
          </p>
          <p className="letter-sign">{about.signoff}</p>
          <span className="letter-stamp">♡</span>
        </article>
      </div>

      <div className="stats">
        {about.stats.map((s) => (
          <div className="stat" key={s.label}>
            <p>
              <span className="stat-num" data-value={s.value}>
                0
              </span>
              {s.suffix}
            </p>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
