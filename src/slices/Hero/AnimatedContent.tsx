"use client";
import React, { useRef } from "react";
import ButtonLink from "@/app/[lang]/components/ButtonLink";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function AnimatedContent({
  slice,
}: {
  slice: Content.HeroSlice;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const container = useRef(null);
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          ".hero__heading, .hero__body, .hero__button, .hero__button, .hero__image, .hero__glow",
          { y: 0, opacity: 1 },
        );
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(
        ".hero__image",
        { y: 120 },
        { y: 0, opacity: 1, duration: 0.8 },
      );
      tl.fromTo(
        ".hero__heading",
        { y: -200 },
        { y: 0, opacity: 1, duration: 1.3 },
      );
      tl.fromTo(
        ".hero__body",
        { y: 120 },
        { y: 0, opacity: 1, duration: 1.4 },
        "-=1.6",
      );
      tl.fromTo(
        ".hero__button",
        { scale: 1.6 },
        { scale: 1, opacity: 1, duration: 0.8 },
        "-=0.6",
      );
    },
    { scope: container },
  );
  return (
    <div className="relative min-h-[800px] w-full flex flex-col justify-end" ref={container}>
      {(isFilled.image(slice.primary.image) ||
        isFilled.link(slice.primary.video)) && (
        <div className="hero__image absolute inset-0 opacity-0 rounded-2xl">
          {isFilled.link(slice.primary.video) && (
            <video
              playsInline
              autoPlay
              muted
              loop
              className="h-full w-full object-cover rounded-2xl"
            >
              <source src={slice.primary.video.url} />
            </video>
          )}
          {isFilled.image(slice.primary.image) &&
            !isFilled.link(slice.primary.video) && (
              <PrismicNextImage
                className="h-full w-full object-cover rounded-2xl"
                field={slice.primary.image}
                alt=""
              />
            )}
        </div>
      )}

      <div className="relative z-10 flex min-h-[600px] flex-col items-start justify-end p-8 lg:p-12 text-white">
        {isFilled.richText(slice.primary.heading) && (
          <h1 className="hero__heading prose text-balance text-start text-5xl font-medium opacity-0 md:text-7xl">
            <PrismicText field={slice.primary.heading} />
          </h1>
        )}
        {isFilled.richText(slice.primary.body) && (
          <div className="hero__body prose mt-6 max-w-md text-start text-balance text-xl opacity-0 md:text-3xl w-full">
            <PrismicText field={slice.primary.body} />
          </div>
        )}
        {isFilled.link(slice.primary.button_link) && (
          <ButtonLink
            className="hero__button mt-4 opacity-0 lg:mt-8 bg-white text-black"
            field={slice.primary.button_link}
          >
            {slice.primary.button_label}
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
