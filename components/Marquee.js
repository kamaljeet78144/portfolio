"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { loves } from "@/data/content";

function Row({ items, className }) {
  // Repeat items so the ribbon never runs out while it slides
  const list = [...items, ...items, ...items];
  return (
    <div className={`ribbon ${className}`}>
      <div className="ribbon-inner">
        {list.map((t, i) => (
          <span key={i}>
            {t} <i>✿</i>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  const root = useRef(null);

  useGSAP(
    () => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.5 };
      gsap.fromTo(".ribbon-a .ribbon-inner", { xPercent: 0 }, { xPercent: -33, ease: "none", scrollTrigger: st });
      gsap.fromTo(".ribbon-b .ribbon-inner", { xPercent: -33 }, { xPercent: 0, ease: "none", scrollTrigger: st });
    },
    { scope: root }
  );

  return (
    <section className="marquee" ref={root} aria-label="Things I love">
      <Row items={loves} className="ribbon-a" />
      <Row items={[...loves].reverse()} className="ribbon-b" />
    </section>
  );
}
