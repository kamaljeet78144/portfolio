"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/content";

export default function Contact() {
  const root = useRef(null);

  useGSAP(
    () => {
      // Title and envelope float in as the section approaches
      gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 20%", scrub: 1 },
      })
        .from(".contact-title", { y: 80, opacity: 0 })
        .from(".envelope", { y: 160, rotate: -8, opacity: 0 }, "<");

      // Pinned while the envelope opens and the letter slides out
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-pin",
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(".env-seal", { scale: 0, rotate: 90, duration: 0.25 })
        .to(".env-flap", { rotateX: 180, duration: 0.6, ease: "power1.inOut" })
        .set(".env-flap", { zIndex: 1 }, "-=0.3")
        .to(".env-letter", { yPercent: -112, duration: 0.7, ease: "power1.out" })
        .set(".env-letter", { zIndex: 6 })
        .to(".env-letter", { yPercent: -22, scale: 1.08, duration: 0.6, ease: "power2.inOut" })
        .from(".letter-inner > *", { y: 20, opacity: 0, stagger: 0.1, duration: 0.4 }, "-=0.4")
        .from(".float-heart", { scale: 0, y: 60, stagger: 0.08, duration: 0.5, ease: "back.out(3)" }, "-=0.4");
    },
    { scope: root }
  );

  return (
    <section className="contact" id="contact" ref={root}>
      <div className="contact-pin">
        <h2 className="contact-title">
          Let&apos;s create something <em>lovely</em>
        </h2>

        <div className="envelope-wrap">
          {["💌", "♡", "✿", "💗", "✦"].map((h, i) => (
            <span className={`float-heart fh-${i}`} key={i} aria-hidden="true">
              {h}
            </span>
          ))}

          <div className="envelope">
            <div className="env-back" />
            <div className="env-letter">
              <div className="letter-inner">
                <p className="letter-to">to: you ♡</p>
                <p className="letter-msg">
                  Have a project, an idea, or just want to say hi? My inbox is always open.
                </p>
                <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <div className="letter-socials">
                  {profile.socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="env-front" />
            <div className="env-flap" />
            <span className="env-seal">♡</span>
          </div>
        </div>
      </div>
    </section>
  );
}
