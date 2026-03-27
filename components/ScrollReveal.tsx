"use client";

/**
 * ScrollReveal — lightweight IntersectionObserver-based reveal wrapper.
 *
 * Usage:
 *   <ScrollReveal>
 *     <section className="bg-dark-surface section-padding">…</section>
 *   </ScrollReveal>
 *
 * Or with a stagger delay:
 *   <ScrollReveal delay={150}><Card /></ScrollReveal>
 */

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Optional delay in ms — for staggered children */
  delay?: number;
  /** Extra classes on the wrapper div */
  className?: string;
  /** Pixel offset from bottom of viewport before triggering */
  rootMargin?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  rootMargin = "0px 0px -60px 0px",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Start invisible
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = [
      `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      `transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    ].join(", ");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
