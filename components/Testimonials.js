"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { testimonials } from "@/data/content";

const TILTS = [-5, 3, -2];

export default function Testimonials() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".section-head > *", {
        y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".section-head", start: "top 80%" },
      });

      gsap.utils.toArray(".note").forEach((note, i) => {
        gsap.fromTo(
          note,
          { y: 200, rotate: TILTS[i % TILTS.length] * -4, opacity: 0, scale: 0.7 },
          {
            y: 0, rotate: TILTS[i % TILTS.length], opacity: 1, scale: 1,
            duration: 1.1, delay: i * 0.15, ease: "elastic.out(1, 0.7)",
            scrollTrigger: { trigger: ".notes", start: "top 80%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section className="testimonials section" ref={root}>
      <div className="section-head">
        <span className="eyebrow">05 · kind words</span>
        <h2>
          Notes people <em>left</em> for me
        </h2>
      </div>

      <div className="notes">
        {testimonials.map((t) => (
          <figure className="note" key={t.name} style={{ background: t.color }}>
            <span className="pin" />
            <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption>
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
