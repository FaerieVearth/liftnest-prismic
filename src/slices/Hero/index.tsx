import Bounded from "@/app/components/Bounded";
import ButtonLink from "@/app/components/ButtonLink";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <Bounded
      className="text-center"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="relative">
        {isFilled.richText(slice.primary.heading) && (
          <h1 className="text-balance text-center text-5xl font-medium md:text-7xl">
            <PrismicText field={slice.primary.heading} />
          </h1>
        )}
        {isFilled.richText(slice.primary.body) && (
          <div className="mx-auto mt-6 max-w-md text-balance text-xl md:text-3xl">
            <PrismicText field={slice.primary.body} />
          </div>
        )}
        {isFilled.link(slice.primary.button_link) && (
          <ButtonLink className="mt-8" field={slice.primary.button_link}>
            {slice.primary.button_label}
          </ButtonLink>
        )}
        {isFilled.image(slice.primary.image) && (
          <div className="glass-container mt-16 w-fit">
            <div className="absolute inset-0 -z-10 bg-[#323348]/60 blur-xl filter" />
            <PrismicNextImage
              className="rounded-xl"
              field={slice.primary.image}
              alt=""
            />
          </div>
        )}
      </div>
    </Bounded>
  );
};

export default Hero;
