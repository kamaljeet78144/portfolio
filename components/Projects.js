"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile, projects } from "@/data/content";

export default function Projects() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scroll the cards sideways
      mm.add("(min-width: 900px)", () => {
        const track = root.current.querySelector(".projects-track");
        const distance = () => track.scrollWidth - window.innerWidth;

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray(".project-card").forEach((card) => {
          gsap.from(card, {
            rotate: 8, y: 80, scale: 0.85, opacity: 0.3, ease: "none",
            scrollTrigger: {
              trigger: card, containerAnimation: slide, start: "left 100%", end: "left 55%", scrub: true,
            },
          });
          gsap.to(card.querySelector(".project-emoji"), {
            rotate: 360, ease: "none",
            scrollTrigger: {
              trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true,
            },
          });
        });

        gsap.to(".projects-meter span", {
          scaleX: 1, ease: "none",
          scrollTrigger: {
            trigger: ".projects-pin", start: "top top", end: () => `+=${distance()}`, scrub: true,
          },
        });
      });

      // Mobile: simple stacked reveal
      mm.add("(max-width: 899px)", () => {
        gsap.utils.toArray(".project-card").forEach((card) => {
          gsap.from(card, {
            y: 80, opacity: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="projects" id="projects" ref={root}>
      <div className="projects-pin">
        <div className="projects-track">
          <div className="projects-intro">
            <span className="eyebrow">04 · selected work</span>
            <h2>
              Things I&apos;ve <em>made</em> with love
            </h2>
            <p className="section-sub">Keep scrolling. The gallery slides sideways ⟶</p>
            <div className="projects-meter">
              <span />
            </div>
          </div>

          {projects.map((p, i) => (
            <a href={p.href} className="project-card" key={p.title}>
              <div className="project-art" style={{ background: p.gradient }}>
                <span className="project-num">0{i + 1}</span>
                <span className="project-emoji">{p.emoji}</span>
                <span className="project-ring" />
              </div>
              <div className="project-body">
                <span className="project-type">{p.type}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}

          <div className="projects-end">
            <p>
              and many more
              <br />
              <em>websites</em> ✿
            </p>
            <a href={profile.socials[0].href} target="_blank" rel="noreferrer" className="btn btn-ghost">
              See them on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
