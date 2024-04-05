"use client";
import React, { useRef } from "react";
import ButtonLink from "@/app/components/ButtonLink";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import  usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

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
        gsap.set(".hero__heading, .hero__body, .hero__button, .hero__button, .hero__image, .hero__glow", { y: 0, opacity: 1 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

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
      tl.fromTo(
        ".hero__image",
        { y: 120 },
        { y: 0, opacity: 1, duration: 0.8 },
      );
      tl.fromTo(".hero__glow", {}, { opacity: 1, duration: 2.4 });
    },
    { scope: container },
  );

  return (
    <div className="relative" ref={container}>
      <div>
        {isFilled.richText(slice.primary.heading) && (
          <h1 className="hero__heading text-balance text-center text-5xl font-medium opacity-0 md:text-7xl prose">
            <PrismicText field={slice.primary.heading} />
          </h1>
        )}
        {isFilled.richText(slice.primary.body) && (
          <div className="hero__body mx-auto mt-6 max-w-md text-balance text-xl opacity-0 md:text-3xl prose">
            <PrismicText field={slice.primary.body} />
          </div>
        )}
        {isFilled.link(slice.primary.button_link) && (
          <ButtonLink
            className="hero__button mt-4 opacity-0 lg:mt-8"
            field={slice.primary.button_link}
          >
            {slice.primary.button_label}
          </ButtonLink>
        )}
      </div>

      {(isFilled.image(slice.primary.image) ||
        isFilled.keyText(slice.primary.video_url)) && (
        <div className="hero__image glass-container mt-8 w-fit opacity-0 lg:mt-16">
          <div className="hero__glow absolute inset-0 -z-10 bg-[#fc5f2f]/25 opacity-0 blur-[150px] filter" />
          {isFilled.keyText(slice.primary.video_url) && (
            <video playsInline autoPlay muted loop className="rounded-xl">
              <source src={slice.primary.video_url} />
            </video>
          )}
          {isFilled.image(slice.primary.image) &&
            !isFilled.keyText(slice.primary.video_url) && (
              <PrismicNextImage
                className="rounded-xl"
                field={slice.primary.image}
                alt=""
              />
            )}
        </div>
      )}
    </div>
  );
}
