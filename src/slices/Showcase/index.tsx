import Bounded from "@/app/[lang]/components/Bounded";
import ButtonLink from "@/app/[lang]/components/ButtonLink";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PiArrowsClockwise, PiGear } from "react-icons/pi";
import clsx from "clsx";
import AnimatedContent from "./AnimatedContent";

const icons = {
  gear: <PiGear className="text-[#fc5f2f]" />,
  cycle: <PiArrowsClockwise className="text-[#fc5f2f]" />,
};

/**
 * Props for `Showcase`.
 */
export type ShowcaseProps = SliceComponentProps<Content.ShowcaseSlice>;

/**
 * Component for "Showcase" Slices.
 */
const Showcase = ({ slice }: ShowcaseProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative mb-4"
    >
      {slice.primary.heading && slice.primary.heading.length > 0 && (
        <AnimatedContent>
          <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-balanced prose text-center text-3xl font-medium md:text-5xl">
                {children}
              </h2>
            ),
            em: ({ children }) => (
              <em className="bg-gradient-to-b from-[#ffc46b] to-[#fc5f2f] bg-clip-text not-italic text-transparent">
              {children}
            </em>
            ),
          }}
        />
        </AnimatedContent>
      )}

      <div className="mx-auto max-w-7xl grid items-center rounded-xl px-8 py-8 backdrop-blur-sm lg:grid-cols-2 lg:py-12 gap-8">
        <div className="w-full">
          <div className="prose mt-6 text-3xl lg:text-5xl font-medium">
            <PrismicRichText field={slice.primary.subheading} />
          </div>
          <div className="prose mt-4 max-w-xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
          {slice.primary.button_text && slice.primary.button_link && (
            <ButtonLink
              field={slice.primary.button_link}
              className="mb-6 mt-6 bg-[#383D2A] text-white lg:mb-0"
            >
              {slice.primary.button_text || "Learn More"}
            </ButtonLink>
          )}
        </div>
        {(isFilled.image(slice.primary.image) || isFilled.link(slice.primary.video)) && (
          <div className={clsx(
            "w-full aspect-[5/4]",
            slice.variation === "reverse" ? "lg:order-1" : "lg:-order-1"
          )}>
            {isFilled.link(slice.primary.video) ? (
              <>
                <video
                  playsInline
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover rounded-xl hidden lg:block"
                >
                  <source src={slice.primary.video.url} />
                </video>
                <video
                  playsInline
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover rounded-xl lg:hidden"
                >
                  <source src={isFilled.link(slice.primary.video_mobile) 
                    ? slice.primary.video_mobile.url 
                    : slice.primary.video.url} 
                  />
                </video>
              </>
            ) : (
              <>
                <PrismicNextImage
                  field={slice.primary.image}
                  alt=""
                  className="w-full h-full rounded-xl object-cover opacity-90 hidden lg:block"
                />
                <PrismicNextImage
                  field={isFilled.image(slice.primary.image_mobile) 
                    ? slice.primary.image_mobile 
                    : slice.primary.image}
                  alt=""
                  className="w-full h-full rounded-xl object-cover opacity-90 lg:hidden"
                />
              </>
            )}
          </div>
        )}
      </div>
    </Bounded>
  );
};

export default Showcase;
