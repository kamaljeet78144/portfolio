"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SPARKLES = ["✦", "♡", "✿", "⋆", "❀"];

export default function Effects() {
  const barRef = useRef(null);
  const layerRef = useRef(null);

  // Ribbon progress bar that fills as the page scrolls
  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  });

  // Sparkle trail that follows the cursor (fine pointers only)
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let last = 0;
    let i = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - last < 45) return;
      last = now;

      const s = document.createElement("span");
      s.className = "sparkle";
      s.textContent = SPARKLES[i++ % SPARKLES.length];
      s.style.left = `${e.clientX}px`;
      s.style.top = `${e.clientY}px`;
      layerRef.current?.appendChild(s);

      gsap.fromTo(
        s,
        { scale: 0.4, opacity: 1, rotate: 0 },
        {
          y: gsap.utils.random(20, 50),
          x: gsap.utils.random(-25, 25),
          scale: gsap.utils.random(0.8, 1.4),
          rotate: gsap.utils.random(-90, 90),
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => s.remove(),
        }
      );
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div className="progress" ref={barRef} aria-hidden="true" />
      <div className="sparkle-layer" ref={layerRef} aria-hidden="true" />
    </>
  );
}
