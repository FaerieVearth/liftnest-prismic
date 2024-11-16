import Bounded from "@/app/[lang]/components/Bounded";
import ButtonLink from "@/app/[lang]/components/ButtonLink";
import { Content } from "@prismicio/client";
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
      className="relative"
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

      <div className="grid items-center rounded-xl bg-gradient-to-b from-[#fc5f2f]/10 to-[#fc5f2f]/5 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:py-12">
        <div>
          {/*           <div className="w-fit rounded-lg bg-blue-300/35 p-4 text-4xl">
            {slice.primary.icon && icons[slice.primary.icon]}
          </div> */}
          <div className="prose mt-6 text-3xl font-normal">
            <PrismicRichText field={slice.primary.subheading} />
          </div>
          <div className="prose mt-4 max-w-xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
          {slice.primary.button_text && (
            <ButtonLink
              field={slice.primary.button_link}
              className="mb-6 mt-6 bg-[#383D2A] text-white lg:mb-0"
            >
              {slice.primary.button_text || "Learn More"}
            </ButtonLink>
          )}
        </div>
        <PrismicNextImage
          field={slice.primary.image}
          alt=""
          className={clsx(
            "max-h-[400px] rounded-xl object-cover opacity-90 shadow-2xl lg:col-span-2 lg:pt-0",
            slice.variation === "reverse"
              ? "lg:order-1 lg:translate-x-[15%]"
              : "lg:-order-1 lg:translate-x-[-15%]",
          )}
        />
      </div>
    </Bounded>
  );
};

export default Showcase;
