"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function AnimatedContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const container = useRef(null);
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(() => {
    if (prefersReducedMotion) {
      gsap.set(container.current, { y: 0, opacity: 1 });
      return;
    }
    gsap.fromTo(
      container.current,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom-=40%",
          toggleActions: "play pause resume reverse",
        },
      },
    );
  });
  return (
    <div ref={container} className="opacity-0">
      {children}
    </div>
  );
}
